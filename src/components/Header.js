"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Trophy, Home, BarChart3, User, Zap, LogOut } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "./AuthModal";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login');
  const { language, setLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks = [
    { href: "/tournaments", label: t("nav.tournaments") },
    { href: "/leaderboard", label: t("nav.ranking") },
    { href: "/hall-of-fame", label: t("nav.hallOfFame") },
    { href: "/how-to-play", label: t("nav.howToPlay") },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  const openAuth = (tab) => {
    setAuthTab(tab);
    setAuthModalOpen(true);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-18">
            <Link href="/" className="flex items-center group">
              <Image
                src="/50points/images/race50-logo.png"
                alt="RACE50 - The Champions Tournament"
                width={180}
                height={37}
                className="h-9 w-auto object-contain"
                priority
              />
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={toggleLanguage}
                className="relative flex items-center h-7 w-[4.5rem] rounded-full bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 text-[11px] font-bold overflow-hidden"
                aria-label="Toggle language"
              >
                <span
                  className={`absolute inset-y-0.5 w-[calc(50%-2px)] rounded-full bg-gradient-to-r from-purple to-purple-light transition-all duration-200 ${
                    language === "en" ? "left-[calc(50%+1px)]" : "left-0.5"
                  }`}
                />
                <span className={`relative z-10 flex-1 text-center transition-colors duration-200 ${language === "es" ? "text-white" : "text-zinc-400"}`}>ES</span>
                <span className={`relative z-10 flex-1 text-center transition-colors duration-200 ${language === "en" ? "text-white" : "text-zinc-400"}`}>EN</span>
              </button>

              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <Link href="/profile" className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ backgroundColor: user?.avatarColor || '#7c3aed' }}
                    >
                      {user?.username?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-zinc-300 max-w-[100px] truncate">
                      {user?.username}
                    </span>
                  </Link>
                  <button
                    onClick={logout}
                    className="p-2 text-zinc-400 hover:text-red-400 transition-colors"
                    title={t('auth.logout')}
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <button onClick={() => openAuth('login')} className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                    {t("nav.login")}
                  </button>
                  <button onClick={() => openAuth('register')} className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple to-purple-light rounded-lg btn-glow">
                    {t("nav.register")}
                  </button>
                </>
              )}
            </div>

            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleLanguage}
                className="relative flex items-center h-6 w-14 rounded-full bg-white/10 border border-white/10 text-[10px] font-bold overflow-hidden"
                aria-label="Toggle language"
              >
                <span
                  className={`absolute inset-y-0.5 w-[calc(50%-2px)] rounded-full bg-gradient-to-r from-purple to-purple-light transition-all duration-200 ${
                    language === "en" ? "left-[calc(50%+1px)]" : "left-0.5"
                  }`}
                />
                <span className={`relative z-10 flex-1 text-center ${language === "es" ? "text-white" : "text-zinc-400"}`}>ES</span>
                <span className={`relative z-10 flex-1 text-center ${language === "en" ? "text-white" : "text-zinc-400"}`}>EN</span>
              </button>

              {isAuthenticated && (
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: user?.avatarColor || '#7c3aed' }}
                >
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-zinc-400 hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden glass-strong border-t border-white/5">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 mt-3 border-t border-white/5">
                {isAuthenticated ? (
                  <div className="flex items-center justify-between px-4 py-2">
                    <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                        style={{ backgroundColor: user?.avatarColor || '#7c3aed' }}
                      >
                        {user?.username?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm text-zinc-300">{user?.username}</span>
                    </Link>
                    <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-sm text-red-400">
                      {t('auth.logout')}
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <button onClick={() => { setMobileMenuOpen(false); openAuth('login'); }} className="flex-1 px-4 py-2.5 text-sm font-medium text-zinc-300 border border-white/10 rounded-lg hover:bg-white/5 transition-all text-center">
                      {t("nav.login")}
                    </button>
                    <button onClick={() => { setMobileMenuOpen(false); openAuth('register'); }} className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-purple to-purple-light rounded-lg text-center">
                      {t("nav.register")}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-white/5">
        <div className="flex items-center justify-around h-16 px-2">
          {[
            { icon: Home, label: t("nav.home"), href: "/" },
            { icon: Trophy, label: t("nav.tournaments"), href: "/tournaments" },
            { icon: BarChart3, label: t("nav.ranking"), href: "/leaderboard" },
            { icon: User, label: t("nav.profile"), href: "/profile" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 px-3 py-1.5 text-zinc-500 hover:text-purple-light transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} initialTab={authTab} />
    </>
  );
}
