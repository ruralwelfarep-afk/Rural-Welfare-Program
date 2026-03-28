export default function AboutHeroSection() {
  return (
    <>
      {/* Hero Banner — same as Contact page */}
      <section className="bg-gradient-to-r from-[#1a5c2a] to-[#4a9e5c] py-14 md:py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <span className="text-[#f0c020] uppercase text-xs font-bold tracking-widest">
            About Us
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 leading-tight">
            Rural Welfare Program
          </h1>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-[#f0c020]" />
          <p className="text-green-100 text-sm sm:text-base mt-5 leading-relaxed">
            A registered charitable organisation working towards welfare, health,<br className="hidden sm:block" />
            and empowerment of marginalized communities across India.
          </p>
        </div>
      </section>

    <section className="max-w-7xl mx-auto px-4 py-14 md:py-20">

      {/* Content grid */}
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">

        {/* Left — main text */}
        <div>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-5">
            <span className="font-semibold text-[#1a5c2a]">Rural Welfare Program</span> is a
            registered charitable organisation founded in{' '}
            <span className="font-semibold text-[#1a5c2a]">[Year]</span> by a group of
            socially-conscious individuals. Our mission is to promote welfare, education, health,
            and empowerment in marginalized communities. We believe in inclusive development and
            sustainable change, driven by collective action and social responsibility.
          </p>

          {/* UNDP quote block */}
          <div className="border-l-4 border-[#f0c020] pl-4 mb-5 bg-[#fffdf0] py-3 pr-3 rounded-r-xl">
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              <span className="font-semibold text-[#1a5c2a]">UNDP's</span> work proves that
              investing in development makes things possible. By connecting prosperity, climate,
              energy, nature, resilience, innovation and digitalization, we are reaching — and
              exceeding — our global ambitions while accelerating progress.
            </p>
          </div>

          <p className="text-gray-500 leading-relaxed text-sm sm:text-base mb-4">
            <span className="font-semibold text-[#1a5c2a]">Life at UNDP:</span> Collaborating and
            innovating towards a better future for all.
          </p>
          <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
            When you join UNDP, you are dedicating your energy, time and skills towards building a
            more prosperous, fair and inclusive world for people in need around the world.
          </p>
        </div>

        {/* Right — highlight cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: '🏘️', label: 'Community Focused', desc: 'Reaching 5,000+ villages across rural India.' },
            { icon: '👩‍⚕️', label: 'Women-Led', desc: 'Empowering over 12,000 women workers across 25 states.' },
            { icon: '🤝', label: 'UNDP Backed', desc: 'Aligned with UNDP\'s global development framework.' },
            { icon: '💡', label: 'Inclusive Growth', desc: 'Driving sustainable change through collective action.' },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-[#f0f7f0] rounded-2xl p-5 border-b-4 border-[#f0c020] hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <div className="text-3xl mb-2">{card.icon}</div>
              <h3 className="text-[#1a5c2a] font-bold text-sm mb-1">{card.label}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}