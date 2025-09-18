// App.jsx — ZYPP en React (tout-en-un, avec parallaxe)
// ---------------------------------------------------------------
// ✅ Objectif : Page marketing ZYPP, prête à éclater en composants
// ✅ Bonus : Effets "reveal" + parallaxe léger (désactivés si reduce-motion)
// ✅ Assets : placez troty.jpg et qrcode.png dans /public (racine Vite)
// ✅ Démarrage : Vite
//    npm create vite@latest zypp -- --template react
//    cd zypp && npm i
//    remplacez src/App.jsx par ce fichier
//    npm run dev
// ---------------------------------------------------------------

import { useEffect, useRef, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Welcome from "./pages/Welcome.jsx";


// ---------------------------------------------------------------
// 1) Styles globaux
// ---------------------------------------------------------------
const STYLES = `
:root {
  --bg: #ffffff;
  --surface: #f6f8fb;
  --elev: #ffffff;
  --text: #0f172a;
  --muted: #334155;
  --border: #e2e8f0;
  --accent: #ff6a00;
  --accent-600: #e65f02;
  --radius: 16px;
  --shadow-1: 0 2px 6px rgba(15, 23, 42, .06);
  --shadow-2: 0 10px 30px rgba(15, 23, 42, .08);
  --shadow-3: 0 30px 80px rgba(15, 23, 42, .10);
  --serif: "Playfair Display", ui-serif, Georgia, "Times New Roman", serif;
  --sans: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
  --fs-14: clamp(13px, .9vw, 14px);
  --fs-16: clamp(15px, 1vw, 16px);
  --fs-18: clamp(16px, 1.2vw, 18px);
  --fs-24: clamp(18px, 1.6vw, 24px);
  --fs-44: clamp(28px, 4vw, 44px);
  --fs-64: clamp(34px, 6vw, 64px);
  accent-color: var(--accent);
}
* { box-sizing: border-box }
html { scroll-behavior: smooth }
body { margin: 0; background: var(--bg); color: var(--text); font-family: var(--sans); line-height: 1.6 }
img { max-width: 100%; display: block }
a { color: inherit; text-decoration: none }
:focus-visible { outline: 3px solid color-mix(in oklab, var(--accent), black 10%); outline-offset: 3px }
.wrap { max-width: min(1160px, 92vw); margin: 0 auto; padding: 0 20px }

/* ===== Header ===== */
header.site { position: sticky; top: 0; z-index: 50; background: rgba(255,255,255,.96); border-bottom: 1px solid var(--border); transition: box-shadow .2s, border-color .2s, background .2s }
header.site.scrolled { box-shadow: var(--shadow-1); border-color: #e5e7eb }
.topbar { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 14px 0 }
.brand { display: flex; align-items: center; gap: 12px }
.brand svg { display: block }
.brand svg * { stroke: #0b0b0d }
.brand-name { font-family: var(--serif); font-weight: 700; letter-spacing: .02em; font-size: 22px }

.logo-badge {
  border-radius: 8px;
}

.logo-img {
  display: block;
  max-width: 140px; /* ✅ taille max du logo */
  height: auto;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

nav.main { display: flex; align-items: center; gap: 18px; flex-wrap: wrap }
nav.main a { color: var(--muted); font-weight: 600; padding: .4rem .2rem; text-underline-offset: .2em }
nav.main a:hover, nav.main a:focus-visible { color: var(--text); text-decoration: underline }
nav.main a[aria-current="page"] { color: var(--text); text-decoration: underline; text-decoration-thickness: 2px }

/* CTA : texte blanc sur orange */
.cta { display: inline-flex; align-items: center; gap: .6rem; min-height: 44px; padding: 10px 16px; border-radius: 999px; font-weight: 700; background: var(--accent); color: #fff; border: 1px solid color-mix(in oklab, var(--accent), black 20%); box-shadow: var(--shadow-1); transform: translateZ(0); transition: transform .15s, background .15s }
.cta:hover { background: var(--accent-600); transform: translateY(-1px) }

/* Boutons neutres */
.btn, .login-btn, .signup-btn { display: inline-flex; align-items: center; gap: .4rem; min-height: 40px; padding: 8px 14px; border-radius: 999px; font-weight: 700; background: #fff; color: #0f172a; border: 1px solid var(--border); box-shadow: var(--shadow-1); transition: transform .15s, border-color .15s }
.btn:hover, .login-btn:hover, .signup-btn:hover { transform: translateY(-1px); border-color: color-mix(in oklab, var(--accent), black 20%) }

/* ===== Menu compte (déroulant) ===== */
.account { position: relative }
.account-toggle { display: inline-flex; align-items: center; gap: .5rem; min-height: 40px; padding: 8px 14px; border-radius: 999px; font-weight: 700; background: #fff; color: #0f172a; border: 1px solid var(--border); box-shadow: var(--shadow-1); cursor: pointer }
.account-toggle:hover { border-color: color-mix(in oklab, var(--accent), black 20%) }
.account-toggle svg { width: 18px; height: 18px }
.menu { position: absolute; right: 0; top: calc(100% + 8px); min-width: 220px; background: #fff; border: 1px solid var(--border); border-radius: 12px; box-shadow: var(--shadow-2); padding: 10px; display: none }
.menu.open { display: block }
.menu a { display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-radius: 10px; font-weight: 700 }
.menu a:hover { background: #f1f5f9 }
.menu .cta { width: 100%; justify-content: center; color: #fff }

/* ===== Hero ===== */
.hero { position: relative; overflow: hidden; background: #ffffff }
.hero .grid { display: grid; grid-template-columns: 1.05fr .95fr; gap: 40px; align-items: center; padding: 44px 0 30px }
@media (max-width:980px) { .hero .grid { grid-template-columns: 1fr; padding: 28px 0 } }
.title { font-family: var(--serif); font-size: var(--fs-64); line-height: 1.06; letter-spacing: .01em; margin: .2rem 0 .6rem }
.title em { font-style: normal; color: var(--accent) }
.lead { font-size: var(--fs-24); color: #475569; max-width: 60ch }
.actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 18px }
.btn { min-height: 44px; padding: 10px 16px }

/* Visuel app */
.app-frame { position: relative; border: none; padding: 0; background: transparent; border-radius: 16px; overflow: hidden }
.app-visual { display: block; width: 100%; height: 100%; object-fit: cover; transform-origin: center; will-change: transform; animation: zyppBob 6s ease-in-out infinite }
.app-frame::after { content: ""; position: absolute; inset: -20%; pointer-events: none; background: linear-gradient(120deg, transparent 45%, rgba(255,255,255,.35) 50%, transparent 55%); transform: translateX(-120%); animation: zyppShine 5.5s linear infinite; mix-blend-mode: screen }
.app-frame:hover .app-visual { animation-play-state: paused; transition: transform .25s; transform: translateY(-2px) scale(1.01) rotate(-.25deg) }
.app-frame:hover::after { animation-play-state: paused }

/* ===== Sections ===== */
section.section { padding: 54px 0; background: transparent }
section.alt { background: #f8fafc }
h2 { font-family: var(--serif); font-size: var(--fs-44); margin: 0 0 12px }
.sub { color: #475569; margin: 0 0 20px }
.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px }
@media (max-width:980px) { .cards { grid-template-columns: 1fr 1fr } }
@media (max-width:620px) { .cards { grid-template-columns: 1fr } }
.card { background: var(--elev); border: 1px solid var(--border); border-radius: var(--radius); padding: 18px; box-shadow: var(--shadow-1); transition: transform .18s, box-shadow .18s }
.card.hover-lift:hover { transform: translateY(-2px); box-shadow: var(--shadow-2) }
.card .ico { width: 40px; height: 40px; display: grid; place-items: center; border-radius: 10px; margin-bottom: 12px; background: var(--accent); color: #0b0b0d; font-weight: 800; box-shadow: var(--shadow-1); outline: 1px solid color-mix(in oklab, var(--accent), black 25%) }
.card h3 { margin: .2rem 0 .2rem; font-size: var(--fs-18) }
.muted { color: #475569 }

/* Reviews */
.review { display: grid; gap: 10px }
.review .who { display: flex; align-items: center; gap: 10px }
.avatar { width: 40px; height: 40px; border-radius: 999px; display: grid; place-items: center; background: color-mix(in oklab, var(--accent), white 70%); color: #0b0b0d; font-weight: 800; box-shadow: var(--shadow-1); border: 1px solid color-mix(in oklab, var(--accent), black 15%) }
.name { font-weight: 700 }
.stars { color: #475569; font-weight: 700 }

/* Pricing */
.pricing { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px }
@media (max-width:980px) { .pricing { grid-template-columns: 1fr } }
.plan { background: var(--elev); border: 1px solid var(--border); border-radius: var(--radius); padding: 22px; box-shadow: var(--shadow-1) }
.plan.pop { outline: 1.5px solid color-mix(in oklab, var(--accent), white 30%) }
.price { font-family: var(--serif); font-size: var(--fs-44); font-weight: 700 }
.list { list-style: none; margin: 10px 0 0; padding: 0 }
.list li { display: flex; align-items: center; gap: 10px; margin: 8px 0 }
.check { width: 18px; height: 18px; display: grid; place-items: center; border-radius: 999px; background: color-mix(in oklab, var(--accent), white 85%); color: #0b0b0d; font-weight: 800 }

/* Download */
#download { padding: 60px 0; background: linear-gradient(180deg, #f3f6fb, #ffffff) }
.dl-grid { display: grid; grid-template-columns: 1.1fr .9fr; gap: 24px; align-items: center }
@media (max-width:980px) { .dl-grid { grid-template-columns: 1fr; text-align: center } }
.badge-store { display: inline-flex; align-items: center; gap: 10px; min-height: 48px; padding: 10px 14px; border-radius: 14px; background: #111; color: #fff; border: 1px solid #1f2937; box-shadow: var(--shadow-1); transition: transform .15s }
.badge-store:hover { transform: translateY(-1px) }
.badge-store.primary { background: var(--accent); color: #111; border-color: transparent }
.badges { display: flex; gap: 12px; align-items: center; flex-wrap: wrap }
@media (max-width:980px) { .badges { justify-content: center } }
.qr { display: grid; gap: 10px; justify-items: center }
.qr img { width: 160px; height: 160px; border-radius: 12px; background: #fff; padding: 10px; box-shadow: var(--shadow-1) }
.dl-title { font-family: var(--serif); font-size: var(--fs-44); margin: 0 0 10px }
.dl-sub { color: #475569; margin: 0 0 16px }

/* Footer */
footer { border-top: 1px solid var(--border); padding: 26px 0; color: #475569 }
.foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap }
.foot .logo-badge { inline-size: 28px; block-size: 28px; border-radius: 8px }

/* Accessibilité & reveals */
.skip-link { position: absolute; left: -9999px; top: auto; width: 1px; height: 1px; overflow: hidden }
.skip-link:focus { left: 16px; top: 16px; width: auto; height: auto; padding: .5rem .75rem; z-index: 9999; background: #111; color: #fff; border-radius: 8px; outline: 3px solid color-mix(in oklab, var(--accent), white 30%) }
.reveal { opacity: 0; transform: translateY(12px); transition: opacity .6s, transform .6s; transition-delay: var(--delay, 0s) }
.reveal.in-view { opacity: 1; transform: none }

/* Décors flottants (parallaxe) */
.blob { position: absolute; filter: blur(40px); opacity: .22; pointer-events:none }
.blob.one { width: 320px; height: 320px; border-radius: 50%; background: #ffb37e; top: -80px; left: -80px }
.blob.two { width: 260px; height: 260px; border-radius: 50%; background: #9cd3ff; bottom: -60px; right: -40px }

@media (prefers-reduced-motion: reduce) {
  * { transition-duration: .001ms !important; animation-duration: .001ms !important; scroll-behavior: auto !important }
  .app-visual, .app-frame::after, [data-parallax] { animation: none !important; transform: none !important }
}
@keyframes zyppBob { 0% { transform: translateY(0) scale(1) } 50% { transform: translateY(-6px) scale(1.01) } 100% { transform: translateY(0) scale(1) } }
@keyframes zyppShine { to { transform: translateX(120%) } }
`;

// ---------------------------------------------------------------
// 2) Hooks réutilisables (effets et accessibilité)
// ---------------------------------------------------------------

// Ombre du header au scroll
function useHeaderShadow() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

// Effet reveal à l’entrée dans le viewport
function useReveal() {
  const containerRef = useRef(null);
  useEffect(() => {
    const root = containerRef.current || document;
    const els = root.querySelectorAll?.(".reveal");
    if (!els?.length) return;

    // délais progressifs par groupe
    const groups = new Map();
    els.forEach((el) => {
      const parent = el.closest(".wrap, .cards, section, .dl-grid") || document.body;
      if (!groups.has(parent)) groups.set(parent, []);
      groups.get(parent).push(el);
    });
    groups.forEach((list) => list.forEach((el, i) => el.style.setProperty("--delay", i * 0.07 + "s")));

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return containerRef;
}

// Parallaxe douce multi-axes (data-parallax, data-parallax-x, data-parallax-y, data-parallax-rot, data-parallax-scale)
function useParallax(selector = "[data-parallax]") {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const items = Array.from(document.querySelectorAll(selector));
    if (!items.length) return;

    let ticking = false;
    function update() {
      const vh = window.innerHeight;
      const mid = vh / 2;
      items.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = (center - mid) / vh; // -1..1 approx
        const strength = parseFloat(el.getAttribute("data-parallax")) || 1; // force globale
        const px = (parseFloat(el.getAttribute("data-parallax-x")) || 0) * strength;
        const py = (parseFloat(el.getAttribute("data-parallax-y")) || 0.06) * strength;
        const rot = (parseFloat(el.getAttribute("data-parallax-rot")) || 0) * strength;
        const sc = parseFloat(el.getAttribute("data-parallax-scale")) || 0;

        const tx = -px * dist * 60;      // 60px max approx
        const ty = -py * dist * 60;
        const r = -rot * dist * 6;       // 6deg max approx
        const s = 1 + (sc * -dist * 0.06);

        const parts = [
          `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`,
          rot ? ` rotate(${r.toFixed(2)}deg)` : "",
          sc ? ` scale(${s.toFixed(3)})` : "",
        ];
        el.style.transform = parts.join("");
        el.style.willChange = "transform";
      });
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [selector]);
}

// Prompt PWA (bouton d'installation si disponible)
function usePWAInstall(buttonId) {
  const [isVisible, setIsVisible] = useState(false);
  const deferredRef = useRef(null);

  useEffect(() => {
    function onBeforeInstallPrompt(e) {
      e.preventDefault();
      deferredRef.current = e;
      setIsVisible(true);
    }
    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
  }, []);

  useEffect(() => {
    const btn = document.getElementById(buttonId);
    if (!btn) return;
    if (!isVisible) {
      btn.style.display = "none";
      return;
    }
    btn.style.display = "inline-flex";
    const onClick = async (e) => {
      e.preventDefault();
      if (!deferredRef.current) return;
      deferredRef.current.prompt();
      deferredRef.current = null;
      setIsVisible(false);
    };
    btn.addEventListener("click", onClick);
    return () => btn.removeEventListener("click", onClick);
  }, [buttonId, isVisible]);

  // Mise en avant du store selon device
  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isAndroid = /android/i.test(ua);
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    const g = document.querySelector('[data-store="google"]');
    const a = document.querySelector('[data-store="apple"]');
    if (isAndroid && g) g.classList.add("primary");
    if (isIOS && a) a.classList.add("primary");
  }, []);
}

// ---------------------------------------------------------------
// 3) Composants atomiques
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
        src="/src/img/logo.jpg"
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
// 4) Menu Compte accessible
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
        {/* ✅ Utiliser Link et des vraies routes */}
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
// 5) Navigation & Header
// ---------------------------------------------------------------
function MainNav() {
  return (
    <nav className="main" aria-label="Navigation principale">
      <a href="#top" aria-current="page">Accueil</a>
      <a href="#">Devenir rechargeur </a>
      <a href="#pricing">Tarifs</a>
      <a href="#reviews">Avis</a>
      <a href="#about">À propos</a>
      <a href="#support">Support</a>
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
// 6) Sections & cartes
// ---------------------------------------------------------------
function Hero() {
  // Parallaxe sur plusieurs éléments du hero
  useParallax();
  return (
    <main id="top" className="hero">
      {/* Décors flottants */}
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
            <NeutralButton href="#pricing">Voir les tarifs</NeutralButton>
          </div>
        </div>
        <aside className="reveal" aria-hidden="true">
          <div className="app-frame" data-parallax data-parallax-y="0.08" data-parallax-x="0.04" data-parallax-rot="0.15" data-parallax-scale="0.5">
            <img className="app-visual" src="../src/img/troty.jpg" alt="Écran de l’app ZYPP affichant la carte, les zones sûres et le bouton Scanner" />
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
  return (
    <Section id="features" title="Simple, rapide, sécurisé" subtitle="Tout pour rouler serein — façon ZYPP.">
      <div className="cards">
        <FeatureCard icon="€" title="Cap tarif 5,99€" text="Jamais plus que le plafond par trajet, calcul automatique." />
        <FeatureCard icon="🗺️" title="Zones sûres" text="Stationnements recommandés, zones lentes et périmètres interdits intégrés." />
        <FeatureCard icon="🛡️" title="Sécurité & assurance" text="Vérification d’âge, rappel casque, couverture incluse pour chaque trajet." />
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
        <ReviewCard avatar="👩" name="Léa M." stars="★★★★★" quote="Déverrouillage instantané, cap top." />
        <ReviewCard avatar="👩‍💼" name="Sophie T." stars="★★★★★" quote="Moins cher que la voiture en ville." />
        <ReviewCard avatar="🧔" name="Karim B." stars="★★★★☆" quote="App fluide, zones claires." />
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
          <img src="../src/img/qrcode.png" alt="QR code pour télécharger ZYPP" width="160" height="160" loading="lazy" />
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
      {/* Polices Google */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Playfair+Display:wght@600;700&display=swap"
        rel="stylesheet"
      />
      <style>{STYLES}</style>

      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <div ref={revealRef}>
              <Hero />
              <FeaturesSection />
              <PricingSection />
              <ReviewsSection />
              <DownloadSection />
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
         <Route path="/welcome" element={<Welcome />} /> 
      </Routes>

      <Footer />
    </>
  );
}