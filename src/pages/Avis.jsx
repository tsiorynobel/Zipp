import React from "react";
import "../styles/Avis.css";

function ReviewCard({ avatar, name, stars, quote }) {
  return (
    <div className="review">
      <div className="who">
        <div className="avatar">
          <img src={avatar} alt={name} />
        </div>
        <div>
          <div className="name">{name}</div>
          <div className="stars">{stars}</div>
        </div>
      </div>
      <p className="quote">“{quote}”</p>
    </div>
  );
}

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="section">
      <h2>{title}</h2>
      {subtitle && <p className="subtitle">{subtitle}</p>}
      {children}
    </section>
  );
}

export default function Avis() {
  return (
    <Section id="reviews" title="Ils nous recommandent">
      <div className="reviews-grid">
        <ReviewCard
          avatar="/src/assets/images/avatar-lea.jpg"
          name="Léa M."
          stars="★★★★★"
          quote="Déverrouillage instantané, cap top."
        />
        <ReviewCard
          avatar="/src/assets/images/avatar-sophie.jpg"
          name="Sophie T."
          stars="★★★★★"
          quote="Moins cher que la voiture en ville."
        />
        <ReviewCard
          avatar="/src/assets/images/avatar-karim.jpg"
          name="Karim B."
          stars="★★★★☆"
          quote="App fluide, zones claires."
        />
      </div>

      <div className="reviews-text">
        <p>
          Des milliers d’utilisateurs nous font déjà confiance chaque jour pour
          leurs déplacements urbains. Et vous, quand est-ce que vous essayez
          ZYPP ?
        </p>
      </div>
    </Section>
  );
}
