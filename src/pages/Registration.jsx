// PostsPage.jsx
// Shows post cards — clicking Apply navigates to /apply with post data via React Router state

import { useNavigate } from 'react-router-dom'

const posts = [
  {
    id: 1,
    title: 'Assistant Health Worker',
    level: 'Post 1',
    // salary: '₹2,200/month',
    ageLimit: '18 – 50 Years',
    feeGeneral: '₹1,100',
    feeOBC: '₹1,000',
    eligibility: ['12th Pass or above', 'Rural area women', 'Dedication to service'],
  },
  {
    id: 2,
    title: 'Health Worker',
    level: 'Post 2',
    // salary: '₹2,500/month',
    ageLimit: '18 – 50 Years',
    feeGeneral: '₹1,100',
    feeOBC: '₹1,000',
    eligibility: ['12th Pass or above', 'Rural area women', 'Interest in social work'],
  },
]

export default function Registration() {
  const navigate = useNavigate()

  const handleApply = (post) => {
    navigate('/apply', { state: { post } })
  }

  return (
    <main className="overflow-x-hidden">

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#1a5c2a] to-[#4a9e5c] py-14 md:py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <span className="text-[#f0c020] uppercase text-xs font-bold tracking-widest">
            Recruitment 2024
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 leading-tight">
            Application Form
          </h1>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-[#f0c020]" />
          <p className="text-green-100 text-sm sm:text-base mt-5 leading-relaxed">
            Select a post and click Apply to fill the registration form.<br className="hidden sm:block" />
            Women from rural areas are encouraged to apply.
          </p>
        </div>
      </section>

      {/* Post Cards */}
      <section className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-10">
          <span className="text-[#4a9e5c] uppercase text-xs font-bold tracking-widest">
            Available Posts
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a5c2a] mt-2">
            Apply Now — Choose Your Post
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
          {posts.map((post) => (
            <div
              key={post.id}
              className="rounded-2xl border-2 border-[#1a5c2a] p-6 sm:p-8 relative overflow-hidden hover:bg-[#1a5c2a] group transition-all duration-300 cursor-pointer"
            >
              <div className="absolute top-4 right-4 bg-[#f0c020] text-[#1a5c2a] text-xs font-bold px-2 py-1 rounded">
                {post.level}
              </div>
              <div className="text-3xl sm:text-4xl mb-3">👩‍⚕️</div>
              <h3 className="text-[#1a5c2a] group-hover:text-white font-bold text-base sm:text-lg mb-2 transition-colors">
                {post.title}
              </h3>
              <p className="text-[#f0c020] font-bold text-xl sm:text-2xl mb-4">{post.salary}</p>
              <ul className="text-gray-600 group-hover:text-green-100 text-xs sm:text-sm space-y-1.5 mb-6 transition-colors">
                {post.eligibility.map((e, j) => (
                  <li key={j}>✓ {e}</li>
                ))}
              </ul>
              <button
                onClick={() => handleApply(post)}
                className="inline-block bg-[#f0c020] text-[#1a5c2a] px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold hover:bg-white transition-all"
              >
                Apply Now →
              </button>
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
            For help, visit your nearest Jan Seva Kendra (CSC) today.
          </p>
          <a
            href="/contact"
            className="border-2 border-white text-white px-6 sm:px-8 py-3 rounded-full font-bold hover:bg-white hover:text-[#1a5c2a] transition-all text-sm sm:text-base"
          >
            Contact Us
          </a>
        </div>
      </section>

    </main>
  )
}
