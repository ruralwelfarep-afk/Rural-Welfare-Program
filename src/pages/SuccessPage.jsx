// src/pages/SuccessPage.jsx
// Shown after successful payment + form submission
// Route: /success (receives data via React Router state)

import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function SuccessPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const data = location.state

  // Guard — if someone lands here directly, send them home
  useEffect(() => {
    if (!data?.pdfBase64) navigate('/', { replace: true })
  }, [data, navigate])

  if (!data?.pdfBase64) return null

  const { name, post, pdfBase64, filename, driveLink, registrationNo } = data

  const handleDownload = () => {
    const byteCharacters = atob(pdfBase64)
    const byteNumbers = Array.from(byteCharacters, (c) => c.charCodeAt(0))
    const blob = new Blob([new Uint8Array(byteNumbers)], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f0f7f0] to-[#e8f5e9] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full">

        {/* Confetti-like header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg border-4 border-[#4a9e5c]">
            <span className="text-5xl">🎉</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1a5c2a] mb-2">Application Submitted!</h1>
          <p className="text-gray-500 text-sm">
            Congratulations, <span className="font-bold text-[#1a5c2a]">{name}</span>!
          </p>
        </div>

        {/* Info card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border-b-4 border-[#f0c020] mb-6">

          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center text-sm py-2 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Post Applied</span>
              <span className="font-bold text-[#1a5c2a]">{post}</span>
            </div>
            {registrationNo && (
              <div className="flex justify-between items-center text-sm py-2 border-b border-gray-100">
                <span className="text-gray-500 font-medium">Registration No.</span>
                <span className="font-bold text-[#1a5c2a] font-mono">{registrationNo}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-sm py-2">
              <span className="text-gray-500 font-medium">Status</span>
              <span className="bg-[#f0f7f0] text-[#1a5c2a] font-bold px-3 py-1 rounded-full text-xs">✅ SUCCESS</span>
            </div>
          </div>

          <p className="text-gray-400 text-xs text-center mb-6">
            📧 Your application PDF has been sent to your registered email address.
          </p>

          {/* Action buttons */}
          <div className="space-y-3">
            <button
              onClick={handleDownload}
              className="w-full bg-[#1a5c2a] text-white py-3.5 rounded-full font-bold text-sm hover:bg-[#2d7a3a] transition-all shadow-md flex items-center justify-center gap-2"
            >
              ⬇️ Download Application PDF
            </button>

            {driveLink && (
              <a
                href={driveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block border-2 border-[#1a5c2a] text-[#1a5c2a] py-3.5 rounded-full font-bold text-sm hover:bg-[#f0f7f0] transition-all text-center"
              >
                📁 View on Google Drive
              </a>
            )}

            <button
              onClick={() => navigate('/')}
              className="w-full text-gray-400 text-sm hover:text-[#1a5c2a] py-2 font-semibold transition-colors"
            >
              ← Go to Home Page
            </button>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-gray-400 text-xs leading-relaxed">
          🌟 Healthy Villages — Empowered Women — Prosperous India 🌟<br />
          For help, visit your nearest Jan Seva Kendra (CSC).
        </p>

      </div>
    </main>
  )
}