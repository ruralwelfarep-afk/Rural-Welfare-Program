// src/pages/PrivacyPolicyPage.jsx

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#f9fbf9]">

      {/* Hero */}
      <section className="bg-gradient-to-r from-[#1a5c2a] to-[#4a9e5c] py-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Privacy Policy
        </h1>
        <p className="text-green-100 mt-2 text-sm">
          Last updated: March 29, 2026
        </p>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-10 space-y-6 text-gray-700 text-sm leading-relaxed">

          <p>
            We respect your privacy and are committed to protecting your personal information.
            By using <span className="font-semibold text-[#1a5c2a]">Rural Welfare Program</span>,
            you agree to the practices described in this policy.
          </p>

          {/* Info Collection */}
          <div>
            <h2 className="font-bold text-[#1a5c2a] text-lg mb-2">1. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Name, mobile number, email address</li>
              <li>Address and identification details (such as Aadhar)</li>
              <li>Documents uploaded during application</li>
              <li>Technical data like IP address, browser, device info</li>
            </ul>
          </div>

          {/* Use */}
          <div>
            <h2 className="font-bold text-[#1a5c2a] text-lg mb-2">2. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To process your application</li>
              <li>To communicate with you</li>
              <li>To maintain records of applications and payments</li>
              <li>To improve our services and website experience</li>
            </ul>
          </div>

          {/* Payment */}
          <div>
            <h2 className="font-bold text-[#1a5c2a] text-lg mb-2">3. Payments</h2>
            <p>
              Payments made on this website are processed securely via third-party payment gateways like Razorpay.
            </p>
            <p className="mt-2">
              We do not store your card or banking details.
            </p>
          </div>

          {/* Sharing */}
          <div>
            <h2 className="font-bold text-[#1a5c2a] text-lg mb-2">4. Sharing of Information</h2>
            <p>
              We do not sell or rent your personal information.
              Information may be shared only when required by law or for service processing.
            </p>
          </div>

          {/* Cookies */}
          <div>
            <h2 className="font-bold text-[#1a5c2a] text-lg mb-2">5. Cookies</h2>
            <p>
              We use cookies to improve user experience and maintain session data.
            </p>
          </div>

          {/* Security */}
          <div>
            <h2 className="font-bold text-[#1a5c2a] text-lg mb-2">6. Data Security</h2>
            <p>
              We follow industry standards to protect your data from unauthorized access, misuse, or loss.
            </p>
          </div>

          {/* Age */}
          <div>
            <h2 className="font-bold text-[#1a5c2a] text-lg mb-2">7. Age of Consent</h2>
            <p>
              You must be at least 18 years old to use this website.
            </p>
          </div>

          {/* NGO clarity */}
          <div>
            <h2 className="font-bold text-[#1a5c2a] text-lg mb-2">8. Important Disclaimer</h2>
            <p className="text-red-600 font-semibold">
              We are not a government organization and do not provide any सरकारी नौकरी or scheme approval.
            </p>
          </div>

          {/* Changes */}
          <div>
            <h2 className="font-bold text-[#1a5c2a] text-lg mb-2">9. Changes to Policy</h2>
            <p>
              We may update this policy from time to time without prior notice.
            </p>
          </div>

          {/* Refund */}
          <div>
            <h2 className="font-bold text-[#1a5c2a] text-lg mb-2">10. Refund Policy</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>All payments are non-refundable</li>
              <li>Duplicate payments can be reported within 5–7 days</li>
              <li>Approved refunds processed within 7–10 working days</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="font-bold text-[#1a5c2a] text-lg mb-2">11. Contact Us</h2>
            <p>Email: <span className="font-semibold">ruralwelfarep@gmail.com</span></p>
          </div>

        </div>
      </section>

    </main>
  )
}