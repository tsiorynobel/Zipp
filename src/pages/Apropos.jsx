import { useState } from "react";

export default function Apropos() {
  return (
    <section className="apropos-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

        .apropos-page {
          font-family: 'Inter', sans-serif;
          background: #f8fafc;
          min-height: 100vh;
          padding: 60px 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .apropos-container {
          max-width: 900px;
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
          padding: 50px 40px;
          line-height: 1.7;
        }

        .apropos-container h2 {
          font-size: 2rem;
          margin-bottom: 20px;
          color: #ff6a00;
          text-align: center;
        }

        .apropos-container p {
          color: #334155;
          font-size: 1.1rem;
          text-align: justify;
        }
      `}</style>

      <div className="apropos-container">
        <h2>À propos de Zypp</h2>
        <p>
          Zypp est une jeune startup française née d’une conviction simple : la
          mobilité urbaine doit être à la fois pratique, durable et accessible.
          Fondée en 2024 par trois entrepreneurs passionnés de nouvelles
          technologies et de développement durable, la société s’apprête à
          lancer son premier service de trottinettes électriques en
          libre-service à Montpellier dès janvier 2025.
        </p>
        <br />
        <p>
          Ce projet s’inscrit dans un contexte particulier : la ville connaît
          depuis plusieurs années une forte croissance démographique et attire
          chaque année des milliers d’étudiants et de jeunes actifs. La
          circulation y est dense, les enjeux environnementaux de plus en plus
          pressants, et la demande pour des solutions de mobilité douce n’a
          jamais été aussi forte. C’est précisément dans cet écosystème que Zypp
          entend s’imposer comme un acteur incontournable de la mobilité
          partagée.
        </p>
      </div>
    </section>
  );
}
