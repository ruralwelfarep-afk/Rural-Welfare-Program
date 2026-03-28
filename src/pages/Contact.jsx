// ContactPage.jsx
// Run: npm install @formspree/react

import { useState, useEffect } from 'react'
import { useForm, ValidationError } from '@formspree/react'

function SuccessPopup({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 sm:p-10 max-w-sm w-full text-center z-10 animate-bounce-in">
        <div className="w-20 h-20 bg-[#f0f7f0] rounded-full flex items-center justify-center mx-auto mb-5">
          <span className="text-4xl">✅</span>
        </div>
        <h3 className="text-2xl font-bold text-[#1a5c2a] mb-2">Message Sent!</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          Thank you for reaching out. We'll get back to you as soon as possible.
        </p>
        <button
          onClick={onClose}
          className="bg-[#1a5c2a] text-white px-8 py-3 rounded-full font-bold hover:bg-[#2d7a3a] transition-all shadow text-sm"
        >
          Close
        </button>
        {/* Yellow accent bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#f0c020] rounded-b-3xl" />
      </div>
    </div>
  )
}

function ContactForm() {
  const [state, handleSubmit] = useForm('xbdpdvpw')
  const [showPopup, setShowPopup] = useState(false)

  // When Formspree succeeds, show popup
  useEffect(() => {
    if (state.succeeded) {
      setShowPopup(true)
    }
  }, [state.succeeded])

  return (
    <>
      {showPopup && <SuccessPopup onClose={() => setShowPopup(false)} />}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-[#1a5c2a] font-semibold text-sm mb-1.5">
            Full Name <span className="text-[#f0c020]">*</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            required
            placeholder="Enter Name"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#1a5c2a] transition-colors"
          />
          <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs mt-1" />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-[#1a5c2a] font-semibold text-sm mb-1.5">
            Email Address <span className="text-[#f0c020]">*</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            placeholder="email@example.com"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#1a5c2a] transition-colors"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-[#1a5c2a] font-semibold text-sm mb-1.5">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            placeholder="+91 XXXXX XXXXX"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#1a5c2a] transition-colors"
          />
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-[#1a5c2a] font-semibold text-sm mb-1.5">
            Subject <span className="text-[#f0c020]">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            required
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#1a5c2a] transition-colors bg-white"
          >
            <option value="">-- Select a subject --</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Job Application">Job Application</option>
            <option value="Health Camp">Health Camp</option>
            <option value="Volunteer">Volunteer</option>
            <option value="Other">Other</option>
          </select>
          <ValidationError prefix="Subject" field="subject" errors={state.errors} className="text-red-500 text-xs mt-1" />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-[#1a5c2a] font-semibold text-sm mb-1.5">
            Message <span className="text-[#f0c020]">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Enter your message here..."
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#1a5c2a] transition-colors resize-none"
          />
          <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={state.submitting}
          className="w-full bg-[#1a5c2a] text-white py-3.5 rounded-full font-bold text-sm hover:bg-[#2d7a3a] transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {state.submitting ? '⏳ Sending...' : 'Send Message →'}
        </button>
      </form>
    </>
  )
}

export default function ContactPage() {
  const contactInfo = [
    {
      icon: '📍',
      title: 'Our Address',
      lines: ['Jan Seva Kendra (CSC)', 'Rural Welfare Program HQ', 'New Delhi, India'],
    },
    // {
    //   icon: '📞',
    //   title: 'Phone',
    //   lines: ['+91 98765 43210', '+91 11 2345 6789'],
    // },
    {
      icon: '✉️',
      title: 'Email',
      lines: ['ruralwelfarep@gmail.com'],
    },
    {
      icon: '🕐',
      title: 'Working Hours',
      lines: ['Mon – Sat: 9:00 AM – 6:00 PM', 'Sunday: Health Camps Only'],
    },
  ]

  return (
    <main className="overflow-x-hidden">

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#1a5c2a] to-[#4a9e5c] py-14 md:py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <span className="text-[#f0c020] uppercase text-xs font-bold tracking-widest">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 leading-tight">
            Contact Us
          </h1>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-[#f0c020]" />
          <p className="text-green-100 text-sm sm:text-base mt-5 leading-relaxed">
            Have a question, want to apply, or need more info? We're here to help.<br className="hidden sm:block" />
            Reach us through any channel most convenient for you.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="bg-[#f0f7f0] py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {contactInfo.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow hover:shadow-lg transition-all hover:-translate-y-1 border-b-4 border-[#f0c020] text-center"
            >
              <div className="text-3xl sm:text-4xl mb-3">{item.icon}</div>
              <h3 className="text-[#1a5c2a] font-bold text-sm mb-2">{item.title}</h3>
              {item.lines.map((line, j) => (
                <p key={j} className="text-gray-500 text-xs leading-relaxed">{line}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Form + Map */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">

          {/* Left — Form */}
          <div>
            <span className="text-[#4a9e5c] uppercase text-xs font-bold tracking-widest">
              Send a Message
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a5c2a] mt-2 mb-6">
              We'd Love to Hear From You
            </h2>
            <ContactForm />
          </div>

          {/* Right — Extra info */}
          <div className="space-y-6">
            <div>
              <span className="text-[#4a9e5c] uppercase text-xs font-bold tracking-widest">
                Connect With Us
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1a5c2a] mt-2 mb-5">
                Other Ways to Reach Us
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Contact Us pages typically include an email address or form; but we also offer
                multiple channels — phone, social media, and physical location — so you can get
                in touch using the method most convenient for you.
              </p>
            </div>

            {/* Social Links */}
            {/* <div className="bg-[#f0f7f0] rounded-2xl p-5 sm:p-6 border-b-4 border-[#f0c020]">
              <h3 className="text-[#1a5c2a] font-bold text-sm mb-4">📱 Follow Us on Social Media</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: 'Facebook', icon: '🔵', href: '#' },
                  { label: 'WhatsApp', icon: '🟢', href: '#' },
                  { label: 'Instagram', icon: '🟣', href: '#' },
                  { label: 'YouTube', icon: '🔴', href: '#' },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    className="flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-[#1a5c2a] px-4 py-2 rounded-full text-xs font-semibold text-[#1a5c2a] transition-all hover:shadow-sm"
                  >
                    <span>{s.icon}</span> {s.label}
                  </a>
                ))}
              </div>
            </div> */}

            {/* CSC Info */}
            <div className="border-l-4 border-[#f0c020] pl-4 bg-[#fffdf0] py-3 pr-3 rounded-r-xl">
              <p className="text-gray-600 text-sm leading-relaxed">
                <span className="font-semibold text-[#1a5c2a]">Jan Seva Kendra (CSC):</span> Visit
                your nearest Common Service Centre to apply in person, get assistance, or learn
                more about our health and welfare programs.
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '24h', label: 'Response Time' },
                { value: '25+', label: 'States Covered' },
              ].map((s, i) => (
                <div key={i} className="bg-[#1a5c2a] rounded-2xl p-5 text-center">
                  <div className="text-2xl font-bold text-[#f0c020]">{s.value}</div>
                  <div className="text-green-200 text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

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
              href="/about"
              className="border-2 border-white text-white px-6 sm:px-8 py-3 rounded-full font-bold hover:bg-white hover:text-[#1a5c2a] transition-all text-sm sm:text-base"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}