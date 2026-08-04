"use client";

import { type MouseEvent, type PointerEvent, useCallback, useEffect, useRef, useState } from "react";

type Language = "en" | "ko";

const navItems = [
  { key: "work", href: "#work" },
  { key: "timeline", href: "#timeline" },
  { key: "research", href: "#research" },
  { key: "archive", href: "#archive" },
  { key: "about", href: "#about" },
] as const;

type Project = {
  slug: string;
  index: string;
  label: string;
  title: string;
  summary: string;
  detail: string;
  role: string;
  stack: string[];
  highlights: string[];
  href: string;
  ko: {
    label: string;
    summary: string;
    detail: string;
    role: string;
    highlights: string[];
  };
};

const projects: Project[] = [
  {
    slug: "spotline",
    index: "01",
    label: "STATISTICAL MODEL / 2026",
    title: "SPOTLINE",
    summary: "Forecasting tomorrow's restaurant visitors with a leakage-aware ridge regression model.",
    detail: "A small but practical forecasting study for estimating the next day's restaurant visitors from weather, calendar, and recent demand signals.",
    role: "Model design · feature engineering · evaluation",
    stack: ["Python", "Pandas", "scikit-learn", "Jupyter"],
    highlights: ["Ridge Regression + GridSearchCV", "5-Fold Cross Validation", "Future-data leakage prevention", "MAE 5.96 · R² 0.6552"],
    href: "https://github.com/prestige-kim/SPOTLINE_statistical_analysis_model",
    ko: {
      label: "통계 모델 / 2026",
      summary: "데이터 누수를 차단한 릿지 회귀 모델로 내일의 식당 방문객 수를 예측합니다.",
      detail: "날씨, 달력, 최근 방문 수요를 바탕으로 식당의 다음 날 방문객 수를 추정하는 실용적인 예측 연구입니다.",
      role: "모델 설계 · 피처 엔지니어링 · 평가",
      highlights: ["릿지 회귀 + GridSearchCV", "5-Fold 교차 검증", "미래 데이터 누수 방지", "MAE 5.96 · R² 0.6552"],
    },
  },
  {
    slug: "ml-modeling",
    index: "02",
    label: "LEARNING SYSTEM / 2026",
    title: "ML MODELING",
    summary: "A structured modeling bootcamp built around independent problem solving.",
    detail: "A living learning system for practicing the full modeling loop: understand the data, define the prediction problem, build a baseline, evaluate, improve, and interpret.",
    role: "Curriculum architecture · modeling practice · progress tracking",
    stack: ["Python", "Jupyter", "scikit-learn", "Git"],
    highlights: ["Problem-first modeling workflow", "Automated coaching rules", "Exercise and progress tracking", "Notes that preserve reusable concepts"],
    href: "https://github.com/prestige-kim/ML_Modeling",
    ko: {
      label: "학습 시스템 / 2026",
      summary: "독립적인 문제 해결을 중심으로 설계한 구조화된 머신러닝 학습 시스템입니다.",
      detail: "데이터 이해, 예측 문제 정의, 기준 모델 구축, 평가, 개선, 해석까지 모델링의 전체 흐름을 연습하는 살아 있는 학습 저장소입니다.",
      role: "커리큘럼 구조 설계 · 모델링 실습 · 진도 기록",
      highlights: ["문제 정의 중심의 모델링 흐름", "자동화된 코칭 규칙", "Exercise와 진도 추적", "재사용 가능한 개념을 남기는 노트"],
    },
  },
];

const researchEntries = [
  {
    index: "01",
    label: "KNOWLEDGE SYSTEM / ONGOING",
    title: "ML Paper Curator & Learning Assistant",
    summary: "A research log for turning machine learning papers into reusable knowledge.",
    detail: "The project organizes paper discovery, candidate filtering, prioritization, approval, analysis, and knowledge updates into one learning workflow.",
    highlights: ["Economy Mode for limited reading time", "Batch-based paper processing", "papers / knowledge / reports / prompts", "Learning roadmap built from connected notes"],
    href: "https://github.com/prestige-kim/Analysis_of_ML_Papers",
    ko: {
      label: "지식 관리 시스템 / 진행 중",
      title: "ML 논문 큐레이터 & 학습 보조 시스템",
      summary: "머신러닝 논문을 재사용 가능한 지식으로 바꾸는 연구 기록입니다.",
      detail: "논문 발견, 후보 필터링, 우선순위화, 승인, 분석, 지식 업데이트를 하나의 학습 흐름으로 연결합니다.",
      highlights: ["제한된 읽기 시간을 위한 Economy Mode", "배치 단위 논문 처리", "papers / knowledge / reports / prompts", "연결된 노트로 만드는 학습 로드맵"],
    },
  },
];

const siteCopy = {
  en: {
    nav: { work: "Work", timeline: "Timeline", research: "Research", archive: "Archive", about: "About", connect: "Connect", main: "Main navigation" },
    hero: { signal: "LIVE SIGNAL", status: "CURIOUS / BUILDING", scroll: "SCROLL", intro: "An AI developer exploring the space between machine learning, practical software, and better ways to solve hard problems.", korean: "AI 아이디어를 실제로 작동하는 소프트웨어로 만듭니다." },
    about: { label: "CONTEXT", title: "Bridging the gap between raw capability and human intuition.", first: "I care about the moment an abstract AI idea becomes something a person can actually use. My work starts with technical curiosity and ends with a practical question: does this make the problem easier?", second: "새로운 기술을 배우는 데서 멈추지 않고, 누군가에게 도움이 되는 형태로 구현하는 과정을 좋아합니다." },
    work: { label: "SELECTED WORK", focus: "FOCUS", focusValue: "AI · ML · PRACTICAL SYSTEMS", note: "Two selected repositories, documented as working evidence rather than a list of tools.", cta: "VIEW PROJECT BRIEF ↗", aria: "Open details for" },
    timeline: { label: "TIMELINE", current: "CURRENT / 2026", intern: "Data Search Intern", education: "EDUCATION", major: "AI Computer Engineering", activity: "ACTIVITY", lab: "T-LAB", labDetail: "Technology Startup Advanced Lab", university: "Handong Global University", profileAlt: "Temporary profile image" },
    research: { label: "RESEARCH", title: "Following the signal from paper to practice.", source: "SOURCE ↗" },
    archive: { label: "ARCHIVE", recognition: "RECOGNITION", award: "Excellence Award · 우수상", problemSolving: "PROBLEM SOLVING", practice: "A record of steady practice.", manifesto: "MANIFESTO", manifestoText: "Design is not just how it looks and feels. It is how a technical system becomes clear enough to trust." },
    connect: { label: "CONNECT", title: "Let's make", emphasis: "something useful." },
    language: { label: "Language" },
    dialog: { brief: "PROJECT BRIEF", close: "Close project details", role: "ROLE", stack: "STACK", signals: "KEY SIGNALS", source: "OPEN GITHUB REPOSITORY" },
    footer: { text: "© 2026 Myeongseong Kim. Engineered with curiosity.", back: "Back to top ↑" },
  },
  ko: {
    nav: { work: "작업", timeline: "타임라인", research: "연구", archive: "아카이브", about: "소개", connect: "연결", main: "주요 메뉴" },
    hero: { signal: "현재 신호", status: "호기심 / 만드는 중", scroll: "스크롤", intro: "머신러닝과 실용적인 소프트웨어 사이를 탐구하며, 어려운 문제를 더 나은 방식으로 풀어가는 AI 개발자입니다.", korean: "AI 아이디어를 실제로 작동하는 소프트웨어로 만듭니다." },
    about: { label: "소개", title: "기술의 가능성과 사람의 직관 사이를 연결합니다.", first: "추상적인 AI 아이디어가 실제로 누군가가 사용할 수 있는 형태가 되는 순간에 관심이 있습니다. 기술적 호기심에서 시작해 ‘이것이 문제를 더 쉽게 만드는가?’라는 실용적인 질문으로 작업을 이어갑니다.", second: "새로운 기술을 배우는 데서 멈추지 않고, 누군가에게 도움이 되는 형태로 구현하는 과정을 좋아합니다." },
    work: { label: "선택한 작업", focus: "집중 영역", focusValue: "AI · ML · 실용적인 시스템", note: "도구 목록이 아니라 실제로 작업한 증거가 되도록 두 개의 리포지토리를 기록했습니다.", cta: "프로젝트 브리프 보기 ↗", aria: "상세 내용 열기" },
    timeline: { label: "타임라인", current: "현재 / 2026", intern: "데이터 검색 인턴", education: "학력", major: "AI 컴퓨터공학", activity: "활동", lab: "T-LAB", labDetail: "Technology Startup Advanced Lab", university: "한동글로벌대학교", profileAlt: "임시 프로필 이미지" },
    research: { label: "연구", title: "논문에서 실천으로 이어지는 신호를 따라갑니다.", source: "원문 ↗" },
    archive: { label: "기록", recognition: "수상", award: "Excellence Award · 우수상", problemSolving: "문제 해결", practice: "꾸준한 연습의 기록입니다.", manifesto: "매니페스토", manifestoText: "디자인은 단지 보이고 느껴지는 방식이 아닙니다. 기술 시스템을 신뢰할 수 있을 만큼 명확하게 만드는 방식입니다." },
    connect: { label: "연결", title: "유용한 것을", emphasis: "함께 만들어봐요." },
    language: { label: "Language" },
    dialog: { brief: "프로젝트 브리프", close: "프로젝트 상세 닫기", role: "역할", stack: "기술 스택", signals: "핵심 포인트", source: "GitHub 리포지토리 열기" },
    footer: { text: "© 2026 Myeongseong Kim. 호기심으로 설계합니다.", back: "맨 위로 ↑" },
  },
} as const;

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

      if (!reducedMotion && !document.hidden) frame = requestAnimationFrame(draw);
      else frame = 0;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
        return;
      }

      lastTime = performance.now();
      if (!reducedMotion && frame === 0) frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", updatePointer, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    draw(0);
    if (!reducedMotion && !document.hidden) frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", updatePointer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield-canvas" aria-hidden="true" />;
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [activeSection, setActiveSection] = useState("work");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const navigationFrameRef = useRef<number | null>(null);
  const progressBarRef = useRef<HTMLSpanElement>(null);
  const t = siteCopy[language];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

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
      if (scrollFrameRef.current !== null) return;

      scrollFrameRef.current = requestAnimationFrame(() => {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        progressBarRef.current?.style.setProperty("width", `${Math.min(100, Math.max(0, progress * 100))}%`);
        scrollFrameRef.current = null;
      });
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress, { passive: true });
    return () => {
      if (scrollFrameRef.current !== null) cancelAnimationFrame(scrollFrameRef.current);
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
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

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const scrollToSection = useCallback((id: string, updateHash = true) => {
    const target = document.getElementById(id);
    if (!target) return;

    if (navigationFrameRef.current !== null) cancelAnimationFrame(navigationFrameRef.current);

    const headerOffset = window.innerWidth <= 800 ? 74 : 80;
    const targetY = Math.max(0, window.scrollY + target.getBoundingClientRect().top - headerOffset);
    const startY = window.scrollY;
    const distance = targetY - startY;

    if (updateHash && window.location.hash !== `#${id}`) {
      window.history.pushState(null, "", `#${id}`);
    }

    if (Math.abs(distance) < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, targetY);
      navigationFrameRef.current = null;
      return;
    }

    const duration = Math.min(900, Math.max(350, Math.abs(distance) * 0.35));
    const startTime = performance.now();
    const animate = (now: number) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      window.scrollTo(0, startY + distance * eased);

      if (progress < 1) navigationFrameRef.current = requestAnimationFrame(animate);
      else navigationFrameRef.current = null;
    };

    navigationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const cancelNavigation = () => {
      if (navigationFrameRef.current !== null) {
        cancelAnimationFrame(navigationFrameRef.current);
        navigationFrameRef.current = null;
      }
    };

    const handlePopState = () => scrollToSection(window.location.hash.slice(1) || "top", false);
    window.addEventListener("wheel", cancelNavigation, { passive: true });
    window.addEventListener("touchstart", cancelNavigation, { passive: true });
    window.addEventListener("popstate", handlePopState);

    const initialHash = window.location.hash.slice(1);
    if (initialHash) requestAnimationFrame(() => scrollToSection(initialHash, false));

    return () => {
      cancelNavigation();
      window.removeEventListener("wheel", cancelNavigation);
      window.removeEventListener("touchstart", cancelNavigation);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [scrollToSection]);

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

  useEffect(() => {
    const handleProjectHistory = () => {
      const slug = window.location.hash.startsWith("#project/") ? window.location.hash.slice("#project/".length) : "";
      setSelectedProject(projects.find((project) => project.slug === slug) ?? null);
    };

    handleProjectHistory();
    window.addEventListener("popstate", handleProjectHistory);
    window.addEventListener("hashchange", handleProjectHistory);
    return () => {
      window.removeEventListener("popstate", handleProjectHistory);
      window.removeEventListener("hashchange", handleProjectHistory);
    };
  }, []);

  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        window.history.back();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

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

  const openProject = (project: Project) => {
    setSelectedProject(project);
    window.history.pushState(null, "", `#project/${project.slug}`);
  };

  const closeProject = () => {
    if (window.location.hash.startsWith("#project/")) window.history.back();
    else setSelectedProject(null);
  };

  const selectedProjectCopy = selectedProject
    ? language === "ko"
      ? { ...selectedProject, ...selectedProject.ko }
      : selectedProject
    : null;

  const handleSectionNavigation = useCallback((event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    event.preventDefault();
    closeMenu();
    scrollToSection(href.slice(1));
  }, [closeMenu, scrollToSection]);

  return (
    <main>
      <Starfield />
      <header className="kinetic-header">
        <div className="header-inner">
          <a className="kinetic-mark" href="#top" onClick={(event) => handleSectionNavigation(event, "#top")} aria-label="Myeongseong Kim home">MK.</a>
          <nav className={menuOpen ? "kinetic-nav is-open" : "kinetic-nav"} aria-label={t.nav.main}>
            {navItems.map((item) => (
              <a
                className={activeSection === item.href.slice(1) ? "is-active" : ""}
                href={item.href}
                key={item.key}
                onClick={(event) => handleSectionNavigation(event, item.href)}
                aria-current={activeSection === item.href.slice(1) ? "page" : undefined}
              >
                {t.nav[item.key]}
              </a>
            ))}
            <a
              className={activeSection === "connect" ? "mobile-connect is-active" : "mobile-connect"}
              href="#connect"
              onClick={(event) => handleSectionNavigation(event, "#connect")}
              aria-current={activeSection === "connect" ? "page" : undefined}
            >
              {t.nav.connect}
            </a>
          </nav>
          <a className="header-connect" href="#connect" onClick={(event) => handleSectionNavigation(event, "#connect")}>{t.nav.connect}</a>
          <div className="language-switcher" role="group" aria-label={t.language.label}>
            <button type="button" className={language === "en" ? "is-active" : ""} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button>
            <span aria-hidden="true">/</span>
            <button type="button" className={language === "ko" ? "is-active" : ""} onClick={() => setLanguage("ko")} aria-pressed={language === "ko"}>KR</button>
          </div>
          <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Toggle navigation">
            <span>{menuOpen ? "×" : "☰"}</span>
          </button>
        </div>
      </header>
      <div className="scroll-progress" aria-hidden="true">
        <span ref={progressBarRef} />
      </div>

      <section className="kinetic-hero" id="top">
        <div className="hero-frame">
          <div className="hero-content reveal-on-load">
            <p className="mono-label">MYEONGSEONG KIM <span>/</span> 김명성</p>
            <h1>{language === "ko" ? <>AI로 유용한<br />것을 만듭니다.</> : <>Building useful<br />things with <em>AI.</em></>}</h1>
            <p className="hero-intro">{t.hero.intro}</p>
            <p className="hero-korean">{t.hero.korean}</p>
          </div>
          <div className="hero-signal" aria-hidden="true">
            <div className="signal-orbit"><span /></div>
            <div className="signal-copy">
              <span className="mono-label">{t.hero.signal}</span>
              <strong>{t.hero.status}</strong>
            </div>
          </div>
          <div className="hero-footer-note">
            <span className="mono-label">{t.hero.scroll}</span>
            <span className="scroll-arrow" aria-hidden="true">↓</span>
          </div>
        </div>
      </section>

      <section className="kinetic-section context-section" id="about" data-reveal>
        <div className="section-grid">
          <div className="section-label"><span>01</span> {"//"} {t.about.label}</div>
          <div className="section-main">
            <h2>{t.about.title}</h2>
            <div className="copy-columns">
              <p>{t.about.first}</p>
              <p>{t.about.second}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="kinetic-section work-section" id="work" data-reveal>
        <div className="section-rule-label"><span>02</span> {"//"} {t.work.label}</div>
        <div className="project-grid">
          {projects.map((project) => {
            const projectCopy = language === "ko" ? project.ko : project;
            return (
              <button
                className="kinetic-card project-card"
                key={project.slug}
                type="button"
                onClick={() => openProject(project)}
                onPointerMove={handleCardPointerMove}
                onPointerLeave={resetCardPointer}
                aria-label={`${t.work.aria}: ${project.title}`}
              >
                <span className="card-peel" aria-hidden="true" />
                <div className="card-topline">
                  <span className="mono-label">{project.index}</span>
                  <span className="card-tag">{projectCopy.label}</span>
                </div>
                <div className="card-bottomline">
                  <h3>{project.title}</h3>
                  <p>{projectCopy.summary}</p>
                  <span className="project-card-cta">{t.work.cta}</span>
                </div>
              </button>
            );
          })}
        </div>
        <div className="work-signal">
          <span className="mono-label"><span>{t.work.focus}</span> / {t.work.focusValue}</span>
          <p>{t.work.note}</p>
        </div>
      </section>

      <section className="kinetic-section timeline-section" id="timeline" data-reveal>
        <div className="section-grid">
          <div className="timeline-sidebar">
            <div className="section-label"><span>03</span> {"//"} {t.timeline.label}</div>
            <figure className="timeline-portrait" data-reveal>
              <div className="portrait-frame">
                {/* GitHub Pages serves this static asset directly. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/profile/temporary-profile.jpg" alt={t.timeline.profileAlt} />
              </div>
            </figure>
          </div>
          <div className="section-main">
            <div className="timeline-list">
              <div className="timeline-row" data-reveal>
                <span className="mono-label">{t.timeline.current}</span>
                <div><strong>{t.timeline.intern}</strong><small>Impactive-AI · 2026.06 — 08</small></div>
              </div>
              <div className="timeline-row" data-reveal>
                <span className="mono-label">{t.timeline.education}</span>
                <div><strong>{t.timeline.major}</strong><small>{t.timeline.university}</small></div>
              </div>
              <div className="timeline-row" data-reveal>
                <span className="mono-label">{t.timeline.activity}</span>
                <div><strong>{t.timeline.lab}</strong><small>{t.timeline.labDetail}</small></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="kinetic-section research-section" id="research" data-reveal>
        <div className="section-grid">
          <div className="section-label"><span>04</span> {"//"} {t.research.label}</div>
          <div className="section-main">
            <h2>{t.research.title}</h2>
            <div className="research-list">
              {researchEntries.map((entry) => {
                const entryCopy = language === "ko" ? entry.ko : entry;
                return (
                <article className="research-entry" key={entry.title}>
                  <div className="research-entry-topline">
                    <span className="mono-label">{entry.index} / {entryCopy.label}</span>
                    <a href={entry.href} target="_blank" rel="noreferrer">{t.research.source}</a>
                  </div>
                  <h3>{entryCopy.title}</h3>
                  <p>{entryCopy.summary}</p>
                  <p className="research-detail">{entryCopy.detail}</p>
                  <ul>
                    {entryCopy.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="kinetic-section archive-section" id="archive" data-reveal>
        <div className="archive-grid">
          <div className="section-label"><span>05</span> {"//"} {t.archive.label}</div>
          <div className="archive-content">
            <div className="archive-block" data-reveal>
              <span className="mono-label">{t.archive.recognition}</span>
              <strong>Google AI Agent Challenge 2026</strong>
              <small>{t.archive.award}</small>
            </div>
            <div className="archive-block" data-reveal>
              <span className="mono-label">{t.archive.problemSolving}</span>
              <strong>Solved.ac — Gold V</strong>
              <small>{t.archive.practice}</small>
            </div>
            <div className="archive-block archive-note" data-reveal>
              <span className="mono-label">{t.archive.manifesto}</span>
              <p>{t.archive.manifestoText}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="connect-panel" id="connect">
        <div className="connect-panel-inner">
          <div>
            <span className="mono-label">06 {"//"} {t.connect.label}</span>
            <h2>{t.connect.title}<br /><em>{t.connect.emphasis}</em></h2>
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

      {selectedProject && (
        <div className="project-dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeProject(); }}>
          <section className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title">
            <div className="project-dialog-header">
              <span className="mono-label"><span>{selectedProject.index}</span> {"//"} {t.dialog.brief}</span>
              <button type="button" className="project-dialog-close" onClick={closeProject} aria-label={t.dialog.close}>×</button>
            </div>
            <div className="project-dialog-body">
              <span className="mono-label">{selectedProjectCopy?.label}</span>
              <h2 id="project-dialog-title">{selectedProjectCopy?.title}</h2>
              <p className="project-dialog-lede">{selectedProjectCopy?.detail}</p>
              <div className="project-dialog-meta">
                <div>
                  <span className="mono-label">{t.dialog.role}</span>
                  <strong>{selectedProjectCopy?.role}</strong>
                </div>
                <div>
                  <span className="mono-label">{t.dialog.stack}</span>
                  <strong>{selectedProject.stack.join(" · ")}</strong>
                </div>
              </div>
              <div className="project-dialog-highlights">
                <span className="mono-label">{t.dialog.signals}</span>
                <ul>
                  {selectedProjectCopy?.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              </div>
              <a className="project-dialog-source" href={selectedProject.href} target="_blank" rel="noreferrer">
                {t.dialog.source} <span>↗</span>
              </a>
            </div>
          </section>
        </div>
      )}

      <footer className="kinetic-footer">
        <div>
          <a className="kinetic-mark footer-mark" href="#top" onClick={(event) => handleSectionNavigation(event, "#top")}>MK.</a>
          <p>{t.footer.text}</p>
        </div>
        <a href="#top" onClick={(event) => handleSectionNavigation(event, "#top")}>{t.footer.back}</a>
      </footer>
    </main>
  );
}
