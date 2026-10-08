import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import GridBackground from "../layouts/Gridbackground";
import ActionPanel from "../components/ActionPanel";

export default function Landing() {
  const { t } = useTranslation("translation", { keyPrefix: "landing" });

  return (
    <GridBackground>
      <div className="min-h-screen w-full flex flex-col">
        <header className="sticky top-0 z-50 bg-(--color-brand-landing)/80 backdrop-blur-md border-b border-(--color-border-subtle)">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20 gap-4">
              <Link to="/" className="flex items-center gap-2.5 shrink-0">
                <img src="/logo.png" alt="ResumePro" className="w-9 h-9 object-contain" />
                <div className="flex items-center gap-0 tracking-tight">
                  <span className="font-bold text-xl" style={{ color: "var(--color-title-intro)" }}>
                    Resume
                  </span>
                  <span className="text-green-600 font-bold text-xl">Pro</span>
                </div>
              </Link>

              <div className="flex items-center gap-3">
                <ActionPanel />
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  {t("nav_sign_in")}
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-xl bg-brand-primary text-white text-sm font-bold shadow-lg shadow-brand-primary/20 hover:opacity-90 active:scale-[0.98] transition-all"
                >
                  {t("nav_get_started")}
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 w-full flex items-center justify-center px-4 py-20">
          <div className="text-center">
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
          </div>
        </div>
      </div>
    </GridBackground>
  );
}
