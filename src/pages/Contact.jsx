import { useState } from "react";

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
    alert("Votre message a bien été envoyé ✅");
    // ⚠️ Tu pourrais ici envoyer les données vers ton backend
  };

  return (
    <section className="contact-section">
      <style>{`
        .contact-section {
          max-width: 900px;
          margin: 0 auto;
          padding: 60px 20px;
          font-family: Inter, sans-serif;
          display: grid;
          gap: 40px;
        }

        .contact-form {
          background: #ffffff;
          padding: 40px 36px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,.05);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .contact-form h2 {
          margin: 0 0 4px;
          font-size: 28px;
          color: #111827;
        }

        .contact-form p {
          margin: 0 0 20px;
          color: #6b7280;
          font-size: 15px;
        }

        .contact-form input,
        .contact-form textarea {
          padding: 14px;
          border: 1px solid #d1d5db;
          border-radius: 10px;
          font-size: 15px;
          transition: border-color 0.2s, box-shadow 0.2s;
          resize: none;
        }

        .contact-form input:focus,
        .contact-form textarea:focus {
          border-color: #ff6a00;
          outline: none;
          box-shadow: 0 0 0 3px rgba(255,106,0,.15);
        }

        .contact-btn {
          background: #ff6a00;
          color: #fff;
          padding: 14px;
          font-weight: 700;
          font-size: 16px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background .2s;
        }
        .contact-btn:hover {
          background: #e65f02;
        }
      `}</style>

      <form className="contact-form" onSubmit={handleSubmit}>
        <h2>Contactez-nous</h2>
        <p>Une question, une suggestion ? Nous vous répondons rapidement ⚡</p>

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
