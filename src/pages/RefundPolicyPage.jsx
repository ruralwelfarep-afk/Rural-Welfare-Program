// src/pages/RefundPolicyPage.jsx

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-[#f9fbf9]">

      {/* Hero */}
      <section className="bg-gradient-to-r from-[#1a5c2a] to-[#4a9e5c] py-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Refund & Cancellation Policy
        </h1>
        <p className="text-green-100 mt-2 text-sm">
          Last updated: March 29, 2026
        </p>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-10 space-y-6 text-gray-700 text-sm leading-relaxed">

          <p>
            This Refund & Cancellation Policy applies to all payments made on{" "}
            <span className="font-semibold text-[#1a5c2a]">
              Rural Welfare Program
            </span>.
          </p>

          {/* Refund */}
          <div>
            <h2 className="font-bold text-[#1a5c2a] text-lg mb-2">
              1. No Refund Policy
            </h2>
            <p>
              All payments made on this website are considered as{" "}
              <span className="font-semibold">
                voluntary contributions / application processing fees
              </span>{" "}
              and are generally non-refundable.
            </p>
          </div>

          {/* Exception */}
          <div>
            <h2 className="font-bold text-[#1a5c2a] text-lg mb-2">
              2. Exceptions (If Applicable)
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Duplicate payment made by mistake</li>
              <li>Payment deducted but application not submitted</li>
              <li>Technical error from payment gateway</li>
            </ul>
          </div>

          {/* Refund Process */}
          <div>
            <h2 className="font-bold text-[#1a5c2a] text-lg mb-2">
              3. Refund Process
            </h2>
            <p>
              If you believe you are eligible for a refund, you must contact us within{" "}
              <span className="font-semibold">5–7 days</span> of the transaction.
            </p>
            <p className="mt-2">
              Approved refunds will be processed within{" "}
              <span className="font-semibold">7–10 working days</span>.
            </p>
          </div>

          {/* Cancellation */}
          <div>
            <h2 className="font-bold text-[#1a5c2a] text-lg mb-2">
              4. Cancellation Policy
            </h2>
            <p>
              Once an application is submitted, it cannot be cancelled.
            </p>
          </div>

          {/* Payment */}
          <div>
            <h2 className="font-bold text-[#1a5c2a] text-lg mb-2">
              5. Payment Gateway
            </h2>
            <p>
              Payments are processed securely through third-party gateways like Razorpay.
              We are not responsible for payment failures caused by external systems.
            </p>
          </div>

          {/* Important */}
          <div>
            <h2 className="font-bold text-[#1a5c2a] text-lg mb-2">
              6. Important Disclaimer
            </h2>
            <p className="text-red-600 font-semibold">
              We are not a government organization and do not guarantee any job,
              scheme, or benefit.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="font-bold text-[#1a5c2a] text-lg mb-2">
              7. Contact Us
            </h2>
            <p>
              Email:{" "}
              <span className="font-semibold">
                ruralwelfarep@gmail.com
              </span>
            </p>
          </div>

        </div>
      </section>

    </main>
  )
}