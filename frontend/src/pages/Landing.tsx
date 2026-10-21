import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Gift, ScanLine, LayoutTemplate, FileDown, Menu, X, ShieldAlert, Mail, LifeBuoy, Github, Linkedin } from "lucide-react";
import GridBackground from "../layouts/Gridbackground";
import ActionPanel from "../components/ActionPanel";
import ThemeToggle from "../components/ThemeToggle";
import LanguageToggle from "../components/LanguageToggle";

const features = [
  { icon: Gift, titleKey: "feature_free_title", descKey: "feature_free_desc" },
  { icon: ScanLine, titleKey: "feature_ats_title", descKey: "feature_ats_desc" },
  { icon: LayoutTemplate, titleKey: "feature_templates_title", descKey: "feature_templates_desc" },
  { icon: FileDown, titleKey: "feature_export_title", descKey: "feature_export_desc" },
] as const;

export default function Landing() {
  const { t } = useTranslation("translation", { keyPrefix: "landing" });
  const heroContentRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hero = heroContentRef.current;
    const reveal = revealRef.current;
    if (!hero || !reveal) return;

    if (reduceMotion) {
      reveal.style.opacity = "1";
      reveal.style.transform = "none";
      return;
    }

    const clamp = (v: number) => Math.min(1, Math.max(0, v));
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const y = window.scrollY;

      const p = clamp(y / (vh * 0.85));
      hero.style.opacity = String(1 - p);
      hero.style.transform = `translate3d(0, ${y * 0.4}px, 0) scale(${1 - p * 0.05})`;

      const rect = reveal.getBoundingClientRect();
      const enter = clamp((vh - rect.top) / (vh * 0.55));
      reveal.style.opacity = String(0.25 + enter * 0.75);
      reveal.style.transform = `translate3d(0, ${(1 - enter) * 48}px, 0)`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <GridBackground>
      <div className="min-h-dvh w-full flex flex-col">
        <header
          ref={headerRef}
          className="sticky top-0 z-50 bg-(--color-brand-landing)/80 backdrop-blur-md border-b border-(--color-border-subtle)"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20 gap-4">
              <Link to="/" className="flex items-center gap-2.5 shrink-0">
                <img src="/logo.png" alt="ResumePro" className="w-9 h-9 object-contain" />
                <div className="flex items-center gap-0 tracking-tight">
                  <span
                    className="font-bold text-base sm:text-xl"
                    style={{ color: "var(--color-title-intro)" }}
                  >
                    Resume
                  </span>
                  <span className="text-green-600 font-bold text-base sm:text-xl">Pro</span>
                </div>
              </Link>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="hidden sm:block">
                  <ActionPanel />
                </div>
                <Link
                  to="/login"
                  className="hidden sm:inline-block px-4 py-2 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  {t("nav_sign_in")}
                </Link>
                <Link
                  to="/register"
                  className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-brand-primary text-white text-xs sm:text-sm font-bold shadow-lg shadow-brand-primary/20 hover:opacity-90 active:scale-[0.98] transition-all"
                >
                  {t("nav_get_started")}
                </Link>
                <button
                  type="button"
                  onClick={() => setMenuOpen((o) => !o)}
                  aria-label={t("nav_menu")}
                  aria-expanded={menuOpen}
                  className="sm:hidden p-2 rounded-xl text-slate-900 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>
            </div>
          </div>

          {menuOpen && (
            <div className="sm:hidden absolute top-full right-4 mt-2 w-64 p-2 rounded-2xl border border-(--color-border-subtle) bg-(--color-card-bg) shadow-2xl animate-menu-in flex flex-col gap-2">
              <div className="flex flex-col gap-1 p-1 rounded-xl bg-(--color-brand-landing)/70 border border-(--color-border-subtle)">
                <ThemeToggle />
                <LanguageToggle variant="panel" />
              </div>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-bold text-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-[0.98]"
              >
                {t("nav_sign_in")}
              </Link>
            </div>
          )}
        </header>

        <main className="flex-1">
          <div className="relative z-0 w-full flex items-center justify-center px-4 py-16 sm:py-24">
            <div ref={heroContentRef} className="text-center max-w-3xl mx-auto will-change-transform">
              <img
                src="/logo.png"
                alt="ResumePro"
                className="w-24 h-24 mx-auto object-contain mb-8"
              />

              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.3]">
                <span className="block" style={{ color: "var(--color-landing-title)" }}>
                  {t("hero_title_1")}
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-green-600 dark:from-slate-200 dark:to-green-500">
                  {t("hero_title_2")}
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                {t("hero_subtitle")}
              </p>

              <p className="mt-5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {t("hero_trust")}
              </p>
            </div>
          </div>

          <div className="relative z-10 bg-[var(--color-brand-surface)] border-t border-(--color-border-subtle) rounded-t-3xl shadow-[0_-30px_60px_-40px_rgba(0,0,0,0.35)]">
            <div ref={revealRef} className="will-change-[opacity,transform]">
              <section id="features" className="w-full px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-20 sm:pb-28">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2
                  className="text-3xl sm:text-4xl font-extrabold tracking-tight"
                  style={{ color: "var(--color-landing-title)" }}
                >
                  {t("features_title")}
                </h2>
                <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
                  {t("features_subtitle")}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {features.map(({ icon: Icon, titleKey, descKey }) => (
                  <div
                    key={titleKey}
                    className="rounded-3xl border border-(--color-border-subtle) bg-(--color-card-bg) p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <div className="w-11 h-11 rounded-xl bg-green-600/10 text-green-600 dark:text-green-500 flex items-center justify-center mb-4">
                      <Icon size={22} strokeWidth={2} />
                    </div>
                    <h3 className="font-bold text-lg mb-2" style={{ color: "var(--color-landing-title)" }}>
                      {t(titleKey)}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {t(descKey)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="w-full px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
            <div className="max-w-4xl mx-auto rounded-3xl border border-(--color-border-subtle) bg-(--color-card-bg) px-6 py-12 sm:px-12 text-center shadow-sm">
              <h2
                className="text-2xl sm:text-3xl font-extrabold tracking-tight"
                style={{ color: "var(--color-landing-title)" }}
              >
                {t("cta_title")}
              </h2>
              <p className="mt-3 text-base text-slate-600 dark:text-slate-400">{t("cta_subtitle")}</p>
              <Link
                to="/register"
                className="inline-block mt-7 px-7 py-3.5 rounded-xl bg-brand-primary text-white text-sm font-bold shadow-lg shadow-brand-primary/20 hover:opacity-90 active:scale-[0.98] transition-all"
              >
                {t("nav_get_started")}
              </Link>
            </div>
          </section>
            </div>
          </div>
        </main>

        <footer className="border-t border-(--color-border-subtle) bg-(--color-brand-landing)/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
            <div className="mb-10 flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-4 sm:px-5">
              <ShieldAlert
                size={20}
                className="shrink-0 mt-0.5 text-amber-600 dark:text-amber-400"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">
                  {t("data_notice_title")}
                </p>
                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {t("data_notice_body")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              <div>
                <Link to="/" className="flex items-center gap-2.5 w-fit">
                  <img src="/logo.png" alt="ResumePro" className="w-7 h-7 object-contain" />
                  <div className="flex items-center tracking-tight">
                    <span className="font-bold" style={{ color: "var(--color-title-intro)" }}>
                      Resume
                    </span>
                    <span className="text-green-600 font-bold">Pro</span>
                  </div>
                </Link>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400 max-w-xs">
                  {t("footer_tagline")}
                </p>
              </div>

              <div>
                <h3
                  className="text-sm font-bold uppercase tracking-wider mb-4"
                  style={{ color: "var(--color-landing-title)" }}
                >
                  {t("footer_contact_title")}
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="mailto:resumepro.support@gmail.com"
                      className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-500 transition-colors"
                    >
                      <Mail size={16} className="shrink-0" aria-hidden="true" />
                      resumepro.support@gmail.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/Aniketshinde26"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-500 transition-colors"
                    >
                      <Github size={16} className="shrink-0" aria-hidden="true" />
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/aniket-shinde-934038319/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-500 transition-colors"
                    >
                      <Linkedin size={16} className="shrink-0" aria-hidden="true" />
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3
                  className="text-sm font-bold uppercase tracking-wider mb-4"
                  style={{ color: "var(--color-landing-title)" }}
                >
                  {t("footer_support_title")}
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      to="/forgot-password"
                      className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-500 transition-colors"
                    >
                      <LifeBuoy size={16} className="shrink-0" aria-hidden="true" />
                      {t("footer_link_reset")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-500 transition-colors"
                    >
                      <LifeBuoy size={16} className="shrink-0" aria-hidden="true" />
                      {t("nav_sign_in")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-500 transition-colors"
                    >
                      <LifeBuoy size={16} className="shrink-0" aria-hidden="true" />
                      {t("nav_get_started")}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-(--color-border-subtle)">
              <p className="text-xs text-slate-500 dark:text-slate-500 text-center">
                {t("footer_rights")}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </GridBackground>
  );
}
