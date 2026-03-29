// src/pages/ApplyFormPage.jsx
// Flow: Personal Details → Document Upload → Payment → Success Page
// Route: /apply  (receives post via React Router location.state)
// Security: All sensitive ops on server. Frontend never touches secrets.

import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// ─── File Upload Field ────────────────────────────────────────────────────────
function FileUpload({ label, name, accept, required, onChange, hint }) {
  const [fileName, setFileName] = useState('')
  const [preview, setPreview] = useState(null)
  const inputRef = useRef()

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setFileName(file.name)

    // Show image preview for photo/signature
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (ev) => setPreview(ev.target.result)
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }

    onChange(name, file)
  }

  return (
    <div>
      <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">
        {label} {required && <span className="text-[#f0c020]">*</span>}
      </label>
      {hint && <p className="text-gray-400 text-xs mb-2">{hint}</p>}

      <div
        onClick={() => inputRef.current.click()}
        className="w-full border-2 border-dashed border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-500 cursor-pointer hover:border-[#1a5c2a] hover:bg-[#f0f7f0] transition-all flex items-center gap-3"
      >
        <span className="text-xl">📎</span>
        <span className="flex-1 truncate">{fileName || 'Click to upload file'}</span>
        <span className="text-xs text-[#4a9e5c] font-semibold shrink-0">Browse</span>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        required={required}
        className="hidden"
        onChange={handleChange}
      />

      {preview && (
        <div className="mt-2 relative inline-block">
          <img src={preview} alt="preview" className="h-20 w-20 object-cover rounded-lg border-2 border-[#4a9e5c]" />
          <span className="absolute -top-1.5 -right-1.5 bg-[#1a5c2a] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">✓</span>
        </div>
      )}

      {fileName && !preview && (
        <p className="text-xs text-[#4a9e5c] mt-1.5 flex items-center gap-1">
          <span>✓</span> {fileName}
        </p>
      )}
    </div>
  )
}

// ─── Step Indicator ────────────────────────────────────────────────────────────
function StepBar({ current }) {
  const steps = ['Personal Details', 'Documents', 'Payment']
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all
              ${i < current ? 'bg-[#1a5c2a] border-[#1a5c2a] text-white' :
                i === current ? 'bg-[#f0c020] border-[#f0c020] text-[#1a5c2a]' :
                'bg-white border-gray-300 text-gray-400'}`}>
              {i < current ? '✓' : i + 1}
            </div>
            <span className={`text-xs mt-1 font-semibold hidden sm:block
              ${i === current ? 'text-[#1a5c2a]' : 'text-gray-400'}`}>
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-12 sm:w-20 h-0.5 mx-1 mb-4 sm:mb-5 transition-all
              ${i < current ? 'bg-[#1a5c2a]' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function ApplyFormPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const post = location.state?.post

  const [step, setStep] = useState(0)   // 0 = personal, 1 = docs, 2 = paying
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: '', fatherName: '', motherName: '', dob: '',
    mobile: '', email: '', gender: '', category: '',
    state: '', district: '', address: '',
    qualification: '', aadhar: '',
  })

  // Files stored separately (never serialised into JSON body)
  const [files, setFiles] = useState({
    photo: null,
    signature: null,
    aadharDoc: null,
    qualificationDoc: null,
    additionalDoc: null,
  })

  // Education rows (same as PDF sample)
  const [education, setEducation] = useState([
    { class: '10th Class', rollEnroll: '', college: '', board: '', year: '', totalMarks: '', obtainMarks: '', percentage: '' },
    { class: '12th Class', rollEnroll: '', college: '', board: '', year: '', totalMarks: '', obtainMarks: '', percentage: '' },
    { class: 'Graduation', rollEnroll: '', college: '', board: '', year: '', totalMarks: '', obtainMarks: '', percentage: '' },
  ])

  useEffect(() => {
    if (!post) navigate('/posts', { replace: true })
  }, [post, navigate])

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)
    return () => document.body.removeChild(script)
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleFileChange = (name, file) => setFiles((prev) => ({ ...prev, [name]: file }))

  const handleEduChange = (i, field, value) => {
    const updated = [...education]
    updated[i][field] = value
    // Auto-calculate percentage
    if (field === 'obtainMarks' || field === 'totalMarks') {
      const total = parseFloat(field === 'totalMarks' ? value : updated[i].totalMarks)
      const obtain = parseFloat(field === 'obtainMarks' ? value : updated[i].obtainMarks)
      if (total > 0 && obtain >= 0) {
        updated[i].percentage = ((obtain / total) * 100).toFixed(2)
      }
    }
    setEducation(updated)
  }

  // ── Step 0 validation ──
  const validateStep0 = () => {
    const required = ['name', 'fatherName', 'dob', 'mobile', 'email', 'gender', 'category', 'state', 'district', 'address', 'qualification', 'aadhar']
    for (const key of required) {
      if (!form[key]) { alert(`Please fill: ${key}`); return false }
    }
    if (!/^\d{12}$/.test(form.aadhar)) { alert('Aadhar number must be 12 digits'); return false }
    if (!/^\d{10}$/.test(form.mobile)) { alert('Mobile number must be 10 digits'); return false }
    return true
  }

  // ── Step 1 validation ──
  const validateStep1 = () => {
    if (!files.photo) { alert('Please upload your Photo'); return false }
    if (!files.signature) { alert('Please upload your Signature'); return false }
    if (!files.aadharDoc) { alert('Please upload Aadhar Card document'); return false }
    return true
  }

  // ── Payment + Final Submit ──
  const handlePayAndSubmit = async () => {
    setLoading(true)
    try {
      // 1. Create Razorpay order (server-side)
      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: form.category }),
      })
      if (!orderRes.ok) throw new Error('Order creation failed')
      const { orderId, amount } = await orderRes.json()

      // 2. Open Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency: 'INR',
        name: 'Rural Welfare Program',
        description: `Application Fee — ${post.title}`,
        order_id: orderId,
        prefill: { name: form.name, email: form.email, contact: form.mobile },
        theme: { color: '#1a5c2a' },

        handler: async (response) => {
          try {
            // 3. Build multipart form — send files + payment proof to server
            const formData = new FormData()

            // Append text fields
            Object.entries(form).forEach(([k, v]) => formData.append(k, v))
            formData.append('postTitle', post.title)
            formData.append('postLevel', post.level)
            formData.append('education', JSON.stringify(education))

            // Append payment proof (server verifies signature)
            formData.append('razorpay_order_id', response.razorpay_order_id)
            formData.append('razorpay_payment_id', response.razorpay_payment_id)
            formData.append('razorpay_signature', response.razorpay_signature)

            // Append files
            if (files.photo) formData.append('photo', files.photo)
            if (files.signature) formData.append('signature', files.signature)
            if (files.aadharDoc) formData.append('aadharDoc', files.aadharDoc)
            if (files.qualificationDoc) formData.append('qualificationDoc', files.qualificationDoc)
            if (files.additionalDoc) formData.append('additionalDoc', files.additionalDoc)

            // 4. Verify + generate PDF + Drive + Email
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              body: formData,
              // No Content-Type header — browser sets multipart/form-data boundary automatically
            })

            if (!verifyRes.ok) throw new Error('Verification failed')
            const result = await verifyRes.json()

            if (result.success) {
              // 5. Navigate to success page with PDF data
              navigate('/success', {
                state: {
                  name: form.name,
                  post: post.title,
                  pdfBase64: result.pdfBase64,
                  filename: result.filename,
                  driveLink: result.driveLink,
                  registrationNo: result.registrationNo,
                },
              })
            } else {
              alert('Payment verification failed. Please contact support.')
            }
          } catch (err) {
            console.error('Verify error:', err)
            alert('Submission failed after payment. Please contact support with your Payment ID: ' + response.razorpay_payment_id)
          } finally {
            setLoading(false)
          }
        },

        modal: { ondismiss: () => setLoading(false) },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      console.error(err)
      alert('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const states = [
    'Andhra Pradesh', 'Bihar', 'Chhattisgarh', 'Gujarat', 'Haryana', 'Himachal Pradesh',
    'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha',
    'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  ]

  if (!post) return null

  return (
    <main className="overflow-x-hidden">

      {/* Hero */}
      <section className="bg-gradient-to-r from-[#1a5c2a] to-[#4a9e5c] py-12 md:py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <span className="text-[#f0c020] uppercase text-xs font-bold tracking-widest">
            {post.level} — Registration Form
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-3 leading-tight">
            {post.title}
          </h1>
          <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-[#f0c020]" />
          <p className="text-green-100 text-sm mt-4">
            Age Limit: {post.ageLimit} &nbsp;|&nbsp; Fee: {post.feeGeneral} (Gen) / {post.feeOBC} (OBC/SC/ST)
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-3xl mx-auto px-4 py-10 md:py-14">
        <button onClick={() => step > 0 ? setStep(step - 1) : navigate(-1)}
          className="mb-6 text-[#1a5c2a] font-semibold text-sm flex items-center gap-2 hover:underline">
          ← {step > 0 ? 'Previous Step' : 'Back to Posts'}
        </button>

        <StepBar current={step} />

        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-10 border-b-4 border-[#f0c020]">

          {/* Post badge */}
          <div className="mb-6 bg-[#f0f7f0] rounded-2xl px-5 py-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Applying For</p>
              <p className="text-[#1a5c2a] font-bold text-sm">{post.title}</p>
            </div>
            <span className="bg-[#f0c020] text-[#1a5c2a] text-xs font-bold px-3 py-1 rounded-full">{post.level}</span>
          </div>

          {/* ── STEP 0: Personal Details ── */}
          {step === 0 && (
            <>
              <h3 className="text-[#1a5c2a] font-bold text-base mb-4 border-b-2 border-[#f0c020] pb-2">👤 Personal Details</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {[
                  { label: "Applicant's Full Name", name: 'name', type: 'text' },
                  { label: "Father's / Husband's Name", name: 'fatherName', type: 'text' },
                  { label: "Mother's Name", name: 'motherName', type: 'text' },
                  { label: 'Date of Birth', name: 'dob', type: 'date' },
                  { label: 'Aadhar Card Number (12 digits)', name: 'aadhar', type: 'text', maxLength: 12 },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">
                      {f.label} <span className="text-[#f0c020]">*</span>
                    </label>
                    <input
                      type={f.type}
                      name={f.name}
                      required
                      maxLength={f.maxLength}
                      value={form[f.name]}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#1a5c2a] transition-colors"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">Gender <span className="text-[#f0c020]">*</span></label>
                  <select name="gender" required value={form.gender} onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#1a5c2a] bg-white">
                    <option value="">-- Select --</option>
                    <option>Female</option><option>Male</option><option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">Category <span className="text-[#f0c020]">*</span></label>
                  <select name="category" required value={form.category} onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#1a5c2a] bg-white">
                    <option value="">-- Select --</option>
                    <option>General</option><option>OBC</option><option>SC</option><option>ST</option><option>EWS</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">Educational Qualification <span className="text-[#f0c020]">*</span></label>
                  <select name="qualification" required value={form.qualification} onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#1a5c2a] bg-white">
                    <option value="">-- Select --</option>
                    <option>10th Pass</option><option>12th Pass</option><option>Graduate</option><option>Post Graduate</option><option>Other</option>
                  </select>
                </div>
              </div>

              {/* Education Table */}
              <h3 className="text-[#1a5c2a] font-bold text-base mb-3 border-b-2 border-[#f0c020] pb-2">🎓 Education Eligibility</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#1a5c2a] text-white">
                      {['Class', 'Roll/Enroll', 'College', 'Board/Uni', 'Year', 'Total Marks', 'Obtain Marks', '%'].map((h) => (
                        <th key={h} className="px-2 py-2 text-left font-semibold whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {education.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-[#f0f7f0]' : 'bg-white'}>
                        <td className="px-2 py-1.5 font-semibold text-[#1a5c2a] whitespace-nowrap">{row.class}</td>
                        {['rollEnroll', 'college', 'board', 'year', 'totalMarks', 'obtainMarks'].map((field) => (
                          <td key={field} className="px-1 py-1">
                            <input
                              type="text"
                              value={row[field]}
                              onChange={(e) => handleEduChange(i, field, e.target.value)}
                              className="w-full border border-gray-200 rounded px-1.5 py-1 text-xs focus:outline-none focus:border-[#1a5c2a]"
                              placeholder="—"
                            />
                          </td>
                        ))}
                        <td className="px-2 py-1.5 text-center font-bold text-[#1a5c2a]">
                          {row.percentage || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Contact Details */}
              <h3 className="text-[#1a5c2a] font-bold text-base mb-4 border-b-2 border-[#f0c020] pb-2">📞 Contact Details</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {[
                  { label: 'Mobile Number (10 digits)', name: 'mobile', type: 'tel', maxLength: 10 },
                  { label: 'Email Address', name: 'email', type: 'email' },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">
                      {f.label} <span className="text-[#f0c020]">*</span>
                    </label>
                    <input type={f.type} name={f.name} required maxLength={f.maxLength} value={form[f.name]} onChange={handleChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#1a5c2a] transition-colors" />
                  </div>
                ))}

                <div>
                  <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">State <span className="text-[#f0c020]">*</span></label>
                  <select name="state" required value={form.state} onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#1a5c2a] bg-white">
                    <option value="">-- Select State --</option>
                    {states.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">District <span className="text-[#f0c020]">*</span></label>
                  <input type="text" name="district" required value={form.district} onChange={handleChange}
                    placeholder="Enter your district"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#1a5c2a] transition-colors" />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">Full Address <span className="text-[#f0c020]">*</span></label>
                  <textarea name="address" required rows={3} value={form.address} onChange={handleChange}
                    placeholder="Village / Town, Post Office, PIN Code..."
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#1a5c2a] transition-colors resize-none" />
                </div>
              </div>

              <button
                onClick={() => { if (validateStep0()) setStep(1) }}
                className="w-full bg-[#1a5c2a] text-white py-4 rounded-full font-bold text-sm hover:bg-[#2d7a3a] transition-all shadow-lg"
              >
                Next: Upload Documents →
              </button>
            </>
          )}

          {/* ── STEP 1: Document Uploads ── */}
          {step === 1 && (
            <>
              <h3 className="text-[#1a5c2a] font-bold text-base mb-1 border-b-2 border-[#f0c020] pb-2">📄 Upload Documents</h3>
              <p className="text-gray-400 text-xs mb-5">Photo and Signature will appear directly on your application form. Other documents will be attached as separate pages.</p>

              <div className="grid sm:grid-cols-2 gap-5 mb-6">
                <FileUpload
                  label="Applicant Photo"
                  name="photo"
                  accept="image/jpeg,image/png,image/jpg"
                  required
                  onChange={handleFileChange}
                  hint="JPG or PNG only • Max 2MB • Clear passport-size photo"
                />
                <FileUpload
                  label="Signature"
                  name="signature"
                  accept="image/jpeg,image/png,image/jpg"
                  required
                  onChange={handleFileChange}
                  hint="JPG or PNG only • Sign on white paper and upload"
                />
                <FileUpload
                  label="Aadhar Card"
                  name="aadharDoc"
                  accept="image/jpeg,image/png,image/jpg,application/pdf"
                  required
                  onChange={handleFileChange}
                  hint="JPG, PNG or PDF • Front & back both visible"
                />
                <FileUpload
                  label="Qualification Certificate"
                  name="qualificationDoc"
                  accept="image/jpeg,image/png,image/jpg,application/pdf"
                  required={false}
                  onChange={handleFileChange}
                  hint="JPG, PNG or PDF • Marksheet or certificate"
                />
                <FileUpload
                  label="Additional Document (Optional)"
                  name="additionalDoc"
                  accept="image/jpeg,image/png,image/jpg,application/pdf"
                  required={false}
                  onChange={handleFileChange}
                  hint="Any other supporting document"
                />
              </div>

              {/* Fee note */}
              <div className="bg-[#fffdf0] border border-[#f0c020] rounded-2xl p-4 mb-6 text-xs text-gray-600">
                <p className="font-semibold text-[#1a5c2a] mb-1">💳 Application Fee (to be paid next):</p>
                <p>• General: <span className="font-bold">{post.feeGeneral}</span></p>
                <p>• OBC / SC / ST / EWS: <span className="font-bold">{post.feeOBC}</span></p>
                <p className="mt-1 text-gray-400">Payment collected securely via Razorpay. Your category: <strong className="text-[#1a5c2a]">{form.category}</strong></p>
              </div>

              {/* Declaration */}
              <div className="bg-[#f0f7f0] rounded-2xl p-4 mb-6 border-l-4 border-[#f0c020]">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" required className="mt-1 accent-[#1a5c2a] w-4 h-4 flex-shrink-0"
                    id="declaration" />
                  <span className="text-gray-600 text-xs leading-relaxed">
                    I hereby declare that all information provided above is true and correct.
                    I understand that any false information may result in cancellation of my application.
                    I agree to the terms and conditions of this recruitment.
                  </span>
                </label>
              </div>

              <button
                onClick={() => {
                  const decl = document.getElementById('declaration')
                  if (!decl.checked) { alert('Please accept the declaration'); return }
                  if (validateStep1()) handlePayAndSubmit()
                }}
                disabled={loading}
                className="w-full bg-[#1a5c2a] text-white py-4 rounded-full font-bold text-sm hover:bg-[#2d7a3a] transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading
                  ? <><span className="animate-spin inline-block">⏳</span> Processing...</>
                  : '💳 Pay & Submit Application →'
                }
              </button>
            </>
          )}

        </div>
      </section>
    </main>
  )
}