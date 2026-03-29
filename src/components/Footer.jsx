import { Link } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/registration', label: 'Registration' },
  { to: '/contact', label: 'Contact Us' },
  { to: '/terms', label: 'Terms & Conditions' },
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/refund-policy', label: 'Refund Policy' },
]

export default function Footer() {
  return (
    <footer className="bg-[#1a5c2a] text-white">

      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">

        {/* Brand */}
        <div className="sm:col-span-2 md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/logo.webp"
              alt="Logo"
              className="h-10 w-10 md:h-12 md:w-12 object-contain brightness-200"
            />
            <div>
              <p className="font-bold text-[#f0c020] text-base md:text-lg">
                Rural Welfare Program
              </p>
              <p className="text-xs text-green-300 uppercase tracking-widest">
                Community Initiative
              </p>
            </div>
          </div>

          <p className="text-green-200 text-sm leading-relaxed">
            Working towards rural development, health awareness, and community empowerment across India.
          </p>

          {/* IMPORTANT DISCLAIMER */}
          <p className="text-red-400 text-xs mt-3 font-semibold">
            This is not a government website and we are not affiliated with any government organization.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-[#f0c020] font-semibold mb-4 text-base md:text-lg">
            Quick Links
          </h3>

          <ul className="space-y-2">
            {links.map((l) => (
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
          <h3 className="text-[#f0c020] font-semibold mb-4 text-base md:text-lg">
            Contact Us
          </h3>

          <ul className="space-y-3 text-sm text-green-200">

            <li className="flex gap-2 items-start">
              <span>✉️</span>
              <span>ruralwelfarep@gmail.com</span>
            </li>

            <li className="flex gap-2 items-start">
              <span>🌐</span>
              <a
                href="https://ruralwelfareprogram.com/"
                className="hover:text-[#f0c020] transition-colors break-all"
              >
                ruralwelfareprogram.com
              </a>
            </li>

            <li className="flex gap-2 items-start">
              <span>📍</span>
              <span>India (Rural Development Initiative)</span>
            </li>

            <li className="flex gap-2 items-start">
              <span>🕐</span>
              <span>Mon – Sat: 9:00 AM – 6:00 PM</span>
            </li>

          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-green-700 py-4 px-4 text-center">
        <p className="text-green-400 text-xs">
          © 2026 Rural Welfare Program | All Rights Reserved
        </p>
      </div>

    </footer>
  )
}