import React, { useEffect, useState } from "react";

export default function AdminPanel({ token }) {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/messages", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => setError("Failed to fetch messages"));
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-900 rounded-lg text-white">
      <h2 className="text-2xl mb-4">Contact Messages</h2>
      {error && <p className="text-red-500">{error}</p>}
      <table className="w-full table-auto border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-800">
            <th className="border border-gray-600 px-4 py-2">Name</th>
            <th className="border border-gray-600 px-4 py-2">Email</th>
            <th className="border border-gray-600 px-4 py-2">Message</th>
            <th className="border border-gray-600 px-4 py-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg, i) => (
            <tr key={i} className="hover:bg-gray-700">
              <td className="border border-gray-600 px-4 py-2">{msg.name}</td>
              <td className="border border-gray-600 px-4 py-2">{msg.email}</td>
              <td className="border border-gray-600 px-4 py-2">{msg.message}</td>
              <td className="border border-gray-600 px-4 py-2">{msg.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
