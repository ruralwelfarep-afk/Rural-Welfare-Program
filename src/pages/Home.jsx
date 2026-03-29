import Slider from '../components/Slider'

const stats = [
  { value: '5,000+', label: 'Beneficiary Villages', icon: '🏘️' },
  { value: '12,000+', label: 'Women Workers', icon: '👩‍⚕️' },
  { value: '25 States', label: 'Active Coverage', icon: '🗺️' },
  { value: '₹2,500', label: 'Monthly Support', icon: '💰' },
]

const services = [
  {
    icon: '🩺',
    title: 'Free Health Check-ups',
    desc: 'Free health camps organized every Sunday for rural communities.',
  },
  {
    icon: '💊',
    title: 'Primary Medical Care',
    desc: 'Primary healthcare services delivered directly at the village level.',
  },
  {
    icon: '📚',
    title: 'Health Awareness',
    desc: 'Providing health education and awareness to women and children.',
  },
  {
    icon: '🌱',
    title: 'Women Empowerment',
    desc: 'Empowering women with employment and self-reliance opportunities.',
  },
]

const posts = [
  {
    title: 'Health Worker',
    salary: '₹2,500/month',
    level: 'Post 1',
    eligibility: ['12th Pass or above', 'Rural area women', 'Interest in social work'],
  },
  {
    title: 'Assistant Health Worker',
    salary: '₹2,200/month',
    level: 'Post 2',
    eligibility: ['12th Pass or above', 'Rural area women', 'Dedication to service'],
  },
]

function VillageSVG() {
  const sunRays = [0, 45, 90, 135, 180, 225, 270, 315]
  return (
    <svg viewBox="0 0 360 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Sun */}
      <circle cx="280" cy="58" r="34" fill="#f0c020" opacity="0.92"/>
      {sunRays.map((deg, i) => (
        <line
          key={i}
          x1={280 + 40 * Math.cos(deg * Math.PI / 180)}
          y1={58  + 40 * Math.sin(deg * Math.PI / 180)}
          x2={280 + 53 * Math.cos(deg * Math.PI / 180)}
          y2={58  + 53 * Math.sin(deg * Math.PI / 180)}
          stroke="#f0c020" strokeWidth="3" strokeLinecap="round" opacity="0.65"
        />
      ))}

      {/* Ground */}
      <rect x="0" y="242" width="360" height="58" rx="0" fill="#1a5c2a" opacity="0.35"/>
      <ellipse cx="180" cy="248" rx="172" ry="14" fill="#4a9e5c" opacity="0.4"/>

      {/* House */}
      <polygon points="55,178 108,132 161,178" fill="#c4956a"/>
      <rect x="65" y="178" width="86" height="70" fill="#e8b87a"/>
      <rect x="93" y="202" width="30" height="46" fill="#8B5E3C"/>
      <rect x="72" y="185" width="20" height="17" rx="2" fill="#a3d8f4" opacity="0.8"/>
      <rect x="124" y="185" width="20" height="17" rx="2" fill="#a3d8f4" opacity="0.8"/>
      <line x1="55" y1="178" x2="161" y2="178" stroke="#9b7545" strokeWidth="2.5"/>

      {/* Tree */}
      <rect x="236" y="202" width="11" height="46" rx="3" fill="#8B5E3C"/>
      <circle cx="242" cy="178" r="30" fill="#4a9e5c"/>
      <circle cx="224" cy="190" r="19" fill="#3d8a4f"/>
      <circle cx="260" cy="190" r="19" fill="#3d8a4f"/>
      <circle cx="242" cy="155" r="14" fill="#5cb870"/>

      {/* Adult person */}
      <circle cx="188" cy="148" r="13" fill="#2d7a3a"/>
      <rect x="178" y="161" width="20" height="38" rx="7" fill="#2d7a3a"/>
      <line x1="178" y1="170" x2="160" y2="187" stroke="#2d7a3a" strokeWidth="6" strokeLinecap="round"/>
      <line x1="198" y1="170" x2="212" y2="187" stroke="#2d7a3a" strokeWidth="6" strokeLinecap="round"/>
      <line x1="183" y1="199" x2="179" y2="228" stroke="#1a5c2a" strokeWidth="6" strokeLinecap="round"/>
      <line x1="193" y1="199" x2="197" y2="228" stroke="#1a5c2a" strokeWidth="6" strokeLinecap="round"/>

      {/* Child person */}
      <circle cx="150" cy="163" r="9" fill="#8dc63f"/>
      <rect x="143" y="172" width="14" height="26" rx="5" fill="#8dc63f"/>
      <line x1="157" y1="179" x2="178" y2="183" stroke="#8dc63f" strokeWidth="5" strokeLinecap="round"/>
      <line x1="146" y1="198" x2="143" y2="218" stroke="#5cb870" strokeWidth="5" strokeLinecap="round"/>
      <line x1="153" y1="198" x2="156" y2="218" stroke="#5cb870" strokeWidth="5" strokeLinecap="round"/>

      {/* Caring open hands */}
      <path d="M80,248 Q120,222 160,236 Q180,244 200,236 Q240,222 280,248"
        fill="none" stroke="#8dc63f" strokeWidth="7" strokeLinecap="round" opacity="0.75"/>

      {/* UNDP badge */}
      <rect x="8" y="8" width="80" height="24" rx="12" fill="#f0c020"/>
      <text x="48" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1a5c2a">UNDP ✓</text>

      {/* Info pills */}
      <rect x="264" y="198" width="86" height="22" rx="11" fill="rgba(255,255,255,0.13)"/>
      <text x="307" y="213" textAnchor="middle" fontSize="9.5" fill="white" fontWeight="500">5,000+ Villages</text>

      <rect x="8" y="198" width="90" height="22" rx="11" fill="rgba(255,255,255,0.13)"/>
      <text x="53" y="213" textAnchor="middle" fontSize="9.5" fill="white" fontWeight="500" >Free Health Camps</text>
    </svg>
  )
}

export default function Home() {
  return (
    <main className="overflow-x-hidden">

      {/* Hero Slider */}
      <Slider />

      {/* Stats */}
      <section className="bg-[#1a5c2a] py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
          {stats.map((s, i) => (
            <div key={i} className="text-white py-2">
              <div className="text-2xl sm:text-3xl mb-1">{s.icon}</div>
              <div className="text-xl sm:text-2xl font-bold text-[#f0c020]">{s.value}</div>
              <div className="text-green-200 text-xs sm:text-sm mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Text */}
          <div>
            <span className="text-[#4a9e5c] uppercase text-xs font-bold tracking-widest">
              About Us
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a5c2a] mt-2 mb-5 leading-snug">
              Rural Welfare Program —<br className="hidden sm:block"/> Empowering Communities
            </h2>

            <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
              <span className="font-semibold text-[#1a5c2a]">Rural Welfare Program</span> is a registered charitable organisation founded by a group of socially-conscious individuals. Our mission is to promote welfare, education, health, and empowerment in marginalized communities. We believe in inclusive development and sustainable change, driven by collective action and social responsibility.
            </p>

            <div className="border-l-4 border-[#f0c020] pl-4 mb-4 bg-[#fffdf0] py-3 pr-3 rounded-r-xl">
  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
    Our initiatives are inspired by global development goals focused on sustainability,
    community health, and empowerment of rural populations.
  </p>
</div>

<p className="text-gray-500 leading-relaxed mb-7 text-sm sm:text-base">
  We work at the grassroots level to create awareness, support community health,
  and promote self-reliance among rural populations.
</p>

<p className="text-red-600 font-semibold text-sm mb-5">
  We are not a government organization and do not provide any सरकारी नौकरी or scheme approval.
</p>

            <div className="flex flex-wrap gap-3">
              <a
                href="/about"
                className="inline-block bg-[#1a5c2a] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#2d7a3a] transition-all shadow text-sm sm:text-base"
              >
                Learn More →
              </a>
            </div>
          </div>

          {/* SVG Illustration */}
          <div className="relative mt-8 md:mt-0 flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#0d3d1c] to-[#2d7a3a] p-5 sm:p-7">
                <VillageSVG />
              </div>
              {/* Badge — bottom right */}
              {/* <div className="absolute -bottom-4 -right-3 bg-[#f0c020] rounded-2xl px-4 py-3 shadow-xl">
                <p className="text-[#1a5c2a] font-bold text-xl leading-none">10+</p>
                <p className="text-[#1a5c2a] text-[10px] font-semibold mt-0.5">Years of Service</p>
              </div> */}
              {/* Badge — top left */}
              {/* <div className="absolute -top-3 -left-3 bg-white rounded-2xl px-3 py-2 shadow-xl border border-gray-100">
                <p className="text-[#1a5c2a] font-bold text-xs">✅ Registered NGO</p>
              </div> */}
            </div>
          </div>

        </div>
      </section>

      {/* Services */}
      <section className="bg-[#f0f7f0] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-10">
            <span className="text-[#4a9e5c] uppercase text-xs font-bold tracking-widest">
              Our Services
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a5c2a] mt-2">
              What Does Our Program Do?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {services.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow hover:shadow-lg transition-all hover:-translate-y-1 border-b-4 border-[#f0c020]"
              >
                <div className="text-3xl sm:text-4xl mb-3">{s.icon}</div>
                <h3 className="text-[#1a5c2a] font-bold mb-2 text-sm sm:text-base">{s.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Posts */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-8 md:mb-10">
          <span className="text-[#4a9e5c] uppercase text-xs font-bold tracking-widest">
            Recruitment
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a5c2a] mt-2">
            Open Positions — Apply Now
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
          {posts.map((p, i) => (
            <div
              key={i}
              className="rounded-2xl border-2 border-[#1a5c2a] p-6 sm:p-8 relative overflow-hidden hover:bg-[#1a5c2a] group transition-all duration-300 cursor-pointer"
            >
              <div className="absolute top-4 right-4 bg-[#f0c020] text-[#1a5c2a] text-xs font-bold px-2 py-1 rounded">
                {p.level}
              </div>
              <div className="text-3xl sm:text-4xl mb-3">👩‍⚕️</div>
              <h3 className="text-[#1a5c2a] group-hover:text-white font-bold text-base sm:text-lg mb-2 transition-colors">
                {p.title}
              </h3>
              <p className="text-[#f0c020] font-bold text-xl sm:text-2xl mb-4">{p.salary}</p>
              <ul className="text-gray-600 group-hover:text-green-100 text-xs sm:text-sm space-y-1.5 mb-6 transition-colors">
                {p.eligibility.map((e, j) => (
                  <li key={j}>✓ {e}</li>
                ))}
              </ul>
              <a
                href="/apply"
                className="inline-block bg-[#f0c020] text-[#1a5c2a] px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold hover:bg-white transition-all"
              >
                Apply Now →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-[#1a5c2a] to-[#4a9e5c] py-12 md:py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 leading-snug">
            🌟 Healthy Villages — Empowered Women — Prosperous India 🌟
          </h2>
          <p className="text-green-100 text-sm sm:text-base mb-8">
            Visit your nearest Jan Seva Kendra (CSC) today and fill out the application form.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href="/apply"
              className="bg-[#f0c020] text-[#1a5c2a] px-6 sm:px-8 py-3 rounded-full font-bold hover:bg-white transition-all shadow-lg text-sm sm:text-base"
            >
              Apply Now
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-6 sm:px-8 py-3 rounded-full font-bold hover:bg-white hover:text-[#1a5c2a] transition-all text-sm sm:text-base"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}