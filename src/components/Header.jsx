import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/registration', label: 'Registration' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top bar — hidden on very small screens */}
      <div className="bg-[#1a5c2a] text-[#f0c020] text-xs py-1 px-3 text-center tracking-wide hidden sm:block">
        🌿 Rural Welfare Program — In collaboration with UNDP &nbsp;|&nbsp; Toll-Free:&nbsp;1800-XXX-XXXX
      </div>

      {/* Main header */}
      <div className="bg-white border-b-4 border-[#f0c020]">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">

          {/* Logo + Title */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
            <img
              src="./logo.webp"
              alt="Logo"
              className="h-10 w-10 sm:h-13 sm:w-13 md:h-14 md:w-14 object-contain drop-shadow flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-[#1a5c2a] font-bold text-sm sm:text-base md:text-lg leading-tight truncate">
                Rural Welfare Program
              </p>
              <p className="text-[#4a9e5c] text-[10px] sm:text-xs font-medium tracking-widest uppercase hidden sm:block">
                ग्रामीण जनकल्याण कार्यक्रम
              </p>
              <p className="text-[#c4956a] text-[9px] sm:text-[10px] hidden sm:block">
                In collaboration with UNDP
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#1a5c2a] text-[#f0c020]'
                      : 'text-[#1a5c2a] hover:bg-[#e8f5e9]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/registration"
              className="ml-2 px-4 py-2 bg-[#f0c020] text-[#1a5c2a] rounded-full text-sm font-bold hover:bg-[#f5d040] transition-all shadow whitespace-nowrap"
            >
              Apply Now →
            </Link>
          </nav>

          {/* Tablet: just Apply button + hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/registration"
              className="hidden sm:inline-block px-3 py-1.5 bg-[#f0c020] text-[#1a5c2a] rounded-full text-xs font-bold hover:bg-[#f5d040] transition-all shadow whitespace-nowrap"
            >
              Apply Now
            </Link>
            <button
              className="text-[#1a5c2a] p-2 rounded-md hover:bg-[#e8f5e9] transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet dropdown menu */}
      <div
        className={`lg:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-2">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium border-b border-gray-50 last:border-0 transition-colors ${
                  isActive
                    ? 'bg-[#e8f5e9] text-[#1a5c2a] font-bold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="py-3">
            <Link
              to="/apply"
              onClick={() => setMenuOpen(false)}
              className="block text-center bg-[#f0c020] text-[#1a5c2a] px-6 py-3 rounded-full font-bold text-sm hover:bg-[#f5d040] transition-all shadow"
            >
              Apply Now →
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}