import { useState } from "react";
import "../styles/Contact.css";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nom :", name);
    console.log("Email :", email);
    console.log("Sujet :", subject);
    console.log("Message :", message);
    alert("Votre message a bien été envoyé ");
  };

  return (
    <section className="contact-section">
      <form className="contact-form" onSubmit={handleSubmit}>
        <h2>Contactez-nous</h2>
        <p>Une question, une suggestion ? Nous vous répondons rapidement </p>

        <input
          type="text"
          placeholder="Nom complet"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Sujet"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />

        <textarea
          rows="5"
          placeholder="Votre message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>

        <button className="contact-btn" type="submit">
          Envoyer le message
        </button>
      </form>
    </section>
  );
}
