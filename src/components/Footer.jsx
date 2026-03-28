import { Link } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/registration', label: 'Registration' },
  { to: '/contact', label: 'Contact Us' },
]

export default function Footer() {
  return (
    <footer className="bg-[#1a5c2a] text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">

        {/* Brand */}
        <div className="sm:col-span-2 md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.webp" alt="Logo" className="h-10 w-10 md:h-12 md:w-12 object-contain brightness-200 flex-shrink-0" />
            <div>
              <p className="font-bold text-[#f0c020] text-base md:text-lg leading-tight">
                Rural Welfare Program
              </p>
              <p className="text-xs text-green-300 uppercase tracking-widest">In collab with UNDP</p>
            </div>
          </div>
          <p className="text-green-200 text-sm leading-relaxed">
            Healthy Villages — Empowered Women — Prosperous India. Our mission is to deliver healthcare to every village in collaboration with UNDP.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-[#f0c020] font-semibold mb-4 text-base md:text-lg">Quick Links</h3>
          <ul className="space-y-2">
            {links.map(l => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-green-200 text-sm hover:text-[#f0c020] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#f0c020]">›</span> {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[#f0c020] font-semibold mb-4 text-base md:text-lg">Contact Us</h3>
          <ul className="space-y-3 text-sm text-green-200">
            <li className="flex gap-2 items-start">
              <span className="mt-0.5">📞</span>
              <span>Toll-Free: 1800-XXX-XXXX</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="mt-0.5">🌐</span>
              <a href="https://ruralhealthgov.com" className="hover:text-[#f0c020] transition-colors break-all">
                ruralhealthgov.com
              </a>
            </li>
            <li className="flex gap-2 items-start">
              <span className="mt-0.5">📍</span>
              <span>Nearest Jan Seva Kendra (CSC)</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="mt-0.5">🕐</span>
              <span>Mon–Sat: 9:00 AM – 5:00 PM</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-green-700 py-4 px-4 text-center">
        <p className="text-green-400 text-xs">
          © 2025 Rural Welfare Program | In collaboration with UNDP | All Rights Reserved
        </p>
      </div>
    </footer>
  )
}