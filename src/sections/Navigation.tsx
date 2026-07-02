import { useState, useEffect } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-[720px] transition-all duration-500 rounded-2xl ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-lg border border-white/60'
          : 'bg-white/10 backdrop-blur-md border border-white/20'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <button onClick={() => scrollTo('hero')} className="flex items-center gap-2 group">
          <svg width="28" height="28" viewBox="0 0 100 100" fill="none" className="flex-shrink-0">
            <path d="M50 85 C50 85 15 60 15 35 C15 20 25 10 38 10 C45 10 50 18 50 18 C50 18 55 10 62 10 C75 10 85 20 85 35 C85 60 50 85 50 85Z" fill={scrolled ? '#0e3a51' : '#ffffff'} className="transition-colors duration-500"/>
            <path d="M25 45 L40 45 L45 30 L55 60 L65 40 L80 40" stroke="#1a7f64" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className={`font-semibold text-base tracking-tight transition-colors duration-500 ${scrolled ? 'text-[#0e3a51]' : 'text-white'}`}>
            Sehat Sarthi
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Problem', id: 'problem' },
            { label: 'Solutions', id: 'solutions' },
            { label: 'Vision', id: 'vision' },
            { label: 'Team', id: 'team' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`text-sm font-medium transition-colors duration-300 hover:opacity-70 ${
                scrolled ? 'text-[#1d1d1d]' : 'text-white/90'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="px-5 py-2 bg-[#0e3a51] text-white text-sm font-medium rounded-full hover:scale-[0.98] hover:brightness-110 transition-all duration-300"
          >
            Contact
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-1"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 rounded-full transition-all duration-300 ${scrolled ? 'bg-[#0e3a51]' : 'bg-white'} ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 rounded-full transition-all duration-300 ${scrolled ? 'bg-[#0e3a51]' : 'bg-white'} ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 rounded-full transition-all duration-300 ${scrolled ? 'bg-[#0e3a51]' : 'bg-white'} ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-80 pb-4' : 'max-h-0'}`}>
        <div className="px-4 pt-2 flex flex-col gap-3">
          {[
            { label: 'Problem', id: 'problem' },
            { label: 'Solutions', id: 'solutions' },
            { label: 'Vision', id: 'vision' },
            { label: 'Team', id: 'team' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`text-left text-sm font-medium py-2 transition-colors ${
                scrolled ? 'text-[#1d1d1d]' : 'text-white/90'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="mt-2 px-5 py-2.5 bg-[#0e3a51] text-white text-sm font-medium rounded-full"
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
}
