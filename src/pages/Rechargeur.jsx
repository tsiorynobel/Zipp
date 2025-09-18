import { useState } from "react";
import "../styles/Rechargeur.css";

export default function Rechargeur() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Candidature rechargeur :", { name, city, email, phone });
    alert("Votre demande a été envoyée ");
  };

  return (
    <section className="rechargeur-section">
      <form className="rechargeur-form" onSubmit={handleSubmit}>
        <h2>Devenir rechargeur</h2>
        <p>Rejoignez notre équipe et rechargez les trottinettes ZYPP dans votre ville</p>

        <input
          type="text"
          placeholder="Nom complet"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Ville"
          value={city}
          onChange={(e) => setCity(e.target.value)}
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
          type="tel"
          placeholder="Numéro de téléphone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <button className="rechargeur-btn" type="submit">
          Envoyer ma candidature
        </button>
      </form>

      <div className="qr-zone">
        <img src="/src/img/qrcode.png" alt="QR code pour télécharger ZYPP" />
        <span>Scannez pour télécharger l’application ZYPP 📱</span>
      </div>
    </section>
  );
}
