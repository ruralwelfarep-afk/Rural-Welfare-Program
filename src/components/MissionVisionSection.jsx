export default function MissionVisionSection() {
  return (
    <>
      {/* Mission & Vision */}
      <section className="bg-[#f0f7f0] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-[#4a9e5c] uppercase text-xs font-bold tracking-widest">
              Our Purpose
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a5c2a] mt-2">
              Mission &amp; Vision
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {/* Mission */}
            <div className="rounded-2xl border-2 border-[#1a5c2a] p-6 sm:p-8 relative overflow-hidden hover:bg-[#1a5c2a] group transition-all duration-300">
              <div className="absolute top-4 right-4 bg-[#f0c020] text-[#1a5c2a] text-xs font-bold px-2 py-1 rounded">
                Mission
              </div>
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-[#1a5c2a] group-hover:text-white font-bold text-lg mb-3 transition-colors">
                Our Mission
              </h3>
              <p className="text-gray-600 group-hover:text-green-100 text-sm leading-relaxed transition-colors">
                To serve humanity by addressing social challenges through education, healthcare,
                livelihood, and empowerment initiatives, thereby promoting equity and dignity for
                all.
              </p>
            </div>

            {/* Vision */}
            <div className="rounded-2xl border-2 border-[#1a5c2a] p-6 sm:p-8 relative overflow-hidden hover:bg-[#1a5c2a] group transition-all duration-300">
              <div className="absolute top-4 right-4 bg-[#f0c020] text-[#1a5c2a] text-xs font-bold px-2 py-1 rounded">
                Vision
              </div>
              <div className="text-4xl mb-4">🌏</div>
              <h3 className="text-[#1a5c2a] group-hover:text-white font-bold text-lg mb-3 transition-colors">
                Our Vision
              </h3>
              <p className="text-gray-600 group-hover:text-green-100 text-sm leading-relaxed transition-colors">
                To build a compassionate, empowered, and inclusive society where every individual
                has access to basic needs, opportunities, and a life of dignity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Awareness */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-10">
          <span className="text-[#4a9e5c] uppercase text-xs font-bold tracking-widest">
            Awareness
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a5c2a] mt-2">
            What is an Awareness Campaign?
          </h2>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-[#f0c020]" />
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Text */}
          <div>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-5">
              An awareness campaign is a focused effort to educate and inform a specific audience
              about an issue, idea, service, or practice. It aims to make people aware of
              something — whether it's a social issue, a brand, or a message.
            </p>

            <div className="border-l-4 border-[#f0c020] pl-4 mb-5 bg-[#fffdf0] py-3 pr-3 rounded-r-xl">
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                The main goal of an awareness campaign is to{' '}
                <span className="font-semibold text-[#1a5c2a]">increase brand awareness</span>.
                This allows the ideal audience group to become familiar with the brand and stay
                updated on the latest developments and products.
              </p>
            </div>

            <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
              Consumers are more likely to remember awareness campaigns through increased exposure
              frequency — how often they're exposed to an advertisement or brand. Multiple
              positive associations create invaluable bonds and experiences between a brand and its
              desired audience, allowing it to stand out among competitors.
            </p>
          </div>

          {/* Goal cards */}
          <div className="space-y-4">
            {[
              {
                icon: '📣',
                title: 'Reach Aligned Audiences',
                desc: 'Connect with people who share the organisation\'s beliefs and values.',
              },
              {
                icon: '📚',
                title: 'Educate Potential Supporters',
                desc: 'Generate awareness among those who can contribute to the cause.',
              },
              {
                icon: '🤝',
                title: 'Generate New Contacts',
                desc: 'Build a network of supporters, volunteers, and partners.',
              },
              {
                icon: '🌱',
                title: 'Increase Visibility',
                desc: 'Stand out as a trusted leader in community welfare and social impact.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-white rounded-2xl p-4 shadow hover:shadow-lg transition-all hover:-translate-y-0.5 border-b-4 border-[#f0c020]"
              >
                <div className="text-2xl mt-0.5">{item.icon}</div>
                <div>
                  <h4 className="text-[#1a5c2a] font-bold text-sm mb-1">{item.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}