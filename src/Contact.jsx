import React from "react";
import { FaHome, FaInfoCircle, FaPhone } from "react-icons/fa"; // Import icons
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"; // Import icons
import './contact.css';  // Adjust the path if needed
const Contact = () => {
  return (
    <div
      className="bg-cover bg-center font-sans leading-normal tracking-normal"
      style={{
        backgroundImage:
          "url('data:image/jpeg;base64,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')",
      }}
    >{/* Navbar */}




      {/* Contact Section */}
      <section className="container mx-auto px-8 py-16 max-w-6xl">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-12">
        </h1>

        <div className="bg-white shadow-2xl rounded-xl p-8 md:p-16 text-center space-y-8">
          <h2 className="text-3xl font-semibold text-blue-600 mb-6">Connect with Me</h2>

          <p className="text-lg text-gray-700 mb-8">
            I would love to hear from you! Feel free to connect with me on the platforms below:
          </p>

          <div className="space-y-6">
            {/* GitHub Link */}
            <a
              href="https://github.com/sailaja-adapa"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 text-white py-4 px-10 rounded-full shadow-xl hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center space-x-4"
            >
              <FaGithub size={24} /> {/* GitHub icon */}
              <span>GitHub</span>
            </a>

            {/* LinkedIn Link */}
            <a
  href="https://www.linkedin.com/in/akshaya-adapa-770167291"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-blue-700 text-white py-4 px-10 rounded-full shadow-xl hover:bg-blue-800 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center space-x-4"
>
  <FaLinkedin size={24} /> {/* LinkedIn icon */}
  <span>LinkedIn</span>
</a>


            {/* Email Link */}
            <a
  href="mailto:adapasailaja17@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-green-500 text-white py-4 px-10 rounded-full shadow-xl hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center space-x-4"
>
  <FaEnvelope size={24} />
  <span>Email</span>
</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black bg-opacity-50 text-white py-6 mt-16">
  <div className="container mx-auto text-center">
    <p className="text-sm">© 2024 Shresta. All Rights Reserved.</p>
  </div>
</footer>

    </div>
  );
};

export default Contact;
