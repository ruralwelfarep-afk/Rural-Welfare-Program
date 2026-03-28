import { useState, useEffect, useRef } from 'react'

const slides = [
  {
    id: 1,
    tag: 'Health Mission',
    title: 'Healthcare for',
    titleAccent: 'Every Village',
    subtitle: 'Free health check-up camps every Sunday — right at your doorstep.',
    cta: 'Learn More',
    ctaLink: '/schemes',
    stats: [{ val: '5,000+', label: 'Villages' }, { val: 'Free', label: 'Health Camps' }],
    gradientFrom: '#0d3d1c',
    gradientTo: '#1a5c2a',
    accentColor: '#f0c020',
    shape: 'cross',
    emoji: '🏥',
  },
  {
    id: 2,
    tag: 'Women Empowerment',
    title: 'Empowered Women,',
    titleAccent: 'Prosperous India',
    subtitle: 'Become a health worker, serve your village, and become self-reliant.',
    cta: 'Apply Now',
    ctaLink: '/apply',
    stats: [{ val: '₹2,500', label: 'Per Month' }, { val: '12th Pass', label: 'Eligibility' }],
    gradientFrom: '#1a4a10',
    gradientTo: '#2d7a3a',
    accentColor: '#f0c020',
    shape: 'hexagon',
    emoji: '👩‍⚕️',
  },
  {
    id: 3,
    tag: 'In Collaboration with UNDP',
    title: 'Healthy Villages,',
    titleAccent: 'Happy Families',
    subtitle: 'A revolution in rural healthcare through the joint efforts of UNDP and India.',
    cta: 'View Schemes',
    ctaLink: '/schemes',
    stats: [{ val: '25+', label: 'States' }, { val: '12,000+', label: 'Workers' }],
    gradientFrom: '#0a2e10',
    gradientTo: '#4a9e5c',
    accentColor: '#f0c020',
    shape: 'triangle',
    emoji: '🌿',
  },
]

function BgShape({ type, color }) {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none" viewBox="0 0 600 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      {type === 'cross' && <>
        <circle cx="480" cy="80"  r="200" fill={color} />
        <circle cx="60"  cy="420" r="130" fill={color} />
      </>}
      {type === 'hexagon' && <>
        <polygon points="460,10 560,70 560,190 460,250 360,190 360,70" fill={color} />
        <circle cx="80" cy="400" r="100" fill={color} />
      </>}
      {type === 'triangle' && <>
        <polygon points="500,0 600,200 400,200" fill={color} />
        <polygon points="0,300 120,500 -120,500" fill={color} />
      </>}
    </svg>
  )
}

export default function Slider() {
  const [current, setCurrent] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const timerRef = useRef(null)

  const goTo = (idx) => {
    setCurrent(idx)
    setAnimKey(k => k + 1)
  }

  const startTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent(c => {
        setAnimKey(k => k + 1)
        return (c + 1) % slides.length
      })
    }, 5500)
  }

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [])

  const prev = () => { goTo((current - 1 + slides.length) % slides.length); startTimer() }
  const next = () => { goTo((current + 1) % slides.length); startTimer() }

  const slide = slides[current]

  return (
    <div className="relative w-full overflow-hidden">

      {/* ── BACKGROUND LAYERS ── */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{
            opacity: i === current ? 1 : 0,
            background: `linear-gradient(135deg, ${s.gradientFrom} 0%, ${s.gradientTo} 100%)`,
            pointerEvents: i === current ? 'auto' : 'none',
          }}
        >
          <BgShape type={s.shape} color={s.accentColor} />
        </div>
      ))}

      {/* Left gold accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 z-10" style={{ backgroundColor: slide.accentColor }} />

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-10 lg:gap-16 md:items-center">

          {/* ── LEFT: TEXT BLOCK ── */}
          <div
            key={`text-${animKey}`}
            className="pt-10 pb-6 md:py-16 lg:py-20"
            style={{ animation: 'sliderFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both' }}
          >
            {/* Tag */}
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-6 sm:w-8 h-0.5 flex-shrink-0" style={{ backgroundColor: slide.accentColor }} />
              <span
                className="text-[10px] sm:text-xs font-bold uppercase tracking-widest leading-none"
                style={{ color: slide.accentColor }}
              >
                {slide.tag}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-[2rem] sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.1] mb-1">
              {slide.title}
            </h2>
            <h2
              className="text-[2rem] sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] mb-4 sm:mb-5"
              style={{ color: slide.accentColor }}
            >
              {slide.titleAccent}
            </h2>

            {/* Subtitle */}
            <p className="text-green-100/80 text-sm sm:text-base leading-relaxed mb-5 sm:mb-7 max-w-md">
              {slide.subtitle}
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-3 mb-6 sm:mb-8">
              <a
                href={slide.ctaLink}
                className="inline-flex items-center gap-1.5 font-bold text-sm sm:text-base px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                style={{ backgroundColor: slide.accentColor, color: '#1a5c2a' }}
              >
                {slide.cta} <span>→</span>
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-white/70 text-sm hover:text-white transition-colors"
              >
                <span
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/30 flex items-center justify-center text-[10px] flex-shrink-0"
                >▶</span>
                <span className="text-sm">Contact Us</span>
              </a>
            </div>

            {/* Mini stats */}
            <div className="flex gap-6 sm:gap-8">
              {slide.stats.map((st, i) => (
                <div key={i}>
                  <div className="text-lg sm:text-2xl font-bold" style={{ color: slide.accentColor }}>{st.val}</div>
                  <div className="text-white/50 text-xs">{st.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: VISUAL (desktop only) ── */}
          <div
            key={`card-${animKey}`}
            className="hidden md:flex justify-center items-center py-16"
            style={{ animation: 'sliderFadeRight 0.65s cubic-bezier(0.22,1,0.36,1) both' }}
          >
            <div className="relative">
              {/* Outer ring */}
              <div
                className="w-56 h-56 lg:w-72 lg:h-72 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: `2px solid ${slide.accentColor}30`,
                  boxShadow: `0 0 60px ${slide.accentColor}15`,
                }}
              >
                {/* Inner ring */}
                <div
                  className="w-40 h-40 lg:w-52 lg:h-52 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: `2px solid ${slide.accentColor}50`,
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <span className="text-6xl lg:text-8xl select-none" style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.4))' }}>
                    {slide.emoji}
                  </span>
                </div>
              </div>
              {/* Badge top-right */}
              <div
                className="absolute -top-2 -right-2 lg:-top-3 lg:-right-3 rounded-xl px-3 py-1.5 shadow-xl"
                style={{ backgroundColor: slide.accentColor }}
              >
                <p className="text-[#1a5c2a] font-bold text-xs">UNDP ✓</p>
              </div>
              {/* Badge bottom-left */}
              <div className="absolute -bottom-3 -left-3 lg:-bottom-4 lg:-left-4 bg-white/10 backdrop-blur rounded-xl px-3 py-2 border border-white/20">
                <p className="text-white font-bold text-sm">{slide.stats[0].val}</p>
                <p className="text-white/60 text-xs">{slide.stats[0].label}</p>
              </div>
              {/* Glow dot */}
              <div
                className="absolute top-5 -left-5 w-3 h-3 rounded-full"
                style={{ backgroundColor: slide.accentColor, boxShadow: `0 0 10px ${slide.accentColor}` }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* ── PROGRESS BAR ── */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/10 z-20">
        <div
          key={`prog-${animKey}`}
          className="h-full"
          style={{ backgroundColor: slide.accentColor, animation: 'sliderProgress 5.5s linear forwards' }}
        />
      </div>

      {/* ── NAV: dots center + counter+arrows right ── */}

      {/* Dots — center bottom */}
      <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 sm:gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { goTo(i); startTimer() }}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? '24px' : '7px',
              height: '7px',
              backgroundColor: i === current ? slide.accentColor : 'rgba(255,255,255,0.35)',
            }}
          />
        ))}
      </div>

      {/* Counter + arrows — bottom right */}
      <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-5 z-20 flex items-center gap-2">
        <button
          onClick={prev}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white border border-white/30 hover:border-[#f0c020] hover:text-[#f0c020] transition-all text-base"
        >‹</button>
        <span className="text-white/50 text-xs font-mono hidden sm:inline">
          <span className="text-white font-bold">{String(current + 1).padStart(2, '0')}</span>
          /{String(slides.length).padStart(2, '0')}
        </span>
        <button
          onClick={next}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white border border-white/30 hover:border-[#f0c020] hover:text-[#f0c020] transition-all text-base"
        >›</button>
      </div>

      {/* ── WAVE ── */}
      <div className="absolute bottom-0 left-0 w-full z-10 pointer-events-none">
        <svg viewBox="0 0 1440 50" preserveAspectRatio="none" className="w-full h-8 sm:h-10 md:h-12">
          <path d="M0,50 C360,5 1080,45 1440,15 L1440,50 Z" fill="#f9f6ef" />
        </svg>
      </div>

      <style>{`
        @keyframes sliderFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sliderFadeRight {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes sliderProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  )
}