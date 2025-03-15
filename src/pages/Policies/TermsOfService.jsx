import React from "react";

const TermsOfService = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800 mt-29">
      {/* Heading */}
      <h1 className="text-5xl font-semibold text-center">Terms of Service</h1>
      <p className="text-center text-lg mb-8 mt-15">
        By using our website and services, you agree to the following terms and conditions. Please read them carefully.
      </p>

      {/* Two-Column Image Section */}
     
      {/* Terms of Service Sections */}
      <div className="space-y-12">
        <div className="text-center">
          <p className="text-gray-600">
            Acceptance of Terms: By accessing or using our website, you agree to be bound by these terms. If you do not agree, please discontinue use immediately.
            <br />
            User Responsibilities: You agree to use our website lawfully and not engage in any fraudulent, harmful, or disruptive activities.
            <br />
            Intellectual Property: All content, including logos, images, and text, is the property of our company and may not be copied or distributed without permission.
            <br />
            Account Security:Users are responsible for maintaining the confidentiality of their account details and passwords.
            <br />
            Service Modifications: We reserve the right to modify or discontinue any part of our services at any time without prior notice.
            <br />
            Limitation of Liability: We are not responsible for any direct, indirect, or incidental damages resulting from the use of our website or services.
          </p>
        </div>

        <div className="text-center">
          <p className="text-gray-600">
            If you have any questions regarding our Terms of Service, feel free to reach out at{" "}
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

export default TermsOfService;
