import React, { useState } from "react";
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";

export default function ContactMe() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendEmail = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent("Message from Portfolio");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    window.location.href = `mailto:engr.richz@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="py-20 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-semibold mb-6">Get in Touch</h2>
        <p className="mb-8 text-lg">
          I'd love to hear from you. Whether you have a question or just want to
          say hi, feel free to drop a message!
        </p>

        <form onSubmit={handleSendEmail} className="space-y-6">
          <div className="flex gap-4 flex-col md:flex-row">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full md:w-1/2 p-3 bg-gray-800 border border-gray-700 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-cyan-500"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full md:w-1/2 p-3 bg-gray-800 border border-gray-700 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="4"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-cyan-500"
            required
          />

          <button
            type="submit"
            className="w-full py-[1px] px-[1px] bg-gradient-to-r from-cyan-500 via-purple-500 to-orange-500 text-white font-semibold rounded-[9px] shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <span className="block px-8 py-2 bg-gray-800 rounded-lg font-light text-white">
              Send Message
            </span>
          </button>
        </form>

        <div className="mt-12 flex justify-center gap-6">
          {[
            {
              href: "https://www.linkedin.com/in/rich-zaraspe-2701342b4/",
              icon: <FaLinkedin />,
            },
            { href: "https://github.com/Ritsucode", icon: <FaGithub /> },
            {
              href: "https://instagram.com/stegoscope",
              icon: <FaInstagram />,
            },
            {
              href: "https://facebook.com/Rich.Zaraspe",
              icon: <FaFacebook />,
            },
          ].map(({ href, icon }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl transition-transform hover:text-cyan-400 hover:scale-125 hover:rotate-12"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
