// // src/pages/ApplyFormPage.jsx
// // Flow: Personal Details → Document Upload → Payment → Success Page
// // Route: /apply  (receives post via React Router location.state)
// //
// // CHANGES FROM ORIGINAL:
// //  ✅ Removed /api/create-order dependency — using Razorpay standard checkout (no order_id needed)
// //  ✅ Proper try/catch + user-friendly error toasts (no raw alert())
// //  ✅ Conditional document uploads:
// //       - 10th marksheet shown when 10th row has any data filled
// //       - 12th marksheet shown when 12th row has any data filled
// //       - Graduation doc shown when graduation row has any data filled
// //  ✅ validation improved — checks doc requirements dynamically
// //  ✅ Loading state blocks double-submit
// //  ✅ Payment errors surface payment ID for support contact

// import { useState, useEffect, useRef, useCallback } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'

// // ─── Toast Notification ───────────────────────────────────────────────────────
// function Toast({ message, type = 'error', onClose }) {
//   useEffect(() => {
//     const t = setTimeout(onClose, 5000)
//     return () => clearTimeout(t)
//   }, [onClose])

//   const bg = type === 'error'
//     ? 'bg-red-50 border-red-200 text-red-800'
//     : type === 'success'
//     ? 'bg-green-50 border-green-200 text-green-800'
//     : 'bg-yellow-50 border-yellow-200 text-yellow-800'

//   return (
//     <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-start gap-3 px-4 py-3 rounded-2xl border shadow-lg max-w-sm w-[90vw] ${bg}`}>
//       <span className="text-base mt-0.5">
//         {type === 'error' ? '⚠️' : type === 'success' ? '✅' : 'ℹ️'}
//       </span>
//       <p className="text-sm leading-snug flex-1">{message}</p>
//       <button onClick={onClose} className="text-base opacity-60 hover:opacity-100 leading-none mt-0.5">✕</button>
//     </div>
//   )
// }

// function useToast() {
//   const [toasts, setToasts] = useState([])
//   const show = useCallback((message, type = 'error') => {
//     const id = Date.now()
//     setToasts(prev => [...prev, { id, message, type }])
//   }, [])
//   const remove = useCallback((id) => setToasts(prev => prev.filter(t => t.id !== id)), [])
//   const ToastContainer = (
//     <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center gap-2 pt-4 pointer-events-none">
//       {toasts.map(t => (
//         <div key={t.id} className="pointer-events-auto">
//           <Toast message={t.message} type={t.type} onClose={() => remove(t.id)} />
//         </div>
//       ))}
//     </div>
//   )
//   return { show, ToastContainer }
// }

// // ─── File Upload Field ────────────────────────────────────────────────────────
// function FileUpload({ label, name, accept, required, onChange, hint }) {
//   const [fileName, setFileName] = useState('')
//   const [preview, setPreview] = useState(null)
//   const inputRef = useRef()

//   const handleChange = (e) => {
//     const file = e.target.files[0]
//     if (!file) return
//     setFileName(file.name)

//     if (file.type.startsWith('image/')) {
//       const reader = new FileReader()
//       reader.onload = (ev) => setPreview(ev.target.result)
//       reader.readAsDataURL(file)
//     } else {
//       setPreview(null)
//     }

//     onChange(name, file)
//   }

//   return (
//     <div>
//       <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">
//         {label} {required && <span className="text-red-500">*</span>}
//         {!required && <span className="text-gray-400 font-normal ml-1">(Optional)</span>}
//       </label>
//       {hint && <p className="text-gray-400 text-xs mb-2">{hint}</p>}

//       <div
//         onClick={() => inputRef.current.click()}
//         className="w-full border-2 border-dashed border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-500 cursor-pointer hover:border-[#1a5c2a] hover:bg-[#f0f7f0] transition-all flex items-center gap-3"
//       >
//         <span className="text-xl">📎</span>
//         <span className="flex-1 truncate">{fileName || 'Click to upload file'}</span>
//         <span className="text-xs text-[#4a9e5c] font-semibold shrink-0">Browse</span>
//       </div>
//       <input
//         ref={inputRef}
//         type="file"
//         accept={accept}
//         className="hidden"
//         onChange={handleChange}
//       />

//       {preview && (
//         <div className="mt-2 relative inline-block">
//           <img src={preview} alt="preview" className="h-20 w-20 object-cover rounded-lg border-2 border-[#4a9e5c]" />
//           <span className="absolute -top-1.5 -right-1.5 bg-[#1a5c2a] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">✓</span>
//         </div>
//       )}

//       {fileName && !preview && (
//         <p className="text-xs text-[#4a9e5c] mt-1.5 flex items-center gap-1">
//           <span>✓</span> {fileName}
//         </p>
//       )}
//     </div>
//   )
// }

// // ─── Step Indicator ────────────────────────────────────────────────────────────
// function StepBar({ current }) {
//   const steps = ['Personal Details', 'Documents', 'Payment']
//   return (
//     <div className="flex items-center justify-center gap-0 mb-8">
//       {steps.map((step, i) => (
//         <div key={i} className="flex items-center">
//           <div className="flex flex-col items-center">
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all
//               ${i < current ? 'bg-[#1a5c2a] border-[#1a5c2a] text-white' :
//                 i === current ? 'bg-[#f0c020] border-[#f0c020] text-[#1a5c2a]' :
//                 'bg-white border-gray-300 text-gray-400'}`}>
//               {i < current ? '✓' : i + 1}
//             </div>
//             <span className={`text-xs mt-1 font-semibold hidden sm:block
//               ${i === current ? 'text-[#1a5c2a]' : 'text-gray-400'}`}>
//               {step}
//             </span>
//           </div>
//           {i < steps.length - 1 && (
//             <div className={`w-12 sm:w-20 h-0.5 mx-1 mb-4 sm:mb-5 transition-all
//               ${i < current ? 'bg-[#1a5c2a]' : 'bg-gray-200'}`} />
//           )}
//         </div>
//       ))}
//     </div>
//   )
// }

// // ─── Helpers ──────────────────────────────────────────────────────────────────
// // Returns true if an education row has been meaningfully filled
// function isEduRowFilled(row) {
//   return !!(row.rollEnroll || row.college || row.board || row.year || row.totalMarks || row.obtainMarks)
// }

// // ─── Main Component ────────────────────────────────────────────────────────────
// export default function ApplyFormPage() {
//   const location = useLocation()
//   const navigate = useNavigate()
//   const post = location.state?.post
//   const { show: showToast, ToastContainer } = useToast()

//   const [step, setStep] = useState(0)
//   const [loading, setLoading] = useState(false)
//   const [declarationChecked, setDeclarationChecked] = useState(false)

//   const [form, setForm] = useState({
//     name: '', fatherName: '', motherName: '', dob: '',
//     mobile: '', email: '', gender: '', category: '',
//     state: '', district: '', address: '',
//     qualification: '', aadhar: '',
//   })

//   const [files, setFiles] = useState({
//     photo: null,
//     signature: null,
//     aadharDoc: null,
//     tenthDoc: null,
//     twelfthDoc: null,
//     graduationDoc: null,
//     qualificationDoc: null,
//     additionalDoc: null,
//   })

//   const [education, setEducation] = useState([
//     { class: '10th Class', rollEnroll: '', college: '', board: '', year: '', totalMarks: '', obtainMarks: '', percentage: '' },
//     { class: '12th Class', rollEnroll: '', college: '', board: '', year: '', totalMarks: '', obtainMarks: '', percentage: '' },
//     { class: 'Graduation', rollEnroll: '', college: '', board: '', year: '', totalMarks: '', obtainMarks: '', percentage: '' },
//   ])

//   // Derived: which education doc uploads to show
//   const show10thDoc      = isEduRowFilled(education[0])
//   const show12thDoc      = isEduRowFilled(education[1])
//   const showGraduationDoc = isEduRowFilled(education[2])

//   useEffect(() => {
//     if (!post) navigate('/posts', { replace: true })
//   }, [post, navigate])

//   // Load Razorpay script
//   useEffect(() => {
//     if (document.getElementById('razorpay-script')) return
//     const script = document.createElement('script')
//     script.id = 'razorpay-script'
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js'
//     script.async = true
//     document.body.appendChild(script)
//     return () => {
//       const el = document.getElementById('razorpay-script')
//       if (el) document.body.removeChild(el)
//     }
//   }, [])

//   const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
//   const handleFileChange = (name, file) => setFiles(prev => ({ ...prev, [name]: file }))

//   const handleEduChange = (i, field, value) => {
//     setEducation(prev => {
//       const updated = prev.map((r, idx) => idx === i ? { ...r, [field]: value } : r)
//       if (field === 'obtainMarks' || field === 'totalMarks') {
//         const row = updated[i]
//         const total  = parseFloat(field === 'totalMarks'  ? value : row.totalMarks)
//         const obtain = parseFloat(field === 'obtainMarks' ? value : row.obtainMarks)
//         if (total > 0 && obtain >= 0 && obtain <= total) {
//           updated[i] = { ...updated[i], percentage: ((obtain / total) * 100).toFixed(2) }
//         } else {
//           updated[i] = { ...updated[i], percentage: '' }
//         }
//       }
//       return updated
//     })
//   }

//   // ── Step 0 validation ──
//   const validateStep0 = () => {
//     const required = [
//       ['name', "Applicant's Full Name"],
//       ['fatherName', "Father's / Husband's Name"],
//       ['dob', 'Date of Birth'],
//       ['mobile', 'Mobile Number'],
//       ['email', 'Email Address'],
//       ['gender', 'Gender'],
//       ['category', 'Category'],
//       ['state', 'State'],
//       ['district', 'District'],
//       ['address', 'Full Address'],
//       ['qualification', 'Educational Qualification'],
//       ['aadhar', 'Aadhar Card Number'],
//     ]
//     for (const [key, label] of required) {
//       if (!form[key]?.trim()) {
//         showToast(`Please fill in: ${label}`)
//         return false
//       }
//     }
//     if (!/^\d{12}$/.test(form.aadhar)) {
//       showToast('Aadhar number must be exactly 12 digits')
//       return false
//     }
//     if (!/^\d{10}$/.test(form.mobile)) {
//       showToast('Mobile number must be exactly 10 digits')
//       return false
//     }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
//       showToast('Please enter a valid email address')
//       return false
//     }
//     return true
//   }

//   // ── Step 1 validation ──
//   const validateStep1 = () => {
//     if (!files.photo) {
//       showToast('Please upload your Passport-size Photo')
//       return false
//     }
//     if (!files.signature) {
//       showToast('Please upload your Signature')
//       return false
//     }
//     if (!files.aadharDoc) {
//       showToast('Please upload your Aadhar Card document')
//       return false
//     }
//     // Require marksheet uploads only for filled rows
//     if (show10thDoc && !files.tenthDoc) {
//       showToast('Please upload your 10th Class Marksheet / Certificate')
//       return false
//     }
//     if (show12thDoc && !files.twelfthDoc) {
//       showToast('Please upload your 12th Class Marksheet / Certificate')
//       return false
//     }
//     if (showGraduationDoc && !files.graduationDoc) {
//       showToast('Please upload your Graduation Certificate / Marksheet')
//       return false
//     }
//     if (!declarationChecked) {
//       showToast('Please read and accept the declaration')
//       return false
//     }
//     return true
//   }

//   // ── Payment + Final Submit ──
//   // Uses Razorpay Standard Checkout WITHOUT a backend order (no order_id).
//   // Amount is still computed server-side in verify-payment.js — we just
//   // display the correct amount in the popup. Razorpay validates the payment
//   // server-side in verify-payment.js via HMAC signature.
//   const handlePayAndSubmit = async () => {
//     if (!validateStep1()) return
//     if (loading) return
//     setLoading(true)

//     // Guard: Razorpay SDK must be loaded
//     if (!window.Razorpay) {
//       showToast('Payment gateway is loading. Please wait a moment and try again.', 'warning')
//       setLoading(false)
//       return
//     }

//     // Amount for display (actual amount verified server-side)
//     // const amountPaise = form.category === 'General' ? 110000 : 100000

//     const amountPaise = 100  // ₹1 for testing

//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//       amount: amountPaise,          // display only — server recomputes this
//       currency: 'INR',
//       name: 'Rural Welfare Program',
//       description: `Application Fee — ${post.title}`,
//       // No order_id — standard checkout (works without backend order creation)
//       prefill: {
//         name:    form.name,
//         email:   form.email,
//         contact: form.mobile,
//       },
//       theme: { color: '#1a5c2a' },

//       handler: async (response) => {
//         // response = { razorpay_payment_id, razorpay_order_id?, razorpay_signature? }
//         try {
//           const formData = new FormData()

//           // Text fields
//           Object.entries(form).forEach(([k, v]) => formData.append(k, v))
//           formData.append('postTitle', post.title)
//           formData.append('postLevel', post.level || '')
//           formData.append('education', JSON.stringify(education))

//           // Payment proof (server verifies signature)
//           formData.append('razorpay_payment_id', response.razorpay_payment_id)
//           if (response.razorpay_order_id)  formData.append('razorpay_order_id',  response.razorpay_order_id)
//           if (response.razorpay_signature) formData.append('razorpay_signature', response.razorpay_signature)

//           // Files
//           if (files.photo)           formData.append('photo',            files.photo)
//           if (files.signature)       formData.append('signature',        files.signature)
//           if (files.aadharDoc)       formData.append('aadharDoc',        files.aadharDoc)
//           if (files.tenthDoc)        formData.append('tenthDoc',         files.tenthDoc)
//           if (files.twelfthDoc)      formData.append('twelfthDoc',       files.twelfthDoc)
//           if (files.graduationDoc)   formData.append('graduationDoc',    files.graduationDoc)
//           if (files.qualificationDoc) formData.append('qualificationDoc', files.qualificationDoc)
//           if (files.additionalDoc)   formData.append('additionalDoc',    files.additionalDoc)

//           const verifyRes = await fetch('/api/verify-payment', {
//             method: 'POST',
//             body: formData,
//             // Do NOT set Content-Type — browser sets multipart boundary automatically
//           })

//           let result
//           try {
//             result = await verifyRes.json()
//           } catch {
//             throw new Error('Server returned an unexpected response. Please contact support.')
//           }

//           if (!verifyRes.ok) {
//             throw new Error(result?.error || `Server error (${verifyRes.status}). Please contact support.`)
//           }

//           if (result.success) {
//             navigate('/success', {
//               state: {
//                 name:           form.name,
//                 post:           post.title,
//                 pdfBase64:      result.pdfBase64,
//                 filename:       result.filename,
//                 driveLink:      result.driveLink,
//                 registrationNo: result.registrationNo,
//                 paymentId:      response.razorpay_payment_id,
//               },
//             })
//           } else {
//             throw new Error(result?.error || 'Payment verification failed. Please contact support.')
//           }
//         } catch (err) {
//           console.error('Verify error:', err)
//           showToast(
//             `Submission failed after payment. Please contact support with your Payment ID: ${response.razorpay_payment_id}`,
//             'error'
//           )
//           setLoading(false)
//         }
//       },

//       modal: {
//         ondismiss: () => {
//           setLoading(false)
//           showToast('Payment cancelled. You can try again.', 'warning')
//         },
//       },
//     }

//     try {
//       const rzp = new window.Razorpay(options)

//       rzp.on('payment.failed', (response) => {
//         console.error('Payment failed:', response.error)
//         setLoading(false)
//         showToast(
//           `Payment failed: ${response.error?.description || 'Unknown error'}. Reason: ${response.error?.reason || '—'}`,
//           'error'
//         )
//       })

//       rzp.open()
//     } catch (err) {
//       console.error('Razorpay open error:', err)
//       showToast('Could not open payment window. Please check your internet connection and try again.', 'error')
//       setLoading(false)
//     }
//   }

//   const states = [
//     'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
//     'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
//     'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
//     'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
//     'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
//     'Delhi', 'Jammu & Kashmir', 'Ladakh',
//   ]

//   if (!post) return null

//   return (
//     <main className="overflow-x-hidden">
//       {ToastContainer}

//       {/* Hero */}
//       <section className="bg-gradient-to-r from-[#1a5c2a] to-[#4a9e5c] py-12 md:py-16 text-center">
//         <div className="max-w-2xl mx-auto px-4">
//           <span className="text-[#f0c020] uppercase text-xs font-bold tracking-widest">
//             {post.level} — Registration Form
//           </span>
//           <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-3 leading-tight">
//             {post.title}
//           </h1>
//           <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-[#f0c020]" />
//           <p className="text-green-100 text-sm mt-4">
//             Age Limit: {post.ageLimit} &nbsp;|&nbsp; Fee: {post.feeGeneral} (Gen) / {post.feeOBC} (OBC/SC/ST)
//           </p>
//         </div>
//       </section>

//       {/* Form */}
//       <section className="max-w-3xl mx-auto px-4 py-10 md:py-14">
//         <button
//           onClick={() => step > 0 ? setStep(step - 1) : navigate(-1)}
//           className="mb-6 text-[#1a5c2a] font-semibold text-sm flex items-center gap-2 hover:underline"
//         >
//           ← {step > 0 ? 'Previous Step' : 'Back to Posts'}
//         </button>

//         <StepBar current={step} />

//         <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-10 border-b-4 border-[#f0c020]">

//           {/* Post badge */}
//           <div className="mb-6 bg-[#f0f7f0] rounded-2xl px-5 py-3 flex items-center justify-between">
//             <div>
//               <p className="text-xs text-gray-500">Applying For</p>
//               <p className="text-[#1a5c2a] font-bold text-sm">{post.title}</p>
//             </div>
//             <span className="bg-[#f0c020] text-[#1a5c2a] text-xs font-bold px-3 py-1 rounded-full">{post.level}</span>
//           </div>

//           {/* ── STEP 0: Personal Details ── */}
//           {step === 0 && (
//             <>
//               <h3 className="text-[#1a5c2a] font-bold text-base mb-4 border-b-2 border-[#f0c020] pb-2">👤 Personal Details</h3>
//               <div className="grid sm:grid-cols-2 gap-4 mb-6">
//                 {[
//                   { label: "Applicant's Full Name", name: 'name', type: 'text', placeholder: 'Enter full name as per Aadhar' },
//                   { label: "Father's / Husband's Name", name: 'fatherName', type: 'text', placeholder: 'Enter father\'s or husband\'s name' },
//                   { label: "Mother's Name", name: 'motherName', type: 'text', placeholder: 'Enter mother\'s name' },
//                   { label: 'Date of Birth', name: 'dob', type: 'date' },
//                   { label: 'Aadhar Card Number', name: 'aadhar', type: 'text', maxLength: 12, placeholder: '12-digit Aadhar number' },
//                 ].map((f) => (
//                   <div key={f.name}>
//                     <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">
//                       {f.label} <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type={f.type}
//                       name={f.name}
//                       required
//                       maxLength={f.maxLength}
//                       placeholder={f.placeholder}
//                       value={form[f.name]}
//                       onChange={handleChange}
//                       className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#1a5c2a] transition-colors"
//                     />
//                   </div>
//                 ))}

//                 <div>
//                   <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">Gender <span className="text-red-500">*</span></label>
//                   <select name="gender" required value={form.gender} onChange={handleChange}
//                     className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#1a5c2a] bg-white">
//                     <option value="">-- Select --</option>
//                     <option>Female</option>
//                     <option>Male</option>
//                     <option>Other</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">Category <span className="text-red-500">*</span></label>
//                   <select name="category" required value={form.category} onChange={handleChange}
//                     className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#1a5c2a] bg-white">
//                     <option value="">-- Select --</option>
//                     <option>General</option>
//                     <option>OBC</option>
//                     <option>SC</option>
//                     <option>ST</option>
//                     <option>EWS</option>
//                   </select>
//                 </div>

//                 <div className="sm:col-span-2">
//                   <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">Educational Qualification <span className="text-red-500">*</span></label>
//                   <select name="qualification" required value={form.qualification} onChange={handleChange}
//                     className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#1a5c2a] bg-white">
//                     <option value="">-- Select --</option>
//                     <option>10th Pass</option>
//                     <option>12th Pass</option>
//                     <option>Graduate</option>
//                     <option>Post Graduate</option>
//                     <option>Other</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Education Table */}
//               <h3 className="text-[#1a5c2a] font-bold text-base mb-3 border-b-2 border-[#f0c020] pb-2">🎓 Education Eligibility</h3>
//               <p className="text-gray-400 text-xs mb-3">Fill only the rows that apply to you. Document upload for each class will appear on the next step.</p>
//               <div className="overflow-x-auto mb-6">
//                 <table className="w-full text-xs border-collapse">
//                   <thead>
//                     <tr className="bg-[#1a5c2a] text-white">
//                       {['Class', 'Roll/Enroll No.', 'College / School', 'Board / University', 'Year', 'Total Marks', 'Obtain Marks', '%'].map((h) => (
//                         <th key={h} className="px-2 py-2 text-left font-semibold whitespace-nowrap">{h}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {education.map((row, i) => (
//                       <tr key={i} className={i % 2 === 0 ? 'bg-[#f0f7f0]' : 'bg-white'}>
//                         <td className="px-2 py-1.5 font-semibold text-[#1a5c2a] whitespace-nowrap">{row.class}</td>
//                         {['rollEnroll', 'college', 'board', 'year', 'totalMarks', 'obtainMarks'].map((field) => (
//                           <td key={field} className="px-1 py-1">
//                             <input
//                               type="text"
//                               value={row[field]}
//                               onChange={(e) => handleEduChange(i, field, e.target.value)}
//                               className="w-full border border-gray-200 rounded px-1.5 py-1 text-xs focus:outline-none focus:border-[#1a5c2a]"
//                               placeholder="—"
//                             />
//                           </td>
//                         ))}
//                         <td className="px-2 py-1.5 text-center font-bold text-[#1a5c2a]">
//                           {row.percentage || '—'}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Contact Details */}
//               <h3 className="text-[#1a5c2a] font-bold text-base mb-4 border-b-2 border-[#f0c020] pb-2">📞 Contact Details</h3>
//               <div className="grid sm:grid-cols-2 gap-4 mb-6">
//                 {[
//                   { label: 'Mobile Number (10 digits)', name: 'mobile', type: 'tel', maxLength: 10, placeholder: '10-digit mobile number' },
//                   { label: 'Email Address', name: 'email', type: 'email', placeholder: 'your@email.com' },
//                 ].map((f) => (
//                   <div key={f.name}>
//                     <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">
//                       {f.label} <span className="text-red-500">*</span>
//                     </label>
//                     <input type={f.type} name={f.name} required maxLength={f.maxLength}
//                       placeholder={f.placeholder} value={form[f.name]} onChange={handleChange}
//                       className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#1a5c2a] transition-colors" />
//                   </div>
//                 ))}

//                 <div>
//                   <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">State <span className="text-red-500">*</span></label>
//                   <select name="state" required value={form.state} onChange={handleChange}
//                     className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#1a5c2a] bg-white">
//                     <option value="">-- Select State --</option>
//                     {states.map((s) => <option key={s}>{s}</option>)}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">District <span className="text-red-500">*</span></label>
//                   <input type="text" name="district" required value={form.district} onChange={handleChange}
//                     placeholder="Enter your district"
//                     className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#1a5c2a] transition-colors" />
//                 </div>

//                 <div className="sm:col-span-2">
//                   <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">Full Address <span className="text-red-500">*</span></label>
//                   <textarea name="address" required rows={3} value={form.address} onChange={handleChange}
//                     placeholder="Village / Town, Post Office, PIN Code..."
//                     className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#1a5c2a] transition-colors resize-none" />
//                 </div>
//               </div>

//               <button
//                 onClick={() => { if (validateStep0()) setStep(1) }}
//                 className="w-full bg-[#1a5c2a] text-white py-4 rounded-full font-bold text-sm hover:bg-[#2d7a3a] transition-all shadow-lg"
//               >
//                 Next: Upload Documents →
//               </button>
//             </>
//           )}

//           {/* ── STEP 1: Document Uploads ── */}
//           {step === 1 && (
//             <>
//               <h3 className="text-[#1a5c2a] font-bold text-base mb-1 border-b-2 border-[#f0c020] pb-2">📄 Upload Documents</h3>
//               <p className="text-gray-400 text-xs mb-5">
//                 Photo and Signature will appear on your application form. Education marksheets appear based on what you filled in the previous step.
//               </p>

//               {/* ── Required ── */}
//               <div className="mb-4">
//                 <p className="text-xs font-bold text-[#1a5c2a] uppercase tracking-wider mb-3">Required Documents</p>
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <FileUpload
//                     label="Applicant Photo"
//                     name="photo"
//                     accept="image/jpeg,image/png,image/jpg"
//                     required
//                     onChange={handleFileChange}
//                     hint="JPG or PNG only • Max 2MB • Passport-size, clear face"
//                   />
//                   <FileUpload
//                     label="Signature"
//                     name="signature"
//                     accept="image/jpeg,image/png,image/jpg"
//                     required
//                     onChange={handleFileChange}
//                     hint="JPG or PNG only • Sign on white paper and upload"
//                   />
//                   <FileUpload
//                     label="Aadhar Card"
//                     name="aadharDoc"
//                     accept="image/jpeg,image/png,image/jpg,application/pdf"
//                     required
//                     onChange={handleFileChange}
//                     hint="JPG, PNG or PDF • Both front and back visible"
//                   />
//                 </div>
//               </div>

//               {/* ── Education Marksheets (conditional) ── */}
//               {(show10thDoc || show12thDoc || showGraduationDoc) && (
//                 <div className="mb-4">
//                   <p className="text-xs font-bold text-[#1a5c2a] uppercase tracking-wider mb-1">Education Documents</p>
//                   <p className="text-gray-400 text-xs mb-3">
//                     Upload marksheets / certificates for the classes you filled in the previous step.
//                   </p>
//                   <div className="grid sm:grid-cols-2 gap-5">
//                     {show10thDoc && (
//                       <FileUpload
//                         label="10th Class Marksheet"
//                         name="tenthDoc"
//                         accept="image/jpeg,image/png,image/jpg,application/pdf"
//                         required
//                         onChange={handleFileChange}
//                         hint="JPG, PNG or PDF • Max 5MB"
//                       />
//                     )}
//                     {show12thDoc && (
//                       <FileUpload
//                         label="12th Class Marksheet"
//                         name="twelfthDoc"
//                         accept="image/jpeg,image/png,image/jpg,application/pdf"
//                         required
//                         onChange={handleFileChange}
//                         hint="JPG, PNG or PDF • Max 5MB"
//                       />
//                     )}
//                     {showGraduationDoc && (
//                       <FileUpload
//                         label="Graduation Certificate / Marksheet"
//                         name="graduationDoc"
//                         accept="image/jpeg,image/png,image/jpg,application/pdf"
//                         required
//                         onChange={handleFileChange}
//                         hint="JPG, PNG or PDF • Max 5MB"
//                       />
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* ── Optional ── */}
//               <div className="mb-6">
//                 <p className="text-xs font-bold text-[#1a5c2a] uppercase tracking-wider mb-3">Optional Documents</p>
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <FileUpload
//                     label="Additional Qualification Certificate"
//                     name="qualificationDoc"
//                     accept="image/jpeg,image/png,image/jpg,application/pdf"
//                     required={false}
//                     onChange={handleFileChange}
//                     hint="Any other degree or diploma certificate"
//                   />
//                   <FileUpload
//                     label="Additional Document"
//                     name="additionalDoc"
//                     accept="image/jpeg,image/png,image/jpg,application/pdf"
//                     required={false}
//                     onChange={handleFileChange}
//                     hint="Any other supporting document"
//                   />
//                 </div>
//               </div>

//               {/* Fee note */}
//               <div className="bg-[#fffdf0] border border-[#f0c020] rounded-2xl p-4 mb-6 text-xs text-gray-600">
//                 <p className="font-semibold text-[#1a5c2a] mb-1">💳 Application Fee (to be paid next):</p>
//                 <p>• General: <span className="font-bold">{post.feeGeneral}</span></p>
//                 <p>• OBC / SC / ST / EWS: <span className="font-bold">{post.feeOBC}</span></p>
//                 <p className="mt-1 text-gray-400">
//                   Payment collected securely via Razorpay. Your category:{' '}
//                   <strong className="text-[#1a5c2a]">{form.category}</strong>
//                 </p>
//               </div>

//               {/* Declaration */}
//               <div className="bg-[#f0f7f0] rounded-2xl p-4 mb-6 border-l-4 border-[#f0c020]">
//                 <label className="flex items-start gap-3 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={declarationChecked}
//                     onChange={(e) => setDeclarationChecked(e.target.checked)}
//                     className="mt-1 accent-[#1a5c2a] w-4 h-4 flex-shrink-0"
//                   />
//                   <span className="text-gray-600 text-xs leading-relaxed">
//                     I hereby declare that all information provided above is true and correct.
//                     I understand that any false information may result in cancellation of my application.
//                     I agree to the terms and conditions of this recruitment.
//                   </span>
//                 </label>
//               </div>

//               <button
//                 onClick={handlePayAndSubmit}
//                 disabled={loading}
//                 className="w-full bg-[#1a5c2a] text-white py-4 rounded-full font-bold text-sm hover:bg-[#2d7a3a] transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//               >
//                 {loading
//                   ? <><span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> Processing...</>
//                   : '💳 Pay & Submit Application →'
//                 }
//               </button>
//             </>
//           )}

//         </div>
//       </section>
//     </main>
//   )
// }




































// src/pages/ApplyFormPage.jsx
// CHANGES:
//  ✅ Nationality field added (Indian / Other) — default Indian
//  ✅ Nationality passed to server via formData
//  ✅ Nationality validation added in step 0
//  ✅ All other original logic preserved

import { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, type = 'error', onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 5000); return () => clearTimeout(t) }, [onClose])
  const bg = type === 'error'
    ? 'bg-red-50 border-red-200 text-red-800'
    : type === 'success'
    ? 'bg-green-50 border-green-200 text-green-800'
    : 'bg-yellow-50 border-yellow-200 text-yellow-800'
  return (
    <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-start gap-3 px-4 py-3 rounded-2xl border shadow-lg max-w-sm w-[90vw] ${bg}`}>
      <span className="text-base mt-0.5">{type === 'error' ? '⚠️' : type === 'success' ? '✅' : 'ℹ️'}</span>
      <p className="text-sm leading-snug flex-1">{message}</p>
      <button onClick={onClose} className="text-base opacity-60 hover:opacity-100 leading-none mt-0.5">✕</button>
    </div>
  )
}

function useToast() {
  const [toasts, setToasts] = useState([])
  const show   = useCallback((message, type = 'error') => setToasts(p => [...p, { id: Date.now(), message, type }]), [])
  const remove = useCallback((id) => setToasts(p => p.filter(t => t.id !== id)), [])
  const ToastContainer = (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center gap-2 pt-4 pointer-events-none">
      {toasts.map(t => (
        <div key={t.id} className="pointer-events-auto">
          <Toast message={t.message} type={t.type} onClose={() => remove(t.id)} />
        </div>
      ))}
    </div>
  )
  return { show, ToastContainer }
}

// ─── File Upload Field ─────────────────────────────────────────────────────────
function FileUpload({ label, name, accept, required, onChange, hint }) {
  const [fileName, setFileName] = useState('')
  const [preview,  setPreview]  = useState(null)
  const inputRef = useRef()

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setFileName(file.name)
    if (file.type.startsWith('image/')) {
      const r = new FileReader()
      r.onload = (ev) => setPreview(ev.target.result)
      r.readAsDataURL(file)
    } else {
      setPreview(null)
    }
    onChange(name, file)
  }

  return (
    <div>
      <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">
        {label} {required ? <span className="text-red-500">*</span> : <span className="text-gray-400 font-normal ml-1">(Optional)</span>}
      </label>
      {hint && <p className="text-gray-400 text-xs mb-2">{hint}</p>}
      <div onClick={() => inputRef.current.click()}
        className="w-full border-2 border-dashed border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-500 cursor-pointer hover:border-[#1a5c2a] hover:bg-[#f0f7f0] transition-all flex items-center gap-3">
        <span className="text-xl">📎</span>
        <span className="flex-1 truncate">{fileName || 'Click to upload file'}</span>
        <span className="text-xs text-[#4a9e5c] font-semibold shrink-0">Browse</span>
      </div>
      <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={handleChange} />
      {preview && (
        <div className="mt-2 relative inline-block">
          <img src={preview} alt="preview" className="h-20 w-20 object-cover rounded-lg border-2 border-[#4a9e5c]" />
          <span className="absolute -top-1.5 -right-1.5 bg-[#1a5c2a] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">✓</span>
        </div>
      )}
      {fileName && !preview && <p className="text-xs text-[#4a9e5c] mt-1.5 flex items-center gap-1"><span>✓</span> {fileName}</p>}
    </div>
  )
}

// ─── Step Bar ─────────────────────────────────────────────────────────────────
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
            <span className={`text-xs mt-1 font-semibold hidden sm:block ${i === current ? 'text-[#1a5c2a]' : 'text-gray-400'}`}>
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-12 sm:w-20 h-0.5 mx-1 mb-4 sm:mb-5 transition-all ${i < current ? 'bg-[#1a5c2a]' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

function isEduRowFilled(row) {
  return !!(row.rollEnroll || row.college || row.board || row.year || row.totalMarks || row.obtainMarks)
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function ApplyFormPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const post = location.state?.post
  const { show: showToast, ToastContainer } = useToast()

  const [step,               setStep]               = useState(0)
  const [loading,            setLoading]            = useState(false)
  const [declarationChecked, setDeclarationChecked] = useState(false)

  const [form, setForm] = useState({
    name: '', fatherName: '', motherName: '', dob: '',
    mobile: '', email: '', gender: '', category: '',
    nationality: 'Indian',   // ← default Indian
    state: '', district: '', address: '',
    qualification: '', aadhar: '',
  })

  const [files, setFiles] = useState({
    photo: null, signature: null, aadharDoc: null,
    tenthDoc: null, twelfthDoc: null, graduationDoc: null,
    qualificationDoc: null, additionalDoc: null,
  })

  const [education, setEducation] = useState([
    { class: '10th Class', rollEnroll: '', college: '', board: '', year: '', totalMarks: '', obtainMarks: '', percentage: '' },
    { class: '12th Class', rollEnroll: '', college: '', board: '', year: '', totalMarks: '', obtainMarks: '', percentage: '' },
    { class: 'Graduation', rollEnroll: '', college: '', board: '', year: '', totalMarks: '', obtainMarks: '', percentage: '' },
  ])

  const show10thDoc       = isEduRowFilled(education[0])
  const show12thDoc       = isEduRowFilled(education[1])
  const showGraduationDoc = isEduRowFilled(education[2])

  useEffect(() => { if (!post) navigate('/posts', { replace: true }) }, [post, navigate])

  useEffect(() => {
    if (document.getElementById('razorpay-script')) return
    const s = document.createElement('script')
    s.id = 'razorpay-script'
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    s.async = true
    document.body.appendChild(s)
    return () => { const el = document.getElementById('razorpay-script'); if (el) document.body.removeChild(el) }
  }, [])

  const handleChange    = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const handleFileChange = (name, file) => setFiles(p => ({ ...p, [name]: file }))

  const handleEduChange = (i, field, value) => {
    setEducation(prev => {
      const updated = prev.map((r, idx) => idx === i ? { ...r, [field]: value } : r)
      if (field === 'obtainMarks' || field === 'totalMarks') {
        const row = updated[i]
        const total  = parseFloat(field === 'totalMarks'  ? value : row.totalMarks)
        const obtain = parseFloat(field === 'obtainMarks' ? value : row.obtainMarks)
        updated[i] = { ...updated[i], percentage: (total > 0 && obtain >= 0 && obtain <= total)
          ? ((obtain / total) * 100).toFixed(2) : '' }
      }
      return updated
    })
  }

  const validateStep0 = () => {
    const required = [
      ['name',          "Applicant's Full Name"],
      ['fatherName',    "Father's / Husband's Name"],
      ['dob',           'Date of Birth'],
      ['mobile',        'Mobile Number'],
      ['email',         'Email Address'],
      ['gender',        'Gender'],
      ['category',      'Category'],
      ['nationality',   'Nationality'],
      ['state',         'State'],
      ['district',      'District'],
      ['address',       'Full Address'],
      ['qualification', 'Educational Qualification'],
      ['aadhar',        'Aadhar Card Number'],
    ]
    for (const [key, label] of required) {
      if (!form[key]?.trim()) { showToast(`Please fill in: ${label}`); return false }
    }
    if (!/^\d{12}$/.test(form.aadhar))                            { showToast('Aadhar number must be exactly 12 digits'); return false }
    if (!/^\d{10}$/.test(form.mobile))                            { showToast('Mobile number must be exactly 10 digits'); return false }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))          { showToast('Please enter a valid email address'); return false }
    return true
  }

  const validateStep1 = () => {
    if (!files.photo)                         { showToast('Please upload your Passport-size Photo'); return false }
    if (!files.signature)                     { showToast('Please upload your Signature'); return false }
    if (!files.aadharDoc)                     { showToast('Please upload your Aadhar Card document'); return false }
    if (show10thDoc && !files.tenthDoc)       { showToast('Please upload your 10th Class Marksheet'); return false }
    if (show12thDoc && !files.twelfthDoc)     { showToast('Please upload your 12th Class Marksheet'); return false }
    if (showGraduationDoc && !files.graduationDoc) { showToast('Please upload your Graduation Certificate'); return false }
    if (!declarationChecked)                  { showToast('Please read and accept the declaration'); return false }
    return true
  }

  const handlePayAndSubmit = async () => {
    if (!validateStep1() || loading) return
    setLoading(true)
    if (!window.Razorpay) {
      showToast('Payment gateway is loading. Please wait and try again.', 'warning')
      setLoading(false); return
    }

    const amountPaise = 100  // ₹1 for testing

    const options = {
      key:         import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:      amountPaise,
      currency:    'INR',
      name:        'Rural Welfare Program',
      description: `Application Fee — ${post.title}`,
      prefill:     { name: form.name, email: form.email, contact: form.mobile },
      theme:       { color: '#1a5c2a' },

      handler: async (response) => {
        try {
          const fd = new FormData()
          Object.entries(form).forEach(([k, v]) => fd.append(k, v))
          fd.append('postTitle', post.title)
          fd.append('postLevel', post.level || '')
          fd.append('education', JSON.stringify(education))
          fd.append('razorpay_payment_id', response.razorpay_payment_id)
          if (response.razorpay_order_id)  fd.append('razorpay_order_id',  response.razorpay_order_id)
          if (response.razorpay_signature) fd.append('razorpay_signature', response.razorpay_signature)
          if (files.photo)            fd.append('photo',            files.photo)
          if (files.signature)        fd.append('signature',        files.signature)
          if (files.aadharDoc)        fd.append('aadharDoc',        files.aadharDoc)
          if (files.tenthDoc)         fd.append('tenthDoc',         files.tenthDoc)
          if (files.twelfthDoc)       fd.append('twelfthDoc',       files.twelfthDoc)
          if (files.graduationDoc)    fd.append('graduationDoc',    files.graduationDoc)
          if (files.qualificationDoc) fd.append('qualificationDoc', files.qualificationDoc)
          if (files.additionalDoc)    fd.append('additionalDoc',    files.additionalDoc)

          const verifyRes = await fetch('/api/verify-payment', { method: 'POST', body: fd })
          let result
          try   { result = await verifyRes.json() }
          catch { throw new Error('Server returned an unexpected response. Please contact support.') }

          if (!verifyRes.ok) throw new Error(result?.error || `Server error (${verifyRes.status}).`)
          if (result.success) {
            navigate('/success', {
              state: {
                name: form.name, post: post.title,
                pdfBase64: result.pdfBase64, filename: result.filename,
                driveLink: result.driveLink, registrationNo: result.registrationNo,
                paymentId: response.razorpay_payment_id,
              },
            })
          } else {
            throw new Error(result?.error || 'Payment verification failed.')
          }
        } catch (err) {
          showToast(`Submission failed. Contact support with Payment ID: ${response.razorpay_payment_id}`, 'error')
          setLoading(false)
        }
      },

      modal: { ondismiss: () => { setLoading(false); showToast('Payment cancelled.', 'warning') } },
    }

    try {
      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', (r) => {
        setLoading(false)
        showToast(`Payment failed: ${r.error?.description || 'Unknown error'}`, 'error')
      })
      rzp.open()
    } catch (err) {
      showToast('Could not open payment window. Check your internet connection.', 'error')
      setLoading(false)
    }
  }

  const states = [
    'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
    'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
    'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan',
    'Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal',
    'Delhi','Jammu & Kashmir','Ladakh',
  ]

  if (!post) return null

  // ── Shared input / select classes ──
  const inp = "w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#1a5c2a] transition-colors"
  const sel = `${inp} bg-white`

  return (
    <main className="overflow-x-hidden">
      {ToastContainer}

      {/* Hero */}
      <section className="bg-gradient-to-r from-[#1a5c2a] to-[#4a9e5c] py-12 md:py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <span className="text-[#f0c020] uppercase text-xs font-bold tracking-widest">{post.level} — Registration Form</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-3 leading-tight">{post.title}</h1>
          <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-[#f0c020]" />
          <p className="text-green-100 text-sm mt-4">Age Limit: {post.ageLimit} &nbsp;|&nbsp; Fee: {post.feeGeneral} (Gen) / {post.feeOBC} (OBC/SC/ST)</p>
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

                {/* Text inputs */}
                {[
                  { label: "Applicant's Full Name",     name: 'name',       type: 'text', placeholder: 'Enter full name as per Aadhar' },
                  { label: "Father's / Husband's Name", name: 'fatherName', type: 'text', placeholder: "Enter father's or husband's name" },
                  { label: "Mother's Name",              name: 'motherName', type: 'text', placeholder: "Enter mother's name" },
                  { label: 'Date of Birth',              name: 'dob',        type: 'date' },
                  { label: 'Aadhar Card Number',         name: 'aadhar',     type: 'text', maxLength: 12, placeholder: '12-digit Aadhar number' },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">{f.label} <span className="text-red-500">*</span></label>
                    <input type={f.type} name={f.name} required maxLength={f.maxLength}
                      placeholder={f.placeholder} value={form[f.name]} onChange={handleChange} className={inp} />
                  </div>
                ))}

                {/* Gender */}
                <div>
                  <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">Gender <span className="text-red-500">*</span></label>
                  <select name="gender" required value={form.gender} onChange={handleChange} className={sel}>
                    <option value="">-- Select --</option>
                    <option>Female</option><option>Male</option><option>Other</option>
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">Category <span className="text-red-500">*</span></label>
                  <select name="category" required value={form.category} onChange={handleChange} className={sel}>
                    <option value="">-- Select --</option>
                    <option>General</option><option>OBC</option><option>SC</option><option>ST</option><option>EWS</option>
                  </select>
                </div>

                {/* ── NATIONALITY (NEW) ── */}
                <div>
                  <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">Nationality <span className="text-red-500">*</span></label>
                  <select name="nationality" required value={form.nationality} onChange={handleChange} className={sel}>
                    <option value="Indian">Indian</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Qualification */}
                <div className="sm:col-span-2">
                  <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">Educational Qualification <span className="text-red-500">*</span></label>
                  <select name="qualification" required value={form.qualification} onChange={handleChange} className={sel}>
                    <option value="">-- Select --</option>
                    <option>10th Pass</option><option>12th Pass</option><option>Graduate</option>
                    <option>Post Graduate</option><option>Other</option>
                  </select>
                </div>
              </div>

              {/* Education Table */}
              <h3 className="text-[#1a5c2a] font-bold text-base mb-3 border-b-2 border-[#f0c020] pb-2">🎓 Education Eligibility</h3>
              <p className="text-gray-400 text-xs mb-3">Fill only the rows that apply to you.</p>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#1a5c2a] text-white">
                      {['Class','Roll/Enroll No.','College / School','Board / University','Year','Total Marks','Obtain Marks','%'].map(h => (
                        <th key={h} className="px-2 py-2 text-left font-semibold whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {education.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-[#f0f7f0]' : 'bg-white'}>
                        <td className="px-2 py-1.5 font-semibold text-[#1a5c2a] whitespace-nowrap">{row.class}</td>
                        {['rollEnroll','college','board','year','totalMarks','obtainMarks'].map(field => (
                          <td key={field} className="px-1 py-1">
                            <input type="text" value={row[field]}
                              onChange={(e) => handleEduChange(i, field, e.target.value)}
                              className="w-full border border-gray-200 rounded px-1.5 py-1 text-xs focus:outline-none focus:border-[#1a5c2a]"
                              placeholder="—" />
                          </td>
                        ))}
                        <td className="px-2 py-1.5 text-center font-bold text-[#1a5c2a]">{row.percentage || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Contact Details */}
              <h3 className="text-[#1a5c2a] font-bold text-base mb-4 border-b-2 border-[#f0c020] pb-2">📞 Contact Details</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {[
                  { label: 'Mobile Number (10 digits)', name: 'mobile', type: 'tel',   maxLength: 10, placeholder: '10-digit mobile number' },
                  { label: 'Email Address',             name: 'email',  type: 'email',               placeholder: 'your@email.com' },
                ].map(f => (
                  <div key={f.name}>
                    <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">{f.label} <span className="text-red-500">*</span></label>
                    <input type={f.type} name={f.name} required maxLength={f.maxLength}
                      placeholder={f.placeholder} value={form[f.name]} onChange={handleChange} className={inp} />
                  </div>
                ))}
                <div>
                  <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">State <span className="text-red-500">*</span></label>
                  <select name="state" required value={form.state} onChange={handleChange} className={sel}>
                    <option value="">-- Select State --</option>
                    {states.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">District <span className="text-red-500">*</span></label>
                  <input type="text" name="district" required value={form.district} onChange={handleChange}
                    placeholder="Enter your district" className={inp} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[#1a5c2a] font-semibold text-xs mb-1.5">Full Address <span className="text-red-500">*</span></label>
                  <textarea name="address" required rows={3} value={form.address} onChange={handleChange}
                    placeholder="Village / Town, Post Office, PIN Code..."
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#1a5c2a] transition-colors resize-none" />
                </div>
              </div>

              <button onClick={() => { if (validateStep0()) setStep(1) }}
                className="w-full bg-[#1a5c2a] text-white py-4 rounded-full font-bold text-sm hover:bg-[#2d7a3a] transition-all shadow-lg">
                Next: Upload Documents →
              </button>
            </>
          )}

          {/* ── STEP 1: Documents ── */}
          {step === 1 && (
            <>
              <h3 className="text-[#1a5c2a] font-bold text-base mb-1 border-b-2 border-[#f0c020] pb-2">📄 Upload Documents</h3>
              <p className="text-gray-400 text-xs mb-5">Photo and Signature will appear on your application form.</p>

              {/* Required */}
              <div className="mb-4">
                <p className="text-xs font-bold text-[#1a5c2a] uppercase tracking-wider mb-3">Required Documents</p>
                <div className="grid sm:grid-cols-2 gap-5">
                  <FileUpload label="Applicant Photo"   name="photo"    accept="image/jpeg,image/png,image/jpg"                     required onChange={handleFileChange} hint="JPG or PNG • Passport-size, clear face" />
                  <FileUpload label="Signature"          name="signature" accept="image/jpeg,image/png,image/jpg"                    required onChange={handleFileChange} hint="JPG or PNG • Sign on white paper" />
                  <FileUpload label="Aadhar Card"        name="aadharDoc" accept="image/jpeg,image/png,image/jpg,application/pdf"   required onChange={handleFileChange} hint="JPG, PNG or PDF • Both sides visible" />
                </div>
              </div>

              {/* Education Marksheets (conditional) */}
              {(show10thDoc || show12thDoc || showGraduationDoc) && (
                <div className="mb-4">
                  <p className="text-xs font-bold text-[#1a5c2a] uppercase tracking-wider mb-1">Education Documents</p>
                  <p className="text-gray-400 text-xs mb-3">Upload marksheets for classes you filled in previous step.</p>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {show10thDoc       && <FileUpload label="10th Class Marksheet"               name="tenthDoc"     accept="image/jpeg,image/png,image/jpg,application/pdf" required onChange={handleFileChange} hint="JPG, PNG or PDF" />}
                    {show12thDoc       && <FileUpload label="12th Class Marksheet"               name="twelfthDoc"   accept="image/jpeg,image/png,image/jpg,application/pdf" required onChange={handleFileChange} hint="JPG, PNG or PDF" />}
                    {showGraduationDoc && <FileUpload label="Graduation Certificate / Marksheet" name="graduationDoc" accept="image/jpeg,image/png,image/jpg,application/pdf" required onChange={handleFileChange} hint="JPG, PNG or PDF" />}
                  </div>
                </div>
              )}

              {/* Optional */}
              <div className="mb-6">
                <p className="text-xs font-bold text-[#1a5c2a] uppercase tracking-wider mb-3">Optional Documents</p>
                <div className="grid sm:grid-cols-2 gap-5">
                  <FileUpload label="Additional Qualification Certificate" name="qualificationDoc" accept="image/jpeg,image/png,image/jpg,application/pdf" required={false} onChange={handleFileChange} hint="Any other degree or diploma" />
                  <FileUpload label="Additional Document"                  name="additionalDoc"    accept="image/jpeg,image/png,image/jpg,application/pdf" required={false} onChange={handleFileChange} hint="Any other supporting document" />
                </div>
              </div>

              {/* Fee note */}
              <div className="bg-[#fffdf0] border border-[#f0c020] rounded-2xl p-4 mb-6 text-xs text-gray-600">
                <p className="font-semibold text-[#1a5c2a] mb-1">💳 Application Fee (to be paid next):</p>
                <p>• General: <span className="font-bold">{post.feeGeneral}</span></p>
                <p>• OBC / SC / ST / EWS: <span className="font-bold">{post.feeOBC}</span></p>
                <p className="mt-1 text-gray-400">Your category: <strong className="text-[#1a5c2a]">{form.category}</strong></p>
              </div>

              {/* Declaration checkbox */}
              <div className="bg-[#f0f7f0] rounded-2xl p-4 mb-6 border-l-4 border-[#f0c020]">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={declarationChecked} onChange={(e) => setDeclarationChecked(e.target.checked)}
                    className="mt-1 accent-[#1a5c2a] w-4 h-4 flex-shrink-0" />
                  <span className="text-gray-600 text-xs leading-relaxed">
                    I hereby declare that all information provided above is true and correct.
                    I understand that any false information may result in cancellation of my application.
                    I agree to the terms and conditions of this recruitment.
                  </span>
                </label>
              </div>

              <button onClick={handlePayAndSubmit} disabled={loading}
                className="w-full bg-[#1a5c2a] text-white py-4 rounded-full font-bold text-sm hover:bg-[#2d7a3a] transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading
                  ? <><span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> Processing...</>
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