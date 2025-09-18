import { useState } from "react";

export default function Rechargeur() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Candidature rechargeur :", { name, city, email, phone });
    alert("Votre demande a été envoyée ✅");
  };

  return (
    <section className="rechargeur-section">
      <style>{`
        .rechargeur-section {
          display: grid;
          grid-template-columns: 1fr 0.9fr;
          align-items: center;
          gap: 60px;
          max-width: 1100px;
          margin: 0 auto;
          padding: 60px 20px;
          background: #ffffff;
          font-family: Inter, sans-serif;
        }

        .rechargeur-form {
          background: #ffffff;
          padding: 40px 36px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,.05);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .rechargeur-form h2 {
          margin: 0 0 4px;
          font-size: 28px;
          color: #111827;
        }

        .rechargeur-form p {
          margin: 0 0 20px;
          color: #6b7280;
          font-size: 15px;
        }

        .rechargeur-form input {
          padding: 14px;
          border: 1px solid #d1d5db;
          border-radius: 10px;
          font-size: 15px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .rechargeur-form input:focus {
          border-color: #ff6a00;
          outline: none;
          box-shadow: 0 0 0 3px rgba(255,106,0,.15);
        }

        .rechargeur-btn {
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
        .rechargeur-btn:hover {
          background: #e65f02;
        }

        .qr-zone {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 18px;
        }

        .qr-zone img {
          width: 220px;
          height: 220px;
          object-fit: contain;
          border-radius: 16px;
          background: #fff;
          padding: 16px;
          box-shadow: 0 4px 14px rgba(0,0,0,.06);
        }

        .qr-zone span {
          color: #6b7280;
          font-size: 15px;
        }

        @media (max-width: 900px) {
          .rechargeur-section {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>

      {/* Colonne gauche — formulaire */}
      <form className="rechargeur-form" onSubmit={handleSubmit}>
        <h2>Devenir rechargeur</h2>
        <p>Rejoignez notre équipe et rechargez les trottinettes ZYPP dans votre ville ⚡</p>

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

      {/* Colonne droite — QR code */}
      <div className="qr-zone">
        <img src="/src/img/qrcode.png" alt="QR code pour télécharger ZYPP" />
        <span>Scannez pour télécharger l’application ZYPP 📱</span>
      </div>
    </section>
  );
}
