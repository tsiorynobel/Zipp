import { useState } from "react";
import "../styles/Apropos.css";

export default function Apropos() {
  return (
    <section className="apropos-page">

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
