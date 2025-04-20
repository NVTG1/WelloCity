import React, { useState } from "react";
import { useContactUs } from "../ContextAPI/ContactUsContext"; 

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { faqs } = useContactUs(); // get FAQs from context

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // To check if all the fields are filled or not
    if (name && email && message) {
      alert("Do you want to submit the Form?");
      setSubmitted(true); 

      // Reset the form once submitted
      setName("");
      setEmail("");
      setMessage("");

      // To remove the message after 3 seconds of being submitted
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } else {
      alert("Please fill in all the fields.");
    }
  };

  return (
    <div className="bg-white min-h-screen px-6 py-4">
      <h1 className="text-5xl font-extrabold text-center text-black mb-6">
        Contact Us
      </h1>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-semibold text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 border rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-semibold text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block text-lg font-semibold text-gray-700 mb-2">
            State Your Issue in Detail
          </label>
          <textarea
            id="message"
            className="w-full px-4 py-2 border rounded-md"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Success Message displayed only after ok is clicked on alert message */}
      {/* if statement doesn't work in return part of React therefore we have the syntax as this */}
      {submitted && (
        <div className="mt-6 text-center text-green-600 font-semibold text-lg">
          Your message has been successfully submitted!
        </div>
      )}

      {/* FAQs Section */}
      <div className="mt-12 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Frequently Asked Questions</h2>
        {faqs.length > 0 ? (
          <ul className="space-y-6">
            {faqs.map((faq, index) => (
              <li key={index} className="bg-gray-100 p-4 rounded-md shadow">
                <h3 className="font-semibold text-lg text-gray-800">{faq.question}</h3>
                <p className="text-gray-700 mt-2">{faq.answer}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">Loading FAQs...</p>
        )}
      </div>
    </div>
  );
}

export default Contact;
