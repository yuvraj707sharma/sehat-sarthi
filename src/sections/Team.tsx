const achievements = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#0e3a51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 4l4 10h10l-8 7 3 10-9-6-9 6 3-10-8-7h10z" stroke="#e8a838" strokeWidth="2" />
        <path d="M24 30v10M18 44h12" stroke="#0e3a51" strokeWidth="1.5" />
      </svg>
    ),
    title: '4th Place — NHH 2.0 National Healthcare Hackathon',
    body: 'Competed against teams from across India on real hospital problem statements.',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#0e3a51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 24c0-8 6-14 12-14s12 6 12 14M12 24v6M36 24v6" stroke="#1a7f64" strokeWidth="2" />
        <path d="M8 30h32v6H8z" />
        <path d="M18 30v-4a6 6 0 0112 0v4" stroke="#0e3a51" strokeWidth="1.5" />
      </svg>
    ),
    title: 'Medical Institution Partnership',
    body: 'Clinical data access, lab access, and doctor validation partnerships secured for product development and research.',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#0e3a51" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 40V16l16-10 16 10v24" stroke="#0e3a51" strokeWidth="2" />
        <path d="M4 40h40" stroke="#0e3a51" strokeWidth="2" />
        <rect x="18" y="26" width="12" height="14" rx="1" stroke="#1a7f64" strokeWidth="2" />
        <circle cx="24" cy="20" r="3" stroke="#1a7f64" strokeWidth="2" />
        <path d="M14 40V30h-4v10M38 40V30h-4v10" stroke="#0e3a51" strokeWidth="1" />
      </svg>
    ),
    title: 'JECRC University AI Team',
    body: "Built as part of the university's official AI innovation team, with institutional support and infrastructure.",
  },
];

const team = [
  {
    initials: 'YS',
    name: 'Yuvraj Sharma',
    role: 'Founder & Lead Engineer',
    bio: 'Third-year B.Tech student at JECRC University. Built CliniQ, RadiQ, and VitalBand end-to-end.',
    color: '#0e3a51',
  },
  {
    initials: 'TP',
    name: 'Tarun Pancholi',
    role: 'Co-founder & AI/ML',
    bio: 'JECRC University AI Team. Machine learning and model integration.',
    color: '#1a7f64',
  },
];

export default function Team() {
  return (
    <section id="team" className="section-padding bg-white">
      <div className="section-container">
        {/* Achievements */}
        <div className="mb-16 md:mb-24">
          <div className="text-center mb-12">
            <h2 className="animate-in font-display text-3xl md:text-4xl lg:text-[48px] text-[#1d1d1d] mb-4">
              Validated by the Ecosystem
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {achievements.map((item, i) => (
              <div
                key={item.title}
                className="animate-in p-6 lg:p-8 rounded-2xl bg-mint hover:bg-[#e8f5f2] transition-all duration-300 text-center"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="flex justify-center mb-5">{item.icon}</div>
                <h3 className="text-lg font-semibold text-[#1d1d1d] mb-2">{item.title}</h3>
                <p className="text-[#1d1d1d]/60 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="text-center mb-12">
          <h2 className="animate-in font-display text-3xl md:text-4xl lg:text-[48px] text-[#1d1d1d] mb-4">
            The Team
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-2xl mx-auto">
          {team.map((member, i) => (
            <div
              key={member.name}
              className="animate-in text-center p-6 lg:p-8"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-5 text-white font-bold text-xl md:text-2xl"
                style={{ backgroundColor: member.color }}
              >
                {member.initials}
              </div>
              <h3 className="text-lg font-semibold text-[#1d1d1d] mb-1">{member.name}</h3>
              <p className="text-[#1a7f64] text-sm font-medium mb-3">{member.role}</p>
              <p className="text-[#1d1d1d]/50 text-sm leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>

        {/* Adviser */}
        <div className="animate-in mt-8 text-center" style={{ transitionDelay: '0.3s' }}>
          <p className="text-[#1d1d1d]/40 text-sm">
            Under the direction of <span className="font-medium text-[#1d1d1d]/60">Dheemant Agrawal</span>, JECRC University AI Team Director.
          </p>
        </div>
      </div>
    </section>
  );
}
