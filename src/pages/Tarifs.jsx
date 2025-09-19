import React from "react";
import "../styles/Tarifs.css";

function PlanCard({ name, price, features, ctaLabel, highlight }) {
  return (
    <div className={`plan ${highlight ? "pop" : ""}`}>
      <h3>{name}</h3>
      <div className="price">{price}</div>
      <ul className="list">
        {features.map((f, i) => (
          <li key={i}>
            <span className="check">✓</span>
            {f}
          </li>
        ))}
      </ul>
      <button className="cta">{ctaLabel}</button>
    </div>
  );
}

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="section">
      <h2>{title}</h2>
      <p className="subtitle">{subtitle}</p>
      {children}
    </section>
  );
}

export default function Tarifs() {
  return (
    <Section
      id="pricing"
      title="Des tarifs clairs"
      subtitle="Choisissez, roulez, c’est tout."
    >
      <div className="pricing">
        <PlanCard
          name="À la minute"
          price="0,15€/min"
          features={["Déverrouillage 1€", "Sans engagement"]}
          ctaLabel="Commencer"
        />
        <PlanCard
          name="Cap tarif"
          price="5,99€/trajet"
          features={["Plafond automatique", "Idéal trajets longs 33 min"]}
          ctaLabel="Choisir"
          highlight
        />
        <PlanCard
          name="Crédit"
          price="Dès 50€"
          features={["Minutes sans expiration", "Partageables"]}
          ctaLabel="Acheter"
        />
      </div>

      <div className="pricing-text">
        <p>
          Avec ZYPP, vous gardez le contrôle sur vos dépenses : payez à la
          minute pour vos trajets courts, profitez d’un tarif plafonné pour les
          longues balades, ou achetez du crédit à l’avance pour rouler
          librement. Aucun engagement, juste la liberté de vous déplacer.
        </p>
      </div>
    </Section>
  );
}
