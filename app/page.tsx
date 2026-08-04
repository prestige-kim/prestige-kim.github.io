"use client";

import { type PointerEvent, useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Labs", href: "#labs" },
  { label: "Archive", href: "#archive" },
  { label: "About", href: "#about" },
];

const focusAreas = [
  {
    index: "01",
    label: "AI / SYSTEMS",
    title: "Artificial Intelligence",
    detail: "Turning emerging capabilities into software people can actually use.",
  },
  {
    index: "02",
    label: "ML / SIGNAL",
    title: "Machine Learning",
    detail: "Learning from data with curiosity, discipline, and a bias toward clarity.",
  },
  {
    index: "03",
    label: "METHOD / SOLVE",
    title: "Problem Solving",
    detail: "Breaking complex questions into smaller, more useful next steps.",
  },
];

const links = [
  { label: "GitHub", value: "@prestige-kim", href: "https://github.com/prestige-kim" },
  { label: "LinkedIn", value: "myeongseong-kim", href: "https://www.linkedin.com/in/myeongseong-kim-b87038402" },
  { label: "Email", value: "proudchris@icloud.com", href: "mailto:proudchris@icloud.com" },
];

type Star = {
  x: number;
  y: number;
  radius: number;
  depth: number;
  twinkle: number;
  phase: number;
  hue: number;
};

type Meteor = {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  life: number;
  maxLife: number;
};

function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let frame = 0;
    let lastTime = 0;
    let nextMeteorAt = 3200;
    let pointerTargetX = 0;
    let pointerTargetY = 0;
    let pointerX = 0;
    let pointerY = 0;
    const stars: Star[] = [];
    const meteors: Meteor[] = [];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);
    const wrap = (value: number, max: number) => ((value % max) + max) % max;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      stars.length = 0;
      const starCount = Math.min(260, Math.max(110, Math.floor((width * height) / 7600)));
      for (let index = 0; index < starCount; index += 1) {
        const x = Math.random() * width;
        const inMilkyWay = Math.random() < 0.74;
        const bandCenter = height * 0.46 - (x - width * 0.5) * 0.19;
        stars.push({
          x,
          y: inMilkyWay ? bandCenter + randomBetween(-height * 0.22, height * 0.22) : Math.random() * height,
          radius: randomBetween(0.35, 1.45),
          depth: randomBetween(0.25, 1),
          twinkle: randomBetween(0.7, 2.2),
          phase: Math.random() * Math.PI * 2,
          hue: Math.random() < 0.78 ? 0 : Math.random() < 0.5 ? 1 : 2,
        });
      }
    };

    const updatePointer = (event: globalThis.PointerEvent) => {
      pointerTargetX = (event.clientX / width - 0.5) * 2;
      pointerTargetY = (event.clientY / height - 0.5) * 2;
    };

    const drawNebula = () => {
      context.save();
      context.translate(width / 2, height * 0.46);
      context.rotate(-0.19);
      const nebula = context.createLinearGradient(0, -height * 0.25, 0, height * 0.25);
      nebula.addColorStop(0, "rgba(110, 105, 255, 0)");
      nebula.addColorStop(0.42, "rgba(105, 122, 255, 0.025)");
      nebula.addColorStop(0.5, "rgba(190, 162, 255, 0.085)");
      nebula.addColorStop(0.58, "rgba(105, 122, 255, 0.025)");
      nebula.addColorStop(1, "rgba(110, 105, 255, 0)");
      context.fillStyle = nebula;
      context.fillRect(-width, -height * 0.38, width * 2, height * 0.76);
      context.restore();
    };

    const draw = (time: number) => {
      const elapsed = time / 1000;
      const delta = Math.min(0.05, (time - lastTime) / 1000 || 0);
      lastTime = time;
      pointerX += (pointerTargetX - pointerX) * 0.035;
      pointerY += (pointerTargetY - pointerY) * 0.035;

      context.clearRect(0, 0, width, height);
      drawNebula();

      stars.forEach((star) => {
        const driftX = elapsed * (3 + star.depth * 8);
        const driftY = Math.sin(elapsed * 0.08 + star.phase) * star.depth * 3;
        const x = wrap(star.x + driftX + pointerX * star.depth * 12, width);
        const y = wrap(star.y + driftY + pointerY * star.depth * 8, height);
        const alpha = 0.2 + star.depth * 0.5 + Math.sin(elapsed * star.twinkle + star.phase) * 0.16;
        const color = star.hue === 1 ? "190, 215, 255" : star.hue === 2 ? "201, 178, 255" : "235, 242, 255";
        context.beginPath();
        context.fillStyle = `rgba(${color}, ${Math.max(0.08, alpha)})`;
        context.arc(x, y, star.radius * (0.7 + star.depth * 0.7), 0, Math.PI * 2);
        context.fill();
      });

      if (!reducedMotion && time > nextMeteorAt) {
        meteors.push({
          x: randomBetween(width * 0.25, width * 0.85),
          y: randomBetween(-height * 0.12, height * 0.36),
          velocityX: randomBetween(260, 420),
          velocityY: randomBetween(100, 180),
          life: 0,
          maxLife: randomBetween(0.65, 1.15),
        });
        nextMeteorAt = time + randomBetween(5200, 9800);
      }

      meteors.forEach((meteor) => {
        meteor.life += delta;
        meteor.x += meteor.velocityX * delta;
        meteor.y += meteor.velocityY * delta;
        const progress = meteor.life / meteor.maxLife;
        const opacity = Math.sin(Math.min(1, progress) * Math.PI);
        const tail = 55 + progress * 65;
        const gradient = context.createLinearGradient(meteor.x, meteor.y, meteor.x - tail, meteor.y - tail * 0.38);
        gradient.addColorStop(0, `rgba(224, 244, 255, ${opacity * 0.9})`);
        gradient.addColorStop(1, "rgba(169, 151, 255, 0)");
        context.beginPath();
        context.strokeStyle = gradient;
        context.lineWidth = 1.5;
        context.moveTo(meteor.x, meteor.y);
        context.lineTo(meteor.x - tail, meteor.y - tail * 0.38);
        context.stroke();
      });
      for (let index = meteors.length - 1; index >= 0; index -= 1) {
        if (meteors[index].life > meteors[index].maxLife) meteors.splice(index, 1);
      }

      if (!reducedMotion) frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", updatePointer, { passive: true });
    draw(0);
    if (!reducedMotion) frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", updatePointer);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield-canvas" aria-hidden="true" />;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("work");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-24% 0px -58% 0px", threshold: [0, 0.15, 0.4] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("has-motion");

    const updateScrollProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0);
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => revealObserver.observe(element));
    return () => revealObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    const updatePointer = (event: globalThis.PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
        document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
      });
    };

    window.addEventListener("pointermove", updatePointer);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", updatePointer);
    };
  }, []);

  const handleCardPointerMove = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    const rotateY = (x - 50) / 18;
    const rotateX = (50 - y) / 18;
    event.currentTarget.style.setProperty("--card-x", `${x}%`);
    event.currentTarget.style.setProperty("--card-y", `${y}%`);
    event.currentTarget.style.setProperty("--card-rotate-x", `${rotateX}deg`);
    event.currentTarget.style.setProperty("--card-rotate-y", `${rotateY}deg`);
  };

  const resetCardPointer = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.removeProperty("--card-x");
    event.currentTarget.style.removeProperty("--card-y");
    event.currentTarget.style.removeProperty("--card-rotate-x");
    event.currentTarget.style.removeProperty("--card-rotate-y");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <Starfield />
      <header className="kinetic-header">
        <div className="header-inner">
          <a className="kinetic-mark" href="#top" onClick={closeMenu} aria-label="Myeongseong Kim home">MK.</a>
          <nav className={menuOpen ? "kinetic-nav is-open" : "kinetic-nav"} aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                className={activeSection === item.href.slice(1) ? "is-active" : ""}
                href={item.href}
                key={item.label}
                onClick={closeMenu}
                aria-current={activeSection === item.href.slice(1) ? "page" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a className="header-connect" href="#connect" onClick={closeMenu}>Connect</a>
          <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Toggle navigation">
            <span>{menuOpen ? "×" : "☰"}</span>
          </button>
        </div>
      </header>
      <div className="scroll-progress" aria-hidden="true">
        <span style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }} />
      </div>

      <section className="kinetic-hero" id="top">
        <div className="hero-frame">
          <div className="hero-content reveal-on-load">
            <p className="mono-label">MYEONGSEONG KIM <span>/</span> 김명성</p>
            <h1>Building useful<br />things with <em>AI.</em></h1>
            <p className="hero-intro">An AI developer exploring the space between machine learning, practical software, and better ways to solve hard problems.</p>
            <p className="hero-korean">AI 아이디어를 실제로 작동하는 소프트웨어로 만듭니다.</p>
          </div>
          <div className="hero-signal" aria-hidden="true">
            <div className="signal-orbit"><span /></div>
            <div className="signal-copy">
              <span className="mono-label">LIVE SIGNAL</span>
              <strong>CURIOUS / BUILDING</strong>
            </div>
          </div>
          <div className="hero-footer-note">
            <span className="mono-label">SCROLL</span>
            <span className="scroll-arrow" aria-hidden="true">↓</span>
          </div>
        </div>
      </section>

      <section className="kinetic-section context-section" id="about" data-reveal>
        <div className="section-grid">
          <div className="section-label"><span>01</span> {"//"} CONTEXT</div>
          <div className="section-main">
            <h2>Bridging the gap between raw capability and human intuition.</h2>
            <div className="copy-columns">
              <p>I care about the moment an abstract AI idea becomes something a person can actually use. My work starts with technical curiosity and ends with a practical question: does this make the problem easier?</p>
              <p>새로운 기술을 배우는 데서 멈추지 않고, 누군가에게 도움이 되는 형태로 구현하는 과정을 좋아합니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="kinetic-section work-section" id="work" data-reveal>
        <div className="section-rule-label"><span>02</span> {"//"} FOCUS AREAS</div>
        <div className="focus-grid">
          {focusAreas.map((area, index) => (
            <article
              className={`kinetic-card card-${index + 1}`}
              key={area.index}
              onPointerMove={handleCardPointerMove}
              onPointerLeave={resetCardPointer}
            >
              <span className="card-peel" aria-hidden="true" />
              <div className="card-topline">
                <span className="mono-label">{area.index}</span>
                <span className="card-tag">{area.label}</span>
              </div>
              <div className="card-bottomline">
                <h3>{area.title}</h3>
                <p>{area.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="kinetic-section labs-section" id="labs" data-reveal>
        <div className="section-grid">
          <div className="section-label"><span>03</span> {"//"} LABS</div>
          <div className="section-main">
            <div className="timeline-list">
              <div className="timeline-row" data-reveal>
                <span className="mono-label">CURRENT / 2026</span>
                <div><strong>Data Search Intern</strong><small>Impactive-AI · 2026.06 — 08</small></div>
              </div>
              <div className="timeline-row" data-reveal>
                <span className="mono-label">EDUCATION</span>
                <div><strong>AI Computer Engineering</strong><small>Handong Global University</small></div>
              </div>
              <div className="timeline-row" data-reveal>
                <span className="mono-label">ACTIVITY</span>
                <div><strong>T-LAB</strong><small>Technology Startup Advanced Lab</small></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="kinetic-section archive-section" id="archive" data-reveal>
        <div className="archive-grid">
          <div className="section-label"><span>04</span> {"//"} ARCHIVE</div>
          <div className="archive-content">
            <div className="archive-block" data-reveal>
              <span className="mono-label">RECOGNITION</span>
              <strong>Google AI Agent Challenge 2026</strong>
              <small>Excellence Award · 우수상</small>
            </div>
            <div className="archive-block" data-reveal>
              <span className="mono-label">PROBLEM SOLVING</span>
              <strong>Solved.ac — Gold V</strong>
              <small>A record of steady practice.</small>
            </div>
            <div className="archive-block archive-note" data-reveal>
              <span className="mono-label">MANIFESTO</span>
              <p>Design is not just how it looks and feels. It is how a technical system becomes clear enough to trust.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="connect-panel" id="connect">
        <div className="connect-panel-inner">
          <div>
            <span className="mono-label">05 // CONNECT</span>
            <h2>Let&apos;s make<br /><em>something useful.</em></h2>
          </div>
          <div className="connect-links">
            {links.map((link) => (
              <a href={link.href} key={link.label} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined}>
                <span>{link.label}</span>
                <strong>{link.value}</strong>
                <i>↗</i>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="kinetic-footer">
        <div>
          <a className="kinetic-mark footer-mark" href="#top">MK.</a>
          <p>© 2026 Myeongseong Kim. Engineered with curiosity.</p>
        </div>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
