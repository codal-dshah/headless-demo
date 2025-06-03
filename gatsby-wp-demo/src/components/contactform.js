import React, { useState } from "react";
import "../styles/contact.css"

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost/headless-demo/wp-json/gatsby/v1/submit-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("Form submitted successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Submission failed.");
      }
    } catch (err) {
      setStatus("Error submitting form.");
    }
  };

  return (
    <form class="styled-contact-form" onSubmit={handleSubmit} >
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} required />
      <button type="submit">Submit</button>
      <p>{status}</p>
    </form>
  );
};

export default ContactForm;
