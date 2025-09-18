import { useState, useEffect, useRef } from "react";

export function useHeaderShadow() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrolled;
}

export function useReveal() {
  const containerRef = useRef(null);

  useEffect(() => {
    const root = containerRef.current || document;
    const els = root.querySelectorAll?.(".reveal");
    if (!els?.length) return;

    const groups = new Map();
    els.forEach((el) => {
      const parent = el.closest(".wrap, .cards, section, .dl-grid") || document.body;
      if (!groups.has(parent)) groups.set(parent, []);
      groups.get(parent).push(el);
    });
    groups.forEach((list) =>
      list.forEach((el, i) => el.style.setProperty("--delay", i * 0.07 + "s"))
    );

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return containerRef;
}

export function useParallax(selector = "[data-parallax]") {
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
        const dist = (center - mid) / vh;

        const strength = parseFloat(el.getAttribute("data-parallax")) || 1;
        const px = parseFloat(el.getAttribute("data-parallax-x")) || 0;
        const py = parseFloat(el.getAttribute("data-parallax-y")) || 0.06;
        const rot = parseFloat(el.getAttribute("data-parallax-rot")) || 0;
        const sc = parseFloat(el.getAttribute("data-parallax-scale")) || 0;

        const tx = -px * dist * 60;
        const ty = -py * dist * 60;
        const r = -rot * dist * 6;
        const s = 1 + sc * -dist * 0.06;

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
export function usePWAInstall(buttonId) {
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



