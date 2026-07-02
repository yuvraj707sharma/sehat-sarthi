export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#0c2e41] pt-16 md:pt-24 pb-8">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-12 md:mb-16">
          {/* Left - Logo & Tagline */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
                <path d="M50 85 C50 85 15 60 15 35 C15 20 25 10 38 10 C45 10 50 18 50 18 C50 18 55 10 62 10 C75 10 85 20 85 35 C85 60 50 85 50 85Z" fill="#1a7f64" />
                <path d="M25 45 L40 45 L45 30 L55 60 L65 40 L80 40" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-white font-semibold text-lg">Sehat Sarthi</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-2">
              Intelligent Healthcare for Every Indian
            </p>
            <p className="text-white/30 text-sm">
              Building the future of Indian healthcare
            </p>
          </div>

          {/* Center - Links */}
          <div>
            <h4 className="text-white/80 text-sm font-semibold mb-4 uppercase tracking-wider">Navigate</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { label: 'Problem', id: 'problem' },
                { label: 'Solutions', id: 'solutions' },
                { label: 'Vision', id: 'vision' },
                { label: 'Team', id: 'team' },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left text-white/40 text-sm hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right - Contact */}
          <div>
            <h4 className="text-white/80 text-sm font-semibold mb-4 uppercase tracking-wider">Get in touch</h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#1a7f64] transition-colors"
              />
              <button className="px-5 py-2.5 bg-[#1a7f64] text-white text-sm font-medium rounded-full hover:scale-[0.98] hover:brightness-110 transition-all duration-300 whitespace-nowrap">
                Get in touch
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-xs text-center md:text-left">
              &copy; 2025 Sehat Sarthi. Built at JECRC University, Jaipur, Rajasthan.
            </p>
            <p className="text-white/20 text-xs text-center md:text-right">
              Prototype stage — not yet a licensed medical device. CDSCO SaMD compliance in progress.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
