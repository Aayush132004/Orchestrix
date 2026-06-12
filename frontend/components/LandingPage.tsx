"use client"
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    let scroll: any = null;
    let gsapCtx: any = null;
    let observer: IntersectionObserver | null = null;

    const init = async () => {
      const { default: LocomotiveScroll } = await import("locomotive-scroll");
      const gsap = (await import("gsap")).default;
      
      if (!isMounted) return;

      scroll = new LocomotiveScroll();

      gsapCtx = gsap.context(() => {
        // Hero animations run immediately on load
        gsap.from(".hero-title-word", {
          y: 70,
          opacity: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: "power4.out",
          delay: 0.2,
        });
        gsap.from(".hero-tagline", {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.5,
        });
        gsap.from(".hero-subtitle", {
          y: 25,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.75,
        });
        gsap.from(".hero-cta", {
          y: 18,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: 1,
        });
        gsap.from(".hero-brand-block", {
          y: 30,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: 1.1,
        });

        // Set initial states for elements that animate on scroll
        gsap.set(".flow-node", { y: 40, opacity: 0 });
        gsap.set(".feature-card", { y: 50, opacity: 0 });
        gsap.set(".stat-item", { scale: 0.85, opacity: 0 });
        gsap.set(".cta-section > *", { y: 40, opacity: 0 });
      });

      // Intersection Observer for viewport triggers
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target;
            if (target.classList.contains('flow-section')) {
              gsap.to(target.querySelectorAll('.flow-node'), {
                y: 0,
                opacity: 1,
                stagger: 0.15,
                duration: 0.8,
                ease: "power3.out",
              });
            } else if (target.classList.contains('features-section')) {
              gsap.to(target.querySelectorAll('.feature-card'), {
                y: 0,
                opacity: 1,
                stagger: 0.08,
                duration: 0.7,
                ease: "power3.out",
              });
            } else if (target.classList.contains('stats-section')) {
              gsap.to(target.querySelectorAll('.stat-item'), {
                scale: 1,
                opacity: 1,
                stagger: 0.1,
                duration: 0.6,
                ease: "back.out(1.4)",
              });
            } else if (target.classList.contains('cta-section')) {
              gsap.to(target.querySelectorAll('.cta-section > *'), {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.8,
                ease: "power3.out",
              });
            }
            observer?.unobserve(target);
          }
        });
      }, { threshold: 0.15 });

      const sections = document.querySelectorAll('.flow-section, .features-section, .stats-section, .cta-section');
      sections.forEach(s => observer?.observe(s));
    };

    init();
    return () => {
      isMounted = false;
      gsapCtx?.revert();
      scroll?.destroy();
      observer?.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} data-scroll-container className="relative bg-[#0a0f0a]">

      {/* ─────────── HERO ─────────── */}
      <section
        data-scroll-section
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-20"
      >
        {/* Glow orbs */}
        <div className="pointer-events-none absolute w-[700px] h-[700px] rounded-full bg-[#a3e635] opacity-[0.05] blur-3xl top-[-200px] left-1/2 -translate-x-1/2" />
        <div className="pointer-events-none absolute w-[400px] h-[400px] rounded-full bg-[#65a30d] opacity-[0.04] blur-3xl bottom-0 right-[-100px]" />

        {/* Badge */}
        <div data-scroll data-scroll-speed="0.4" className="mb-5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(163,230,53,0.25)] bg-[rgba(163,230,53,0.05)] text-[#a3e635] text-[11px] font-bold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] animate-pulse" />
            Webhook Automation Platform
          </span>
        </div>

        {/* Cursive calligraphic tagline — Dancing Script bold */}
        <p className="hero-tagline mb-3" style={{fontFamily: 'var(--font-script)', fontSize: '1.6rem', color: '#a3e635', fontWeight: 700, letterSpacing: '0.01em', opacity: 0.9}}>
          Build. Automate. Orchestrate.
        </p>

        {/* Main Headline — slimmer weight */}
        <h1 className="text-center max-w-4xl leading-[1.1]">
          <div className="overflow-hidden mb-1">
            <span className="hero-title-word inline-block text-5xl md:text-7xl font-bold text-white tracking-tight">
              Powerful
            </span>
          </div>
          <div className="overflow-hidden mb-1">
            <span className="hero-title-word inline-block text-5xl md:text-7xl font-bold tracking-tight">
              <span className="text-lime-gradient font-display italic">Automations,</span>
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="hero-title-word inline-block text-5xl md:text-7xl font-bold text-white tracking-tight">
              Zero Complexity
            </span>
          </div>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle mt-7 text-base md:text-lg text-[#6b8c6b] max-w-xl text-center leading-relaxed font-normal">
          Connect webhooks, build sequential multi-step zaps, and let powerful automations run your operations 24/7 — with AI at every step.
        </p>

        {/* CTAs */}
        <div className="hero-cta mt-9 flex items-center gap-4 flex-wrap justify-center">
          <button
            onClick={() => router.push("/signup")}
            className="btn-lime px-7 py-3.5 text-sm font-bold rounded-xl"
          >
            Start Building Free →
          </button>
          <button
            onClick={() => router.push("/login")}
            className="px-7 py-3.5 text-sm font-semibold rounded-xl border border-[rgba(163,230,53,0.2)] text-[#a3e635] hover:bg-[rgba(163,230,53,0.06)] transition-all duration-300"
          >
            Sign In
          </button>
        </div>

        {/* Big Brand Block */}
        <div className="hero-brand-block mt-14 w-full max-w-2xl mx-auto">
          <div className="relative rounded-2xl border border-[rgba(163,230,53,0.1)] bg-[rgba(163,230,53,0.02)] overflow-hidden px-8 py-8 flex items-center justify-center">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[rgba(163,230,53,0.03)] via-transparent to-transparent" />
            <div className="flex items-center gap-5 relative z-10">
              <img
                src="/logo.png"
                alt="Orchestrix"
                className="w-14 h-14 object-contain rounded-xl drop-shadow-[0_0_20px_rgba(100,150,255,0.4)]"
              />
              <div className="flex flex-col">
                <span className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-none">Orchestrix</span>
                <span style={{fontFamily: 'var(--font-script)', fontSize: '1.1rem', color: '#a3e635', fontWeight: 600, letterSpacing: '0.02em', marginTop: '6px', opacity: 0.85}}>
                  where automation meets intelligence
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── HOW IT WORKS ─────────── */}
      <section
        data-scroll-section
        className="flow-section relative py-24 px-6 flex flex-col items-center"
      >
        <div className="max-w-5xl w-full mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#a3e635] text-[11px] font-bold uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Build a zap in{" "}
              <span style={{fontFamily: 'var(--font-script)', fontSize: '2.4rem', color: '#a3e635', fontWeight: 700}}>minutes</span>
            </h2>
            <p className="mt-4 text-[#4a6a4a] text-sm max-w-lg mx-auto font-normal">
              Chain steps sequentially — each zap starts with a webhook trigger and flows through your chosen actions automatically.
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 max-w-sm mx-auto">
            <div className="flow-node w-full bg-[#111711] border border-[rgba(163,230,53,0.2)] rounded-2xl p-4 flex items-center gap-4 shadow-[0_0_40px_rgba(163,230,53,0.05)]">
              <div className="w-10 h-10 rounded-xl bg-[rgba(163,230,53,0.12)] border border-[rgba(163,230,53,0.25)] flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="#a3e635" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
              </div>
              <div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-[#a3e635]">Step 1 — Trigger</div>
                <div className="text-sm font-semibold text-white">Webhook Received</div>
              </div>
            </div>
            <div className="h-7 w-[2px] bg-gradient-to-b from-[#a3e635] to-[rgba(163,230,53,0.15)]" />
            <div className="flow-node w-full bg-[#111711] border border-[rgba(163,230,53,0.1)] rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[rgba(163,230,53,0.05)] border border-[rgba(163,230,53,0.12)] flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="#84cc16" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-[#6b8c6b]">Step 2 — Action</div>
                <div className="text-sm font-semibold text-white">AI Processes Data</div>
              </div>
            </div>
            <div className="h-7 w-[2px] bg-gradient-to-b from-[rgba(163,230,53,0.15)] to-[rgba(163,230,53,0.04)]" />
            <div className="flow-node w-full bg-[#111711] border border-[rgba(163,230,53,0.06)] rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[rgba(163,230,53,0.03)] border border-[rgba(163,230,53,0.08)] flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="#65a30d" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-[#4a6a4a]">Step 3 — Deliver</div>
                <div className="text-sm font-semibold text-white">Email Sent</div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-[#4a6a4a] font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-[#a3e635] animate-pulse" />
              Runs automatically, every time
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── FEATURES ─────────── */}
      <section data-scroll-section className="features-section relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#a3e635] text-[11px] font-bold uppercase tracking-widest mb-3">Platform Features</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Everything you need to <span className="text-lime-gradient font-display italic">automate</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>,
                title: "Webhook Triggers",
                desc: "Every zap starts with a webhook. Hit the URL and your automation fires instantly.",
              },
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>,
                title: "Sequential Zaps",
                desc: "Chain unlimited steps in order — each action receives the output of the previous one.",
              },
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>,
                title: "AI-Powered Steps",
                desc: "Plug in an AI block to transform, summarize, classify, or generate content mid-flow.",
              },
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>,
                title: "Email Actions",
                desc: "Send rich notification emails as a step output — with dynamic data from earlier steps.",
              },
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" /></svg>,
                title: "Live Run History",
                desc: "Every execution is logged. Inspect trigger payloads and step outputs in real time.",
              },
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                title: "Free Forever",
                desc: "Core webhook zaps are free. No time limits, no credit card required.",
              },
            ].map((f, i) => (
              <div key={i} className="feature-card card-dark feature-card-glow p-6 transition-colors duration-300">
                <div className="w-10 h-10 rounded-xl bg-[rgba(163,230,53,0.07)] border border-[rgba(163,230,53,0.12)] flex items-center justify-center text-[#a3e635] mb-4">
                  {f.icon}
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-[#4a6a4a] leading-relaxed font-normal">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── STATS ─────────── */}
      <section data-scroll-section className="stats-section py-16 px-6 border-y border-[rgba(163,230,53,0.07)]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "No limits", label: "Create as many zaps as you want" },
            { value: "Multi-step", label: "Chain actions sequentially" },
            { value: "Free", label: "Core tier — forever" },
            { value: "Always on", label: "Background execution, 24/7" },
          ].map((s, i) => (
            <div key={i} className="stat-item">
              <div className="text-xl md:text-2xl font-bold text-lime-gradient mb-1">{s.value}</div>
              <div className="text-[11px] font-medium text-[#4a6a4a] uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────── CTA ─────────── */}
      <section data-scroll-section className="cta-section py-28 px-6 flex flex-col items-center text-center">
        <div className="relative max-w-2xl mx-auto">
          <div className="pointer-events-none absolute w-[500px] h-[500px] rounded-full bg-[#a3e635] opacity-[0.05] blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <p className="text-[#a3e635] text-[11px] font-bold uppercase tracking-widest mb-4 relative">Get Started</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight relative">
            Automate your work with{" "}
            <span className="text-lime-gradient font-display italic">Orchestrix</span> today.
          </h2>
          {/* Script font accent sub-quote */}
          <p style={{fontFamily: 'var(--font-script)', fontSize: '1.5rem', color: '#6b8c6b', fontWeight: 600, marginTop: '12px', opacity: 0.7}} className="relative">
            — because your time is worth more.
          </p>
          <p className="mt-4 text-[#4a6a4a] text-sm font-normal max-w-md mx-auto relative leading-relaxed">
            Build your first webhook-powered zap in minutes. Free forever, no credit card required.
          </p>
          <div className="mt-8 flex items-center gap-4 justify-center flex-wrap relative">
            <button
              onClick={() => router.push("/signup")}
              className="btn-lime px-7 py-3.5 text-sm font-bold rounded-xl"
            >
              Start for Free →
            </button>
            <button
              onClick={() => router.push("/login")}
              className="px-7 py-3.5 text-sm font-semibold rounded-xl border border-[rgba(163,230,53,0.2)] text-[#a3e635] hover:bg-[rgba(163,230,53,0.06)] transition-all duration-300"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* ─────────── FOOTER ─────────── */}
      <footer data-scroll-section className="border-t border-[rgba(163,230,53,0.07)] py-7 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1 flex items-center justify-center gap-1.5 text-sm text-[#4a6a4a] font-medium">
            Made with ❤️ in India 🇮🇳
          </div>
          <ContactPopup />
        </div>
      </footer>

    </div>
  );
}

function useContactState() {
  return useState(false);
}

function ContactPopup() {
  const [open, setOpen] = useContactState();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o: boolean) => !o)}
        className="text-sm text-[#4a6a4a] hover:text-[#a3e635] transition-colors font-medium"
      >
        Contact Me
      </button>
      {open && (
        <div className="absolute bottom-9 right-0 z-50 bg-[#111711] border border-[rgba(163,230,53,0.2)] rounded-2xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.6)] w-64 animate-scale-in">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#a3e635] mb-2">Get in touch</div>
          <p className="text-xs text-[#6b8c6b] mb-3 leading-relaxed">Have questions or feedback? Reach out directly:</p>
          <a
            href="mailto:aayushsharma0132004@gmail.com"
            className="flex items-center gap-2 text-xs font-semibold text-white hover:text-[#a3e635] transition-colors break-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#a3e635" className="w-4 h-4 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            aayushsharma0132004@gmail.com
          </a>
          <button
            onClick={() => setOpen(false)}
            className="mt-3 text-[10px] text-[#4a6a4a] hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
