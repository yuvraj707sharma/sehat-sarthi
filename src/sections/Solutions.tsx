const products = [
  {
    name: 'CliniQ OPD System',
    phase: 'Phase 1',
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#0e3a51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="10" width="36" height="28" rx="4" />
        <path d="M6 18h36" />
        <circle cx="14" cy="14" r="1.5" fill="#0e3a51" />
        <circle cx="20" cy="14" r="1.5" fill="#0e3a51" />
        <circle cx="26" cy="14" r="1.5" fill="#0e3a51" />
        <path d="M16 26h8M16 30h12" stroke="#1a7f64" strokeWidth="2" />
        <path d="M32 24l4 4-4 4" stroke="#1a7f64" strokeWidth="2" />
      </svg>
    ),
    description: 'AI-powered OPD management for government hospitals. Aadhaar-based registration, dynamic doctor load balancing, nurse triage routing, and public display boards. Patient never needs a smartphone.',
  },
  {
    name: 'CliniQ Doctor',
    phase: 'Phase 1',
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#0e3a51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="8" width="28" height="22" rx="3" />
        <path d="M12 32l-4 8M28 32l4 8" />
        <circle cx="20" cy="19" r="5" stroke="#1a7f64" strokeWidth="2" />
        <path d="M20 16v6M17 19h6" stroke="#1a7f64" strokeWidth="2" />
        <path d="M38 14h4v20h-4" stroke="#0e3a51" strokeWidth="1.5" />
        <path d="M40 18v2" stroke="#1a7f64" strokeWidth="2" />
      </svg>
    ),
    description: 'AI clinical decision support for doctors. EHR-integrated pre-consultation brief, differential diagnosis with reasoning chain, drug interaction checker, and prescription writer. Saves 2–3 minutes per patient consultation.',
  },
  {
    name: 'RadiQ',
    phase: 'Phase 1',
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#0e3a51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="4" width="36" height="40" rx="3" />
        <rect x="10" y="8" width="28" height="28" rx="2" />
        <path d="M14 32l6-10 4 6 6-12 4 8" stroke="#1a7f64" strokeWidth="2" fill="none" />
        <circle cx="30" cy="16" r="3" stroke="#1a7f64" strokeWidth="1.5" />
        <path d="M14 40h20" stroke="#0e3a51" strokeWidth="1.5" />
        <circle cx="18" cy="40" r="1.5" fill="#1a7f64" />
      </svg>
    ),
    description: 'AI radiology pre-screening. Analyses X-rays, CTs, and MRI images to generate preliminary Findings and Impression reports. Flags urgent cases to the ordering doctor in real-time. Radiologist verifies and signs off.',
  },
  {
    name: 'CliniQ Patient',
    phase: 'Phase 1',
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#0e3a51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="12" y="4" width="24" height="40" rx="4" />
        <path d="M18 4v-2h12v2" />
        <path d="M20 14h8M20 18h6" stroke="#1a7f64" strokeWidth="2" />
        <path d="M24 28c-3 0-5.5 2-6 5h12c-.5-3-3-5-6-5z" stroke="#1a7f64" strokeWidth="1.5" />
        <circle cx="24" cy="23" r="3" stroke="#1a7f64" strokeWidth="1.5" />
        <path d="M18 38h12" stroke="#0e3a51" strokeWidth="1" opacity="0.3" />
      </svg>
    ),
    description: 'D2C patient app. Symptom input in 48 languages, home care guidance, personal EHR locker, appointment booking, and OPD receipt generation. DPDP Act 2023 compliant. No drug names shown — clinically safe.',
  },
  {
    name: 'VitalBand',
    phase: 'Phase 2',
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#0e3a51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="16" y="6" width="16" height="36" rx="8" />
        <path d="M20 6V4h8v2" />
        <path d="M20 42v2h8v-2" />
        <rect x="20" y="14" width="8" height="14" rx="4" stroke="#1a7f64" strokeWidth="2" />
        <path d="M24 18v6" stroke="#1a7f64" strokeWidth="2" />
        <path d="M21 21h6" stroke="#1a7f64" strokeWidth="2" />
        <circle cx="24" cy="34" r="2" stroke="#e8a838" strokeWidth="1.5" />
      </svg>
    ),
    description: 'Health monitoring wearable. Tracks SpO2, heart rate, steps, and fall detection. Live vitals streamed to doctor dashboard during consultation. Caregiver alert with GPS location on fall detection.',
  },
  {
    name: 'RuralQ',
    phase: 'Phase 2',
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#0e3a51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 38l8-16 6 8 8-12 10 14" stroke="#1a7f64" strokeWidth="2" fill="none" />
        <path d="M4 40h40" stroke="#0e3a51" strokeWidth="1.5" />
        <path d="M6 40l4-20 4 8 6-10 6 8 6-6 6 12" stroke="#0e3a51" strokeWidth="1" opacity="0.4" fill="none" />
        <circle cx="38" cy="10" r="5" stroke="#1a7f64" strokeWidth="2" />
        <path d="M38 7v6M35 10h6" stroke="#1a7f64" strokeWidth="2" />
      </svg>
    ),
    description: 'Offline-first telemedicine for rural PHCs. On-device AI model runs without internet. Voice-first in local dialects. ASHA worker assisted mode. WebRTC video consultation with specialist.',
  },
];

export default function Solutions() {
  return (
    <section id="solutions" className="section-padding bg-mint">
      <div className="section-container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="animate-in font-display text-3xl md:text-4xl lg:text-[48px] text-[#1d1d1d] mb-4">
            What We've Built
          </h2>
          <p className="animate-in text-[#1d1d1d]/60 text-base md:text-lg max-w-2xl mx-auto" style={{ transitionDelay: '0.1s' }}>
            A suite of AI products that work together — each solving a specific problem in the healthcare system.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {products.map((product, i) => (
            <div
              key={product.name}
              className="animate-in bg-white rounded-2xl p-6 lg:p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-start justify-between mb-5">
                <div className="p-3 bg-mint rounded-xl group-hover:bg-[#e8f5f2] transition-colors duration-300">
                  {product.icon}
                </div>
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                  product.phase === 'Phase 1'
                    ? 'bg-[#1a7f64]/10 text-[#1a7f64]'
                    : 'bg-[#e8a838]/10 text-[#e8a838]'
                }`}>
                  {product.phase}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-[#1d1d1d] mb-3">{product.name}</h3>
              <p className="text-[#1d1d1d]/60 text-sm leading-relaxed">{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
