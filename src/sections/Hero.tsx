import { useEffect, useRef } from 'react';

const VERTEX_SHADER = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

float random(in vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise(in vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(in vec2 st) {
  float value = 0.0;
  float amplitude = .5;
  float frequency = 0.;
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(st);
    st *= 2.;
    amplitude *= .5;
  }
  return value;
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  st.x *= u_resolution.x / u_resolution.y;

  vec2 mouseInfluence = vec2(0.0);
  float mouseDistance = 0.0;
  if (u_mouse.x > 0.0) {
    mouseInfluence = st - (u_mouse / u_resolution);
    mouseDistance = length(mouseInfluence);
  }

  vec2 q = vec2(0.);
  q.x = fbm(st + 0.00 * u_time);
  q.y = fbm(st + vec2(1.0));

  if (mouseDistance < 2.0) {
    q += mouseInfluence * (1.0 - mouseDistance) * 0.5;
  }

  vec2 r = vec2(0.);
  r.x = fbm(st + 1.0*q + vec2(1.7,9.2)+ 0.15*u_time);
  r.y = fbm(st + 1.0*q + vec2(8.3,2.8)+ 0.126*u_time);

  float f = fbm(st + r);

  if (mouseDistance < 2.0) {
    f += dot(normalize(mouseInfluence), vec2(0.5)) * (1.0 - smoothstep(0.0, 1.0, mouseDistance)) * 0.5;
  }

  vec3 color = vec3(0.05,0.11,0.18);
  color = mix(color, vec3(0.05,0.30,0.35), clamp(length(q)*0.2,0.0,1.0));
  color = mix(color, vec3(0.20,0.85,0.80), clamp(length(r.x)*0.1,0.0,1.0));
  color = mix(color, vec3(0.15, 0.45, 0.40), clamp(f*f*f + f*f*0.8, 0.0, 1.0));

  float vignette = smoothstep(0.8, 0.2, length(st - vec2(0.5)));
  color *= vec3(pow(vignette, 0.5) * 0.7);

  float glow = pow(f*f*f + f*f*0.5, 2.0) * 0.3;
  color += glow * vec3(0.8, 1.0, 0.9) * clamp(glow, 0.0, 1.0);

  gl_FragColor = vec4(color, 1.0);
}
`;

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false });
    if (!gl) return;

    // Compile shaders
    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Fullscreen quad
    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1,
    ]), gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uResolution = gl.getUniformLocation(program, 'u_resolution');

    // Resize
    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      gl!.viewport(0, 0, canvas.width, canvas.height);
      gl!.uniform2f(uResolution, canvas.width, canvas.height);
    }
    resize();
    window.addEventListener('resize', resize);

    // Mouse
    const handleMouseMove = (e: MouseEvent) => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      mouseRef.current.x = e.clientX * dpr;
      mouseRef.current.y = (window.innerHeight - e.clientY) * dpr;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Render loop
    let rafId: number;
    function render() {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      gl!.uniform1f(uTime, elapsed);
      gl!.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
      rafId = requestAnimationFrame(render);
    }
    render();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      />
      <div className="relative z-10 section-container text-center px-5 pt-24">
        <p className="animate-in text-white/60 text-sm font-medium uppercase tracking-[0.25em] mb-6">
          Intelligent Healthcare for Every Indian
        </p>
        <h1 className="animate-in font-display text-4xl sm:text-5xl md:text-6xl lg:text-[64px] text-white leading-tight mb-6 max-w-4xl mx-auto" style={{ textShadow: '0 2px 40px rgba(0,0,0,0.4)' }}>
          Intelligent Healthcare for Every Indian
        </h1>
        <p className="animate-in text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ transitionDelay: '0.1s' }}>
          India has 1 doctor for every 811 patients. We're using AI to multiply the impact of every doctor, digitize every OPD, and bring clinical intelligence to government hospitals, rural clinics, and specialist centres.
        </p>
        <div className="animate-in flex flex-col sm:flex-row gap-4 justify-center mb-16" style={{ transitionDelay: '0.2s' }}>
          <button onClick={() => scrollTo('solutions')} className="btn-primary bg-secondary hover:brightness-110">
            See Our Solutions
          </button>
          <button onClick={() => scrollTo('vision')} className="btn-outline">
            Our Vision
          </button>
        </div>
        <div className="animate-in flex flex-wrap justify-center gap-3 md:gap-4" style={{ transitionDelay: '0.3s' }}>
          {[
            { value: '1:811', label: "India's doctor-patient ratio" },
            { value: '4th', label: 'NHH 2.0 National Hackathon' },
            { value: '3', label: 'Working prototypes built' },
          ].map((stat) => (
            <div
              key={stat.value}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-card"
            >
              <span className="text-white font-bold text-lg">{stat.value}</span>
              <span className="text-white/60 text-xs md:text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
