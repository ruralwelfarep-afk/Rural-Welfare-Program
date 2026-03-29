export default function AboutHeroSection() {
  return (
    <>
      {/* Hero Banner */}
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
            An independent initiative working towards rural development, health,<br className="hidden sm:block" />
            education, and empowerment of communities across India.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="max-w-7xl mx-auto px-4 py-14 md:py-20">

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">

          {/* LEFT */}
          <div>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-5">
              <span className="font-semibold text-[#1a5c2a]">Rural Welfare Program</span> is an 
              independent social initiative founded with the vision of improving the quality of life 
              in rural and underserved communities. Our focus areas include education awareness, 
              healthcare support, and community empowerment.
            </p>

            <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-5">
              We believe in sustainable and inclusive development driven by collective participation 
              and grassroots engagement. Our work aims to create long-term positive impact by 
              connecting people with opportunities, knowledge, and essential services.
            </p>

            {/* SAFE GLOBAL LINE */}
            <div className="border-l-4 border-[#f0c020] pl-4 mb-5 bg-[#fffdf0] py-3 pr-3 rounded-r-xl">
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Our approach is inspired by global development principles and aligned with broader 
                sustainability goals promoted by international organizations such as{" "}
                <span className="font-semibold text-[#1a5c2a]">
                  United Nations Development Programme (UNDP)
                </span>.
              </p>
            </div>

            <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
              We are committed to building a more inclusive, aware, and empowered society through 
              responsible initiatives and community-driven programs.
            </p>

            {/* IMPORTANT DISCLAIMER */}
            <p className="mt-5 text-red-600 font-semibold text-sm">
              We are not a government organization and do not provide any सरकारी नौकरी or scheme approval.
            </p>
          </div>

          {/* RIGHT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: '🏘️', label: 'Community Focused', desc: 'Working at grassroots level in rural areas.' },
              { icon: '👩‍⚕️', label: 'Women Empowerment', desc: 'Supporting women-led initiatives and awareness.' },
              { icon: '🌍', label: 'Global Vision', desc: 'Aligned with global sustainability and development goals.' },
              { icon: '💡', label: 'Inclusive Growth', desc: 'Promoting equal opportunities for all communities.' },
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