import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 50;
const TRAIL_LENGTH = 20;

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hue: number;
  trail: { x: number; y: number }[];
  width: number;
  height: number;

  constructor(w: number, h: number) {
    this.width = w;
    this.height = h;
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 1 - 0.5;
    this.radius = Math.random() * 3 + 2;
    this.hue = Math.random() * 60 + 160;
    this.trail = [];
  }

  update(time: number) {
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > TRAIL_LENGTH) {
      this.trail.shift();
    }
    this.x += this.vx;
    this.y += this.vy;
    this.x += Math.sin(this.y * 0.01 + time * 0.05) * 0.5;

    if (this.x < 0) this.x = this.width;
    else if (this.x > this.width) this.x = 0;
    if (this.y < 0) this.y = this.height;
    else if (this.y > this.height) this.y = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = `hsla(${this.hue}, 70%, 50%, 0.2)`;
    ctx.lineWidth = this.radius;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (this.trail.length > 1) {
      ctx.beginPath();
      ctx.moveTo(this.trail[0].x, this.trail[0].y);
      for (let i = 1; i < this.trail.length; i++) {
        ctx.lineTo(this.trail[i].x, this.trail[i].y);
      }
      ctx.stroke();
    }

    ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, 0.8)`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let time = 0;
    let rafId: number;

    function resize() {
      if (!canvas) return;
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;
      particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle(width, height));
    }

    function animate() {
      if (!ctx) return;
      time++;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(0, 0, width, height);

      for (const p of particles) {
        p.update(time);
        p.draw(ctx);
      }
      rafId = requestAnimationFrame(animate);
    }

    resize();
    animate();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.6,
      }}
    />
  );
}

export default function Problem() {
  const cards = [
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#0e3a51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="24" cy="14" r="8" />
          <path d="M10 42c0-10 6-16 14-16s14 6 14 16" />
          <path d="M28 10h4M26 14h4M28 18h4" stroke="#1a7f64" strokeWidth="2" />
          <path d="M20 22l4-4 4 4" stroke="#1a7f64" />
        </svg>
      ),
      title: 'Doctor Shortage',
      body: '70% of doctors serve only 30% of the population. Rural districts face 1:13,000 ratios. Community Health Centres have an 80% shortfall of specialists.',
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#0e3a51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="8" y="8" width="32" height="6" rx="2" />
          <rect x="8" y="18" width="32" height="6" rx="2" />
          <rect x="8" y="28" width="32" height="6" rx="2" />
          <rect x="8" y="38" width="20" height="6" rx="2" />
          <circle cx="38" cy="41" r="3" stroke="#1a7f64" strokeWidth="2" />
          <path d="M36 41h4" stroke="#1a7f64" strokeWidth="2" />
        </svg>
      ),
      title: 'Lost in the System',
      body: 'Patients travel hours to large hospitals, wait 3–4 hours in OPD queues, see a doctor for 3 minutes, then repeat the journey for a lab report. Every step wastes time that costs lives.',
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#0e3a51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="24" cy="28" rx="14" ry="10" />
          <path d="M24 18V8" />
          <path d="M18 12h12" />
          <circle cx="24" cy="28" r="4" />
          <path d="M24 24v8M20 28h8" />
          <circle cx="38" cy="12" r="6" stroke="#e8a838" strokeWidth="2" />
          <path d="M38 9v6M35 12h6" stroke="#e8a838" strokeWidth="2" />
        </svg>
      ),
      title: 'Data Sitting Idle',
      body: 'Hospitals generate enormous clinical data — X-rays, lab reports, prescriptions, EHR records — but none of it is connected or intelligently analysed to help the next patient.',
    },
  ];

  return (
    <section id="problem" className="relative section-padding bg-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ParticleCanvas />
      </div>
      <div className="section-container relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="animate-in font-display text-3xl md:text-4xl lg:text-[48px] text-[#1d1d1d] mb-4">
            The Gap We're Closing
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className="animate-in bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 border border-gray-100"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="mb-5">{card.icon}</div>
              <h3 className="text-xl font-semibold text-[#1d1d1d] mb-3">{card.title}</h3>
              <p className="text-[#1d1d1d]/70 text-sm leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
