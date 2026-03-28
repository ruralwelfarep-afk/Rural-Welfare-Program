// ApplyFormPage.jsx
// Registration form — receives selected post via React Router location.state
// Route: /apply

import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function SuccessPopup({ name, post, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 sm:p-10 max-w-sm w-full text-center z-10">
        <div className="w-20 h-20 bg-[#f0f7f0] rounded-full flex items-center justify-center mx-auto mb-5">
          <span className="text-4xl">🎉</span>
        </div>
        <h3 className="text-2xl font-bold text-[#1a5c2a] mb-2">Application Submitted!</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-1">
          <span className="font-semibold text-[#1a5c2a]">{name}</span>, your application for
        </p>
        <p className="text-[#1a5c2a] font-bold text-base mb-4">"{post}"</p>
        <p className="text-gray-400 text-xs mb-6">
          has been received. We will contact you shortly.
        </p>
        <button
          onClick={onClose}
          className="bg-[#1a5c2a] text-white px-8 py-3 rounded-full font-bold hover:bg-[#2d7a3a] transition-all shadow text-sm"
        >
          Close
        </button>
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#f0c020] rounded-b-3xl" />
      </div>
    </div>
  )
}

export default function ApplyFormPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const post = location.state?.post

  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', fatherName: '', dob: '', mobile: '', email: '',
    gender: '', category: '', state: '', district: '', address: '',
    qualification: '', aadhar: '',
  })

  // If no post data, redirect back to posts page
  useEffect(() => {
    if (!post) navigate('/registration', { replace: true })
  }, [post, navigate])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const states = [
    'Andhra Pradesh','Bihar','Chhattisgarh','Gujarat','Haryana','Himachal Pradesh',
    'Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Odisha',
    'Punjab','Rajasthan','Tamil Nadu','Telangana','Uttar Pradesh','Uttarakhand','West Bengal',
  ]

  if (!post) return null

  return (
    <main className="overflow-x-hidden">

      {submitted && (
        <SuccessPopup
          name={form.name}
          post={post.title}
          onClose={() => {
            setSubmitted(false)
            navigate('/registration')
          }}
        />
      )}

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#1a5c2a] to-[#4a9e5c] py-14 md:py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <span className="text-[#f0c020] uppercase text-xs font-bold tracking-widest">
            {post.level} — Registration Form
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 leading-tight">
            {post.title}
          </h1>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-[#f0c020]" />
          <p className="text-green-100 text-sm sm:text-base mt-5">
            Salary: <span className="font-bold text-[#f0c020]">{post.salary}</span> &nbsp;|&nbsp; Age Limit: {post.ageLimit}
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-3xl mx-auto px-4 py-12 md:py-16">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-[#1a5c2a] font-semibold text-sm flex items-center gap-2 hover:underline"
        >
          ← Back to Registration
        </button>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-lg p-6 sm:p-10 border-b-4 border-[#f0c020]">

          {/* Post info bar */}
          <div className="mb-6 bg-[#f0f7f0] rounded-2xl px-5 py-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Applying For</p>
              <p className="text-[#1a5c2a] font-bold text-sm">{post.title}</p>
            </div>
            <span className="bg-[#f0c020] text-[#1a5c2a] text-xs font-bold px-3 py-1 rounded-full">
              {post.level}
            </span>
          </div>

          {/* Personal Details */}
          <h3 className="text-[#1a5c2a] font-bold text-base mb-4 border-b-2 border-[#f0c020] pb-2">
            👤 Personal Details
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {[
              { label: "Applicant's Full Name", name: 'name', type: 'text', required: true },
              { label: "Father's / Husband's Name", name: 'fatherName', type: 'text', required: true },
              { label: 'Date of Birth', name: 'dob', type: 'date', required: true },
              { label: 'Aadhar Card Number', name: 'aadhar', type: 'text', required: true },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">
                  {f.label} {f.required && <span className="text-[#f0c020]">*</span>}
                </label>
                <input
                  type={f.type} name={f.name} required={f.required}
                  value={form[f.name]} onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#1a5c2a] transition-colors"
                />
              </div>
            ))}

            {/* Gender */}
            <div>
              <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">
                Gender <span className="text-[#f0c020]">*</span>
              </label>
              <select
                name="gender" required value={form.gender} onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#1a5c2a] bg-white transition-colors"
              >
                <option value="">-- Select --</option>
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">
                Category <span className="text-[#f0c020]">*</span>
              </label>
              <select
                name="category" required value={form.category} onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#1a5c2a] bg-white transition-colors"
              >
                <option value="">-- Select --</option>
                <option>General</option>
                <option>OBC</option>
                <option>SC</option>
                <option>ST</option>
                <option>EWS</option>
              </select>
            </div>

            {/* Qualification */}
            <div className="sm:col-span-2">
              <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">
                Educational Qualification <span className="text-[#f0c020]">*</span>
              </label>
              <select
                name="qualification" required value={form.qualification} onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#1a5c2a] bg-white transition-colors"
              >
                <option value="">-- Select Qualification --</option>
                <option>10th Pass</option>
                <option>12th Pass</option>
                <option>Graduate</option>
                <option>Post Graduate</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* Contact Details */}
          <h3 className="text-[#1a5c2a] font-bold text-base mb-4 border-b-2 border-[#f0c020] pb-2">
            📞 Contact Details
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {[
              { label: 'Mobile Number', name: 'mobile', type: 'tel', required: true },
              { label: 'Email Address', name: 'email', type: 'email', required: false },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">
                  {f.label} {f.required && <span className="text-[#f0c020]">*</span>}
                </label>
                <input
                  type={f.type} name={f.name} required={f.required}
                  value={form[f.name]} onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#1a5c2a] transition-colors"
                />
              </div>
            ))}

            {/* State */}
            <div>
              <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">
                State <span className="text-[#f0c020]">*</span>
              </label>
              <select
                name="state" required value={form.state} onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#1a5c2a] bg-white transition-colors"
              >
                <option value="">-- Select State --</option>
                {states.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">
                District <span className="text-[#f0c020]">*</span>
              </label>
              <input
                type="text" name="district" required
                value={form.district} onChange={handleChange}
                placeholder="Enter your district"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#1a5c2a] transition-colors"
              />
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">
                Full Address <span className="text-[#f0c020]">*</span>
              </label>
              <textarea
                name="address" required rows={3}
                value={form.address} onChange={handleChange}
                placeholder="Village / Town, Post Office, PIN Code..."
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#1a5c2a] transition-colors resize-none"
              />
            </div>
          </div>

          {/* Fee Note */}
          <div className="bg-[#fffdf0] border border-[#f0c020] rounded-2xl p-4 mb-6 text-xs text-gray-600 leading-relaxed">
            <p className="font-semibold text-[#1a5c2a] mb-1">📋 Application Fee:</p>
            <p>• General: <span className="font-bold">{post.feeGeneral}</span></p>
            <p>• OBC / SC / ST: <span className="font-bold">{post.feeOBC}</span></p>
            <p className="mt-1 text-gray-400">Fee to be paid at nearest Jan Seva Kendra (CSC).</p>
          </div>

          {/* Declaration */}
          <div className="bg-[#f0f7f0] rounded-2xl p-4 mb-6 border-l-4 border-[#f0c020]">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" required className="mt-1 accent-[#1a5c2a] w-4 h-4 flex-shrink-0" />
              <span className="text-gray-600 text-xs leading-relaxed">
                I hereby declare that all information provided above is true and correct to the best
                of my knowledge. I understand that any false information may result in cancellation
                of my application.
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#1a5c2a] text-white py-4 rounded-full font-bold text-sm hover:bg-[#2d7a3a] transition-all shadow-lg"
          >
            Submit Application →
          </button>
        </form>
      </section>

    </main>
  )
}