import React, { useState } from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaInstagram, FaFacebook } from 'react-icons/fa';

export default function ContactMe() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('Sending...');

    try {
      const response = await fetch('http://localhost:8000/sendEmail.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send');
      }

      const result = await response.json();
      setStatus(result.message);
      if (result.message.includes('successfully')) {
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('Server is down. Message me on my other accounts instead. Or just fund me pls');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-semibold mb-6">Get in Touch</h2>
        <p className="mb-8 text-lg">I'd love to hear from you. Whether you have a question or just want to say hi, feel free to drop a message!</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-1/2 p-3 bg-gray-800 border border-gray-700 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-1/2 p-3 bg-gray-800 border border-gray-700 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="4"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-[1px] px-[1px] bg-gradient-to-r from-cyan-500 via-purple-500 to-orange-500 text-white font-semibold rounded-[9px] shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <span className="block px-8 py-2 bg-gray-800 rounded-lg font-light text-white transition-all duration-300 group-hover:bg-gray-900 hover:text-cyan-200">
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </span>
          </button>
        </form>

        {status && (
          <p className={`mt-4 text-xl ${status.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
            {status}
          </p>
        )}

        <div className="mt-12 flex justify-center gap-6">
          {[
            { href: "https://www.linkedin.com/in/rich-zaraspe-2701342b4/", icon: <FaLinkedin /> },
            { href: "https://github.com/Ritsucode", icon: <FaGithub /> },
            { href: "https://instagram.com/stegoscope", icon: <FaInstagram /> },
            { href: "https://facebook.com/Rich.Zaraspe", icon: <FaFacebook /> },
          ].map(({ href, icon }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-white transition-transform duration-300 hover:text-cyan-400 hover:scale-125 hover:rotate-12 hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.8)] cursor-pointer"
              aria-label="Social Link"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
