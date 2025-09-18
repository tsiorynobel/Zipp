import React from "react";

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
          features={["Plafond automatique", "Idéal trajets longs"]}
          ctaLabel="Choisir"
          highlight
        />
        <PlanCard
          name="Crédit"
          price="Dès 9,99€"
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

      <style>{`
        .section {
          padding: 60px 20px;
          max-width: 1100px;
          margin: 0 auto;
          text-align: center;
        }
        .section h2 {
          font-size: 2.2rem;
          margin-bottom: 6px;
        }
        .section .subtitle {
          color: var(--muted);
          margin-bottom: 40px;
        }

        .pricing {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }
        @media (max-width: 980px) {
          .pricing { grid-template-columns: 1fr; }
        }

        .plan {
          background: var(--elev);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 24px;
          box-shadow: var(--shadow-1);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .plan.pop {
          outline: 2px solid color-mix(in oklab, var(--accent), white 30%);
        }
        .plan h3 {
          margin-bottom: 10px;
          font-size: 1.4rem;
        }
        .price {
          font-family: var(--serif);
          font-size: var(--fs-44, 2rem);
          font-weight: 700;
          margin-bottom: 16px;
        }
        .list {
          list-style: none;
          padding: 0;
          margin: 0 0 20px;
        }
        .list li {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 8px 0;
        }
        .check {
          width: 18px;
          height: 18px;
          display: grid;
          place-items: center;
          border-radius: 999px;
          background: color-mix(in oklab, var(--accent), white 85%);
          color: #0b0b0d;
          font-weight: 800;
          font-size: 0.8rem;
        }
        .cta {
          background: var(--accent);
          border: none;
          color: #fff;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .cta:hover {
          background: var(--accent-600);
        }

        .pricing-text p {
          max-width: 700px;
          margin: 0 auto;
          color: var(--muted);
          line-height: 1.6;
          font-size: 1.1rem;
        }
      `}</style>
    </Section>
  );
}
