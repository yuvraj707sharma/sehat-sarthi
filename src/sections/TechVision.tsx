import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function HelixVortex() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 18;
    camera.position.y = 2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    // Helix construction
    const NECKLACE_COUNT = 24;
    const GEM_PER_NECKLACE = 12;
    const SPIRAL_RADIUS = 4;
    const VERTICAL_GAP = 1.2;

    const sharedMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffd1, wireframe: true, transparent: true, opacity: 0.6 });
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 });

    const gemGeo = new THREE.OctahedronGeometry(0.3, 0);
    const sphereGeo = new THREE.SphereGeometry(0.08, 8, 8);

    const groupA = new THREE.Group();
    const groupB = new THREE.Group();
    scene.add(groupA);
    scene.add(groupB);

    for (let i = 0; i < NECKLACE_COUNT; i++) {
      const y = (i - NECKLACE_COUNT / 2) * VERTICAL_GAP;
      const phase = i * 0.5;

      // Build ringA
      const ringA = new THREE.Group();
      ringA.position.set(Math.cos(phase) * SPIRAL_RADIUS, y, Math.sin(phase) * SPIRAL_RADIUS);
      ringA.rotation.y = -phase;
      groupA.add(ringA);

      // Build clusterA
      const clusterA = new THREE.Group();
      ringA.add(clusterA);

      for (let j = 0; j < GEM_PER_NECKLACE; j++) {
        const angle = (j / GEM_PER_NECKLACE) * Math.PI * 2;
        const rx = 0;
        const ry = Math.cos(angle) * 1.2;
        const rz = Math.sin(angle) * 1.2;

        const gem = new THREE.Mesh(gemGeo, sharedMaterial);
        gem.position.set(rx, ry, rz);
        gem.rotation.z = angle;
        clusterA.add(gem);

        const dot = new THREE.Mesh(sphereGeo, sphereMaterial);
        dot.position.set(rx, ry, rz);
        clusterA.add(dot);
      }

      // Mirror A into B
      const ringB = ringA.clone();
      const clusterB = clusterA.clone();
      ringB.add(clusterB);
      groupB.add(ringB);
    }

    groupB.rotation.y = Math.PI;

    // Animation
    let rafId: number;
    function animate() {
      groupA.rotation.y += 0.002;
      groupB.rotation.y -= 0.002;

      for (const child of groupA.children) {
        if (child.children[0]) {
          child.children[0].scale.setScalar(1 + Math.sin(Date.now() * 0.002 + child.position.y) * 0.1);
        }
      }
      for (const child of groupB.children) {
        if (child.children[0]) {
          child.children[0].scale.setScalar(1 + Math.sin(Date.now() * 0.002 + child.position.y) * 0.1);
        }
      }

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    }
    animate();

    // Resize
    function handleResize() {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      gemGeo.dispose();
      sphereGeo.dispose();
      sharedMaterial.dispose();
      sphereMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '400px',
      }}
    />
  );
}

const techPillars = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4v24M8 10l8-6 8 6M8 22l8 6 8-6" />
        <circle cx="16" cy="16" r="4" />
      </svg>
    ),
    title: 'Gemini 2.5 Flash AI',
    desc: 'Clinical reasoning engine',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="6" width="24" height="20" rx="2" />
        <path d="M4 12h24M10 6v20M22 6v20" />
        <path d="M12 16h2M18 20h2" stroke="#00ffd1" strokeWidth="2" />
      </svg>
    ),
    title: 'DICOM + PACS compatible',
    desc: 'Radiology pipeline',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4l12 6v12l-12 6L4 22V10l12-6z" />
        <path d="M16 16v12M4 10l12 6 12-6" stroke="#00ffd1" strokeWidth="1.5" />
      </svg>
    ),
    title: 'ABDM / ABHA ready',
    desc: 'Government health network integration',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="16" r="10" />
        <path d="M16 10v6l4 2" stroke="#00ffd1" strokeWidth="2" />
        <path d="M8 4l2 2M24 4l-2 2" />
      </svg>
    ),
    title: 'Offline-first PWA',
    desc: 'Works without internet in rural areas',
  },
];

const visions = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 8c-12 0-20 10-20 16s8 16 20 16 20-10 20-16S36 8 24 8z" />
        <path d="M24 16v16M16 24h16" stroke="#1a7f64" strokeWidth="2" />
        <path d="M10 24c0-4 4-8 8-8M30 32c4 0 8-4 8-8" stroke="#00ffd1" strokeWidth="1.5" />
      </svg>
    ),
    title: 'Predict Heart Failure Before It Happens',
    desc: 'Continuous monitoring through wearables and AI trained on cardiac patient data to detect deterioration patterns days before a clinical event. Early warning that gives patients and doctors time to act.',
    badge: '2–3 years',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 32c0-8 6-14 14-16M34 32c0-8-6-14-14-16" stroke="#00ffd1" strokeWidth="1.5" />
        <circle cx="24" cy="12" r="4" stroke="#1a7f64" strokeWidth="2" />
        <path d="M14 36l4-8 6 4 8-8 6 6" stroke="#1a7f64" strokeWidth="1.5" />
      </svg>
    ),
    title: 'Give Voice to Those Who Cannot Speak',
    desc: 'AI-powered communication tools for patients with ALS, stroke, or neurological conditions that have taken their ability to speak. From eye-tracking interfaces to voice reconstruction from minimal samples.',
    badge: '3–5 years',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="14" r="6" />
        <path d="M14 40c0-8 4-14 10-14s10 6 10 14" />
        <path d="M20 28l4 6 4-6" stroke="#00ffd1" strokeWidth="2" />
      </svg>
    ),
    title: 'Help Paralysed People Move Again',
    desc: 'Combining AI-controlled functional electrical stimulation with exoskeleton technology to restore voluntary movement to paralysed patients. Building the software layer that makes hardware therapy intelligent and personalised.',
    badge: '5–7 years',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 4L6 14v20l18 10 18-10V14L24 4z" />
        <path d="M24 24v20M6 14l18 10 18-10" stroke="#00ffd1" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="3" stroke="#1a7f64" strokeWidth="2" />
      </svg>
    ),
    title: 'AI in the Operation Theatre',
    desc: "Voice-activated AI clinical assistant for surgeons — retrieves patient history, flags allergies, presents prior imaging, and surfaces relevant conditions without ever suggesting treatment. The surgeon's second memory, not their replacement.",
    badge: 'In development',
  },
];

export default function TechVision() {
  return (
    <>
      {/* Technology Section */}
      <section className="section-padding bg-[#0e3a51] relative overflow-hidden">
        <div className="section-container">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="animate-in font-display text-3xl md:text-4xl lg:text-[48px] text-white mb-4">
              Built for India — Built to Last
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Tech Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {techPillars.map((pillar, i) => (
                <div
                  key={pillar.title}
                  className="animate-in p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className="mb-4">{pillar.icon}</div>
                  <h3 className="text-white font-semibold text-base mb-1">{pillar.title}</h3>
                  <p className="text-white/50 text-sm">{pillar.desc}</p>
                </div>
              ))}
            </div>

            {/* Helix Vortex */}
            <div className="animate-in h-[400px] lg:h-[500px]" style={{ transitionDelay: '0.2s' }}>
              <HelixVortex />
            </div>
          </div>

          <div className="animate-in mt-12 text-center" style={{ transitionDelay: '0.3s' }}>
            <p className="text-white/40 text-sm">
              CDSCO Class II SaMD roadmap in progress. DPDP Act 2023 compliant from day one.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="section-padding bg-[#0c2e41]">
        <div className="section-container">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="animate-in font-display text-3xl md:text-4xl lg:text-[48px] text-white mb-4">
              Where We're Going
            </h2>
            <p className="animate-in text-white/50 text-base md:text-lg max-w-2xl mx-auto" style={{ transitionDelay: '0.1s' }}>
              Today we're digitising OPDs and assisting doctors. Tomorrow we're changing what medicine can do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {visions.map((vision, i) => (
              <div
                key={vision.title}
                className="animate-in relative p-6 lg:p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="absolute left-0 top-6 bottom-6 w-1 rounded-full bg-[#1a7f64] opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start justify-between mb-4 pl-4">
                  <div className="p-3 bg-white/5 rounded-xl">{vision.icon}</div>
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#1a7f64]/20 text-[#1a7f64]">
                    {vision.badge}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 pl-4">{vision.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed pl-4">{vision.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
