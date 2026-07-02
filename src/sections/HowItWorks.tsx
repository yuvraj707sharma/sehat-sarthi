import { useEffect, useRef } from 'react';

const steps = [
  {
    title: 'Patient arrives',
    desc: 'Walks into any government hospital or PHC. No app download needed.',
  },
  {
    title: 'Aadhaar registration',
    desc: '60-second registration using Aadhaar. ABHA ID auto-created if not present.',
  },
  {
    title: 'Nurse triage',
    desc: '90-second AI-assisted triage. Vitals captured. Urgency flagged automatically.',
  },
  {
    title: 'Smart queue',
    desc: 'Load-balanced across available doctors. Public display shows real-time status.',
  },
  {
    title: 'AI clinical brief',
    desc: 'Doctor sees full history, trends, and differential diagnoses before the patient enters.',
  },
  {
    title: 'Digital investigations',
    desc: 'Radiology ordered digitally. RadiQ analyses images in real-time.',
  },
  {
    title: 'Pre-queued pharmacy',
    desc: 'Prescription auto-generated. Pharmacy pre-alerted. Patient collects and exits.',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path2 = path2Ref.current;
    if (!path2) return;

    function updateScrollLineProgress() {
      const section = sectionRef.current;
      const path2 = path2Ref.current;
      if (!section || !path2) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const totalScrollable = rect.height + windowHeight;
        const scrolled = windowHeight - rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
        path2.style.strokeDashoffset = String(1080 - (progress * 1080));
      }
    }

    window.addEventListener('scroll', updateScrollLineProgress, { passive: true });
    updateScrollLineProgress();

    return () => {
      window.removeEventListener('scroll', updateScrollLineProgress);
    };
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="section-padding bg-white relative overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="animate-in font-display text-3xl md:text-4xl lg:text-[48px] text-[#1d1d1d] mb-4">
            One Platform, Every Level of Care
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Neon Scroll Highway SVG */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-12 md:w-16 pointer-events-none">
            <svg
              className="w-full h-full"
              viewBox="0 0 60 800"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <linearGradient id="scrollGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1a7f64" />
                  <stop offset="50%" stopColor="#00ffd1" />
                  <stop offset="100%" stopColor="#0e3a51" />
                </linearGradient>
              </defs>
              {/* Dashed background line */}
              <path
                d="M30 0 L30 800"
                stroke="rgba(14, 58, 81, 0.15)"
                strokeWidth="2"
                strokeDasharray="12 20"
              />
              {/* Animated gradient line */}
              <path
                ref={path2Ref}
                d="M30 0 L30 800"
                stroke="url(#scrollGradient)"
                strokeWidth="3"
                strokeDasharray="20 1080"
                strokeDashoffset="1080"
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.1s linear' }}
              />
            </svg>
          </div>

          {/* Steps */}
          <div className="space-y-8 md:space-y-12 pl-16 md:pl-24">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="animate-in relative"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                {/* Dot */}
                <div className="absolute -left-16 md:-left-24 top-1 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border-2 border-[#1a7f64] flex items-center justify-center shadow-sm">
                  <span className="text-xs md:text-sm font-bold text-[#1a7f64]">{i + 1}</span>
                </div>
                <div className="bg-mint/50 rounded-2xl p-5 md:p-6 hover:bg-mint transition-colors duration-300">
                  <h3 className="text-lg md:text-xl font-semibold text-[#1d1d1d] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[#1d1d1d]/60 text-sm md:text-base leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <div className="animate-in mt-12 pl-16 md:pl-24" style={{ transitionDelay: '0.5s' }}>
            <div className="bg-[#0e3a51] rounded-2xl p-6 md:p-8 text-white">
              <p className="text-sm md:text-base leading-relaxed text-white/80">
                No smartphones required from patients. No disruption to existing hospital workflows. Every step operated by hospital staff.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
