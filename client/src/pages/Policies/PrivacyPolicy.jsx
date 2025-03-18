
const PrivacyPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800 mt-29">
      {/* Intro Text */}
      <h1 className="text-5xl font-semibold text-center">Privicy And Policy</h1>
      <p className="mt-14 text-lg mb-8">
        Your privacy is important to us. This policy outlines how we collect, use, and safeguard your personal data while ensuring transparency and trust.
      </p>

   

      {/* Main Sections */}
      <div className="space-y-12">
        <div className="">
          <p className="text-gray-600">
            We gather personal details like name, email, and preferences when you interact with our services. Additionally, we may collect technical data such as IP addresses and device information for security purposes.
            Your information helps us provide personalized experiences, improve customer support, and enhance platform security. We do not sell your data to third parties.
            We use cookies to enhance your experience by remembering preferences and analyzing website traffic. You can manage cookie settings in your browser.
            We may integrate third-party services like payment gateways and analytics tools. These services follow their own privacy policies, and we ensure they meet security standards.
            You have the right to request access, modification, or deletion of your data. We employ encryption and strict access controls to keep your information safe.
            We may update this Privacy Policy to reflect changes in our practices. The latest version will always be available on our website.
          </p>
          </div>

        <div className="text-center">
          <p className="text-gray-600">
            If you have any questions about our privacy practices, feel free to reach out at{" "}
            <a href="mailto:support@example.com" className="text-blue-600 hover:underline">
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

export default PrivacyPolicy;
