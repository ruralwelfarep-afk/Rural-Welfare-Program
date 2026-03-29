// src/pages/TermsPage.jsx

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f9fbf9]">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1a5c2a] to-[#4a9e5c] py-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Terms & Conditions
        </h1>
        <p className="text-green-100 mt-2 text-sm">
          Last updated: March 29, 2026
        </p>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-10 space-y-6 text-gray-700 text-sm leading-relaxed">

          <p>
            Welcome to <span className="font-semibold text-[#1a5c2a]">Rural Welfare Program</span>. 
            By accessing or using our website, you agree to the following terms and conditions.
          </p>

          {/* Section */}
          <div>
            <h2 className="font-bold text-[#1a5c2a] text-lg mb-2">1. About Us</h2>
            <p>
              Rural Welfare Program is an independent initiative focused on rural development,
              education awareness, and community welfare.
            </p>
            <p className="mt-2 font-semibold text-red-600">
              We are not a government organization and do not provide any सरकारी नौकरी.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="font-bold text-[#1a5c2a] text-lg mb-2">2. Use of Website</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>You must be at least 18 years old</li>
              <li>You must provide correct information</li>
              <li>Misuse of website is strictly prohibited</li>
            </ul>
          </div>

          {/* Section */}
          <div>
            <h2 className="font-bold text-[#1a5c2a] text-lg mb-2">3. Applications</h2>
            <p>
              Submitting an application does not guarantee selection, benefits, or employment.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="font-bold text-[#1a5c2a] text-lg mb-2">4. Payments</h2>
            <p>
              Any payment made is considered as a 
              <span className="font-semibold"> voluntary contribution / application processing fee</span>.
            </p>
            <p className="mt-2">
              Payments are used to support rural welfare activities and operations.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="font-bold text-[#1a5c2a] text-lg mb-2">5. Refund Policy</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Payments are non-refundable</li>
              <li>Duplicate payments can be reported within 5–7 days</li>
              <li>Refund (if approved) will be processed in 7–10 days</li>
            </ul>
          </div>

          {/* Section */}
          <div>
            <h2 className="font-bold text-[#1a5c2a] text-lg mb-2">6. Liability</h2>
            <p>
              We are not responsible for incorrect user data, technical issues, or misuse of the platform.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="font-bold text-[#1a5c2a] text-lg mb-2">7. Third-Party Services</h2>
            <p>
              We use secure third-party payment gateways like Razorpay. We are not responsible for their issues.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="font-bold text-[#1a5c2a] text-lg mb-2">8. Governing Law</h2>
            <p>
              These terms are governed by the laws of India. Jurisdiction: Uttar Pradesh.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="font-bold text-[#1a5c2a] text-lg mb-2">9. Contact Us</h2>
            <p>Email: <span className="font-semibold">ruralwelfarep@gmail.com</span></p>
          </div>

        </div>
      </section>

    </main>
  )
}