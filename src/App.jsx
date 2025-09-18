import { useEffect, useRef, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import './styles/styleApp.css'
import { 
  useHeaderShadow, 
  useReveal,  
  usePWAInstall 
} from "./hooks/useEffects.js";
// ---------------------------------------------------------------
//  Pages (Routes)
// ---------------------------------------------------------------  
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Welcome from "./pages/Welcome.jsx";
import Rechargeur from "./pages/Rechargeur.jsx";  
import Apropos from "./pages/Apropos.jsx"; 
import Tarifs from "./pages/Tarifs.jsx";  
import Contact from "./pages/Contact.jsx";   
import Avis from "./pages/Avis.jsx";  


// ---------------------------------------------------------------
//  Composants atomiques
// ---------------------------------------------------------------
function LogoBadge({ size = 120 }) {
  return (
    <span
      className="logo-badge"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: "auto",
      }}
    >
      <img
        src="img/logo.jpg"
        alt="Logo ZYPP"
        className="logo-img"
        style={{
          maxWidth: "100%",
          height: "auto",
          display: "block",
        }}
      />
    </span>
  );
}



function SkipLink() {
  return (
    <a className="skip-link" href="#top">
      Aller au contenu
    </a>
  );
}

function CtaButton({ href, children, id }) {
  return (
    <a className="cta" href={href} id={id}>
      {children}
    </a>
  );
}

function NeutralButton({ href, children, className = "", id }) {
  return (
    <a className={`btn ${className}`} href={href} id={id}>
      {children}
    </a>
  );
}

// ---------------------------------------------------------------
//  Menu Compte accessible
// ---------------------------------------------------------------
function AccountMenu() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (!open) return;
      if (!menuRef.current?.contains(e.target) && e.target !== btnRef.current) {
        setOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowDown" && open) {
        const first = menuRef.current?.querySelector("a,button,[tabindex]:not([tabindex='-1'])");
        first?.focus();
      }
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="account">
      <button
        className="account-toggle"
        ref={btnRef}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="accountMenu"
        onClick={(e) => {
          e.preventDefault();
          setOpen((v) => !v);
        }}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"
          />
        </svg>
        Compte
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M7 10l5 5 5-5z" />
        </svg>
      </button>

      <div
        className={`menu ${open ? "open" : ""}`}
        id="accountMenu"
        role="menu"
        aria-labelledby="accountToggle"
        ref={menuRef}
      >
        <Link className="login-btn" to="/login" role="menuitem" onClick={() => setOpen(false)}>
          Se connecter
        </Link>
        <Link className="cta" to="/signup" role="menuitem" onClick={() => setOpen(false)}>
          Inscription
        </Link>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------
//  Navigation & Header
// ---------------------------------------------------------------
function MainNav() {
  return (
    <nav className="main" aria-label="Navigation principale">
        <Link  to="/rechargeur" role="menuitem">
          Devenir chargeur
        </Link>
          <Link  to="/tarif" role="menuitem">
          Tarifs
        </Link>
         <Link  to="/avis" role="menuitem">
         Avis
        </Link>


         <Link to="/apropos" role="menuitem">
         À propos
        </Link>
       <Link to="/contact" role="menuitem">
         Nos contactez
        </Link>
      <AccountMenu />
      <CtaButton href="#download">Télécharger l’application</CtaButton>
    </nav>
  );
}

function Header() {
  const scrolled = useHeaderShadow();
  return (
    <header className={`site ${scrolled ? "scrolled" : ""}`} role="banner" id="siteHeader">
      <div className="wrap topbar">
        <a href="#top" className="brand" aria-label="ZYPP, accueil">
          <LogoBadge />
        </a>
        <MainNav />
      </div>
    </header>
  );
}

// ---------------------------------------------------------------
// Sections & cartes
// ---------------------------------------------------------------
function Hero() {
  return (
    <main id="top" className="hero">
      <div className="blob one" data-parallax data-parallax-x="0.15" data-parallax-y="0.05" />
      <div className="blob two" data-parallax data-parallax-x="-0.1" data-parallax-y="0.06" />

      <div className="wrap grid">
        <div className="reveal" data-parallax data-parallax-y="0.06">
          <h1 className="title" data-parallax data-parallax-y="0.04" data-parallax-rot="0.3">
            La mobilité urbaine <em>qui vous ressemble</em>.
          </h1>
          <p className="lead" data-parallax data-parallax-y="0.03">
            Déverrouillez en 1 scan, plafonnez à <strong>5,99€</strong> par trajet, et roulez l’esprit tranquille.
            Paiements sécurisés, zones sûres intégrées et assistance <strong>7j/7</strong>.
          </p>
          <div className="actions" data-parallax data-parallax-y="0.02">
            <CtaButton href="#download">Obtenir l’app</CtaButton>
            <NeutralButton href="#pricing">Voir le tarif</NeutralButton>
          </div>
        </div>
        <aside className="reveal" aria-hidden="true">
          <div className="app-frame" data-parallax data-parallax-y="0.08" data-parallax-x="0.04" data-parallax-rot="0.15" data-parallax-scale="0.5">
            <img className="app-visual" src="img/troty.jpg" alt="Écran de l’app ZYPP affichant la carte, les zones sûres et le bouton Scanner" />
          </div>
        </aside>
      </div>
    </main>
  );
}

function Section({ id, alt = false, title, subtitle, children, ariaLabel }) {
  return (
    <section id={id} className={`section ${alt ? "alt" : ""}`} role={ariaLabel ? "region" : undefined} aria-label={ariaLabel}>
      <div className="wrap">
        {title && <h2 className="reveal" data-parallax data-parallax-y="0.03">{title}</h2>}
        {subtitle && <p className="sub reveal" data-parallax data-parallax-y="0.02">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <article className="card hover-lift reveal" data-parallax data-parallax-y="0.03">
      <div className="ico" aria-hidden="true">{icon}</div>
      <h3>{title}</h3>
      <p className="muted">{text}</p>
    </article>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: "/src/assets/images/feature-tarif.png",
      title: "Cap tarif 5,99€",
      text: "Jamais plus que le plafond par trajet, calcul automatique.",
    },
    {
      icon: "/src/assets/images/feature-zones.png",
      title: "Zones sûres",
      text: "Stationnements recommandés, zones lentes et périmètres interdits intégrés.",
    },
    {
      icon: "/src/assets/images/feature-securite.png",
      title: "Sécurité & assurance",
      text: "Vérification d’âge, rappel casque, couverture incluse pour chaque trajet.",
    },
  ];

  return (
    <Section
      id="features"
      title="Simple, rapide, sécurisé"
      subtitle="Tout pour rouler serein — façon ZYPP."
    >
      <div className="cards">
        {features.map((f, i) => (
          <FeatureCard
            key={i}
            icon={
              <img
                src={f.icon}
                alt={f.title}
                style={{
                  width: "64px",
                  height: "64px",
                  objectFit: "contain",
                  display: "block",
                  margin: "0 auto 16px",
                }}
              />
            }
            title={f.title}
            text={f.text}
          />
        ))}
      </div>
    </Section>
  );
}

function PlanCard({ name, price, features, ctaLabel = "Choisir", highlight = false }) {
  return (
    <article className={`plan ${highlight ? "pop" : ""} reveal`} data-parallax data-parallax-y="0.02">
      <h3>{name}</h3>
      <div className="price">{price}</div>
      <ul className="list">
        {features.map((f, i) => (
          <li key={i}>
            <span className="check">✓</span> {f}
          </li>
        ))}
      </ul>
      {highlight ? <CtaButton href="#download">{ctaLabel}</CtaButton> : <NeutralButton href="#download">{ctaLabel}</NeutralButton>}
    </article>
  );
}

function PricingSection() {
  return (
    <Section id="pricing" title="Des tarifs clairs" subtitle="Choisissez, roulez, c’est tout.">
      <div className="pricing">
        <PlanCard name="À la minute" price="0,15€/min" features={["Déverrouillage 1€", "Sans engagement"]} ctaLabel="Commencer" />
        <PlanCard name="Cap tarif" price="5,99€/trajet" features={["Plafond automatique", "Idéal trajets longs"]} ctaLabel="Choisir" highlight />
        <PlanCard name="Crédit" price="Dès 9,99€" features={["Minutes sans expiration", "Partageables"]} ctaLabel="Acheter" />
      </div>
    </Section>
  );
}

function ValueCard({ icon, title, text }) {
  return (
    <div className="value-card reveal" data-parallax data-parallax-y="0.03">
      <div className="value-icon">{icon}</div>
      <h3 className="value-title">{title}</h3>
      <p className="value-text">{text}</p>
    </div>
  );
}

function ValeursSection() {
  const valeurs = [
    {
      icon: "X",
      title: "Durabilité",
      text: "Une mobilité qui respecte la planète et réduit les émissions de CO₂ grâce à des trottinettes éco-conçues.",
    },
    {
      icon: "X",
      title: "Accessibilité",
      text: "Un service simple, intuitif et abordable, pour que chacun puisse se déplacer librement en ville.",
    },
    {
      icon: "X",
      title: "Innovation",
      text: "Des solutions toujours plus intelligentes pour une mobilité fluide et connectée.",
    },
  ];

  return (
    <Section
      id="valeurs"
      title="Nos Valeurs"
      subtitle="Ce qui nous guide au quotidien"
    >
      <div className="values-grid">
        {valeurs.map((v, i) => (
          <ValueCard key={i} icon={v.icon} title={v.title} text={v.text} />
        ))}
      </div>
    </Section>
  );
}

function ReviewCard({ avatar, name, stars, quote }) {
  return (
    <figure className="card review reveal" data-parallax data-parallax-y="0.025">
      <div className="who">
        <span className="avatar" aria-hidden="true">{avatar}</span>
        <figcaption>
          <span className="name">{name}</span>
        </figcaption>
      </div>
      <div className="stars">{stars}</div>
      <p>“{quote}”</p>
    </figure>
  );
}

function ReviewsSection() {
  return (
    <Section id="reviews" alt title="Ils nous recommandent">
      <div className="cards">
        <ReviewCard avatar="?" name="Léa M." stars="★★★★★" quote="Déverrouillage instantané, cap top." />
        <ReviewCard avatar="?" name="Sophie T." stars="★★★★★" quote="Moins cher que la voiture en ville." />
        <ReviewCard avatar="?" name="Karim B." stars="★★★★☆" quote="App fluide, zones claires." />
      </div>
    </Section>
  );
}

function DownloadSection() {
  usePWAInstall("installPWA");
  return (
    <section id="download" role="region" aria-label="Téléchargement de l’app">
      <div className="wrap dl-grid">
        <div className="reveal" data-parallax data-parallax-y="0.02">
          <h2 className="dl-title">Téléchargez ZYPP et partez en 30 s</h2>
          <p className="dl-sub">Scannez, roulez, plafonnez si besoin. Sécurisé et rapide.</p>
          <div className="badges" role="group" aria-label="Boutons de téléchargement">
            <a className="badge-store" href="#" data-store="google" aria-label="Télécharger sur Google Play">📱 Google Play</a>
            <a className="badge-store" href="#" data-store="apple" aria-label="Télécharger sur l’App Store">🍎 App Store</a>
            <NeutralButton id="installPWA" href="#pwa">Installer l’app web</NeutralButton>
          </div>
        </div>
        <div className="qr reveal" data-parallax data-parallax-y="0.05" data-parallax-scale="0.6">
          <img src="img/qrcode.png" alt="QR code pour télécharger ZYPP" width="160" height="160" loading="lazy" />
          <span className="muted">Scannez pour télécharger</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer role="contentinfo">
      <div className="wrap foot">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <LogoBadge size={28} />
          <span>ZYPP © 2025</span>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          <a href="#">Mentions légales</a>
          <a href="#">Confidentialité</a>
          <a href="#">Support</a>
        </div>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------
// 7) Application
// ---------------------------------------------------------------
export default function App() {
  const revealRef = useReveal();

  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <div ref={revealRef}>
              <Hero />
              <FeaturesSection />
              <PricingSection />
              <ValeursSection />
              <ReviewsSection />
              <DownloadSection />
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
         <Route path="/welcome" element={<Welcome />} /> 
          <Route path="/rechargeur" element={<Rechargeur />} />
          <Route path="/apropos" element={<Apropos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tarif" element={<Tarifs />} />
          <Route path="/avis" element={<Avis />} />
          
      </Routes>

      <Footer />
    </>
  );
}