"use client";

import { useEffect, useState } from "react";

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

export default function Home() {
  const [activeSection, setActiveSection] = useState("work");
  const [menuOpen, setMenuOpen] = useState(false);

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

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
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

      <section className="kinetic-hero" id="top">
        <div className="hero-frame">
          <div className="hero-content reveal-on-load">
            <p className="mono-label">MYEONGSEONG KIM <span>/</span> 김명성</p>
            <h1>Building useful<br />things with <em>AI.</em></h1>
            <p className="hero-intro">An AI developer exploring the space between machine learning, practical software, and better ways to solve hard problems.</p>
            <p className="hero-korean">AI 아이디어를 실제로 작동하는 소프트웨어로 만듭니다.</p>
          </div>
          <div className="hero-footer-note">
            <span className="mono-label">SCROLL</span>
            <span className="scroll-arrow" aria-hidden="true">↓</span>
          </div>
        </div>
      </section>

      <section className="kinetic-section context-section" id="about">
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

      <section className="kinetic-section work-section" id="work">
        <div className="section-rule-label"><span>02</span> {"//"} FOCUS AREAS</div>
        <div className="focus-grid">
          {focusAreas.map((area, index) => (
            <article className={`kinetic-card card-${index + 1}`} key={area.index}>
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

      <section className="kinetic-section labs-section" id="labs">
        <div className="section-grid">
          <div className="section-label"><span>03</span> {"//"} LABS</div>
          <div className="section-main">
            <div className="timeline-list">
              <div className="timeline-row">
                <span className="mono-label">CURRENT / 2026</span>
                <div><strong>Data Search Intern</strong><small>Impactive-AI · 2026.06 — 08</small></div>
              </div>
              <div className="timeline-row">
                <span className="mono-label">EDUCATION</span>
                <div><strong>AI Computer Engineering</strong><small>Handong Global University</small></div>
              </div>
              <div className="timeline-row">
                <span className="mono-label">ACTIVITY</span>
                <div><strong>T-LAB</strong><small>Technology Startup Advanced Lab</small></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="kinetic-section archive-section" id="archive">
        <div className="archive-grid">
          <div className="section-label"><span>04</span> {"//"} ARCHIVE</div>
          <div className="archive-content">
            <div className="archive-block">
              <span className="mono-label">RECOGNITION</span>
              <strong>Google AI Agent Challenge 2026</strong>
              <small>Excellence Award · 우수상</small>
            </div>
            <div className="archive-block">
              <span className="mono-label">PROBLEM SOLVING</span>
              <strong>Solved.ac — Gold V</strong>
              <small>A record of steady practice.</small>
            </div>
            <div className="archive-block archive-note">
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
