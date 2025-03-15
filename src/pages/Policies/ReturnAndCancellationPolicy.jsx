import React from "react";

const ReturnAndCancellationPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800 mt-29">
      {/* Heading */}
      <h1 className="text-5xl font-semibold text-center">Return & Cancellation Policy</h1>
      <p className="text-center text-lg mb-8 mt-15">
        We understand that plans change, and we aim to make returns and cancellations as smooth as possible. Please read our policy below.
      </p>

      {/* Return & Cancellation Policy Sections */}
      <div className="space-y-12">
        <div className="text-center">
          <p className="text-gray-600">
            <strong>Returns:</strong> If you are not satisfied with your purchase, you can return the item within <strong>7 days</strong> of delivery. The item must be unused, in its original condition, and with all tags and packaging intact.
          </p>
          <p className="text-gray-600 mt-4">
            <strong>Refunds for Returns:</strong> Once we receive your returned item, the refund will be processed within <strong>5-7 business days</strong> to your original payment method.
          </p>
          <p className="text-gray-600 mt-4">
            <strong>Cancellations:</strong> Orders can be canceled within <strong>24 hours</strong> of placement, provided they haven’t been shipped yet. Once shipped, cancellations are not possible.
          </p>
          <p className="text-gray-600 mt-4">
            <strong>Non-Returnable Items:</strong> Personalized, perishable, and hygiene-related items cannot be returned. Please review product descriptions before purchase.
          </p>
          <p className="text-gray-600 mt-4">
            <strong>Return Shipping Costs:</strong> Customers are responsible for return shipping costs unless the item is defective or incorrect. We recommend using a trackable shipping method.
          </p>
        </div>

        {/* Contact Info */}
        <div className="text-center">
          <p className="text-gray-600">
            If you have any questions, feel free to reach out at {" "}
            <a href="mailto:sorasupport@gmail.com" className="text-blue-600 hover:underline">
              sorasupport@gmail.com
            </a>
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center mt-10">
        <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default ReturnAndCancellationPolicy;