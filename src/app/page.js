"use client";

import Link from "next/link";
import { Target, Trophy, TrendingUp, Users, Radio, Zap, Clock, ChevronRight, ArrowRight, Crown, UserPlus, LogIn } from "lucide-react";
import AnimateInView from "@/components/AnimateInView";
import { tournaments, topPlayers, howItWorks } from "@/lib/mockData";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function CrownLogo({ className = "" }) {
  return (
    <svg viewBox="0 0 120 60" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M60 5L75 25L95 8L85 40H35L25 8L45 25L60 5Z" fill="url(#crownGrad)" stroke="url(#crownStroke)" strokeWidth="1.5"/>
      <path d="M35 40H85V45C85 47 83 49 81 49H39C37 49 35 47 35 45V40Z" fill="url(#crownGrad)" stroke="url(#crownStroke)" strokeWidth="1"/>
      <circle cx="42" cy="35" r="3" fill="#fbbf24"/>
      <circle cx="60" cy="30" r="4" fill="#fbbf24"/>
      <circle cx="78" cy="35" r="3" fill="#fbbf24"/>
      <defs>
        <linearGradient id="crownGrad" x1="25" y1="5" x2="95" y2="49">
          <stop offset="0%" stopColor="#f59e0b"/>
          <stop offset="50%" stopColor="#fbbf24"/>
          <stop offset="100%" stopColor="#d97706"/>
        </linearGradient>
        <linearGradient id="crownStroke" x1="25" y1="5" x2="95" y2="49">
          <stop offset="0%" stopColor="#fcd34d"/>
          <stop offset="100%" stopColor="#b45309"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function HorseSilhouette({ className = "" }) {
  return (
    <svg viewBox="0 0 200 180" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M180 45c-3-8-12-15-20-12-4 1-6 5-9 7-5 3-11 2-17 2-3-8-4-17-10-23-4-4-10-6-15-9-6-3-11-7-18-8-5 0-9 2-13 5-3 2-6 5-10 5-5 0-9-4-14-5-6-1-11 2-15 6-5 5-8 12-10 19-3 9-4 19-3 28 1 6 3 12 3 18 0 7-3 14-3 21 0 5 1 10 3 14l2 8c0 4-2 7-3 11-2 5-2 10 0 15 1 3 4 6 8 6 3 0 5-2 6-4 2-4 2-9 1-13l3-12c3-5 6-10 8-16 1 9 5 18 10 25 3 4 5 9 6 14 1 6 1 12 3 17 1 4 4 7 8 7 3 0 6-2 7-5 1-4 0-9-1-13l-4-14c0-4 1-9 3-13 3-6 8-11 13-15 6-5 13-9 20-12 6-3 13-5 19-9 5-4 9-9 12-15 4-9 5-19 3-28-1-5-3-10-4-15-2-4-3-9-3-14 3-3 7-5 9-9 3-5 3-11 1-16z" />
    </svg>
  );
}

function StatIcon({ name, className }) {
  const icons = { users: Users, radio: Radio, zap: Zap, clock: Clock };
  const Icon = icons[name] || Zap;
  return <Icon className={className} />;
}

function getRankStyle(rank) {
  switch (rank) {
    case 1: return "bg-gradient-to-br from-yellow-400 to-amber-600 text-black shadow-lg shadow-amber-500/20";
    case 2: return "bg-gradient-to-br from-zinc-300 to-zinc-500 text-black";
    case 3: return "bg-gradient-to-br from-amber-600 to-amber-800 text-white";
    default: return "bg-white/5 text-zinc-400";
  }
}

function StepIcon({ name, className }) {
  const icons = { target: Target, trophy: Trophy, "trending-up": TrendingUp };
  const Icon = icons[name] || Target;
  return <Icon className={className} />;
}

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="relative overflow-hidden">
      {/* ─── MY 50 POINTS HERO ─── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#050508]" />

        {/* Neon glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.4) 0%, rgba(6,182,212,0.2) 40%, transparent 70%)" }} />
        <div className="absolute top-1/4 right-0 w-[300px] h-[400px] opacity-15"
          style={{ background: "radial-gradient(ellipse, rgba(239,68,68,0.5) 0%, transparent 70%)" }} />
        <div className="absolute bottom-1/4 left-0 w-[300px] h-[400px] opacity-15"
          style={{ background: "radial-gradient(ellipse, rgba(6,182,212,0.5) 0%, transparent 70%)" }} />

        {/* Horse racing background image */}
        <div className="absolute inset-0">
          <img src="/50points/images/hero-desktop.jpg" alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/80 to-[#050508]/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/70 via-transparent to-[#050508]/70" />
        </div>

        {/* Animated gradient orb */}
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-48 h-48 sm:w-64 sm:h-64 rounded-full animate-float opacity-60"
          style={{
            background: "conic-gradient(from 0deg, #7c3aed, #ef4444, #f59e0b, #10b981, #06b6d4, #7c3aed)",
            filter: "blur(40px)",
          }} />

        <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-lg mx-auto">
          {/* Crown + TOURNAMENT */}
          <AnimateInView delay={0.1}>
            <div className="flex flex-col items-center mb-6">
              <CrownLogo className="w-16 h-10 sm:w-20 sm:h-12 mb-2" />
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.3em] text-zinc-400 uppercase">
                {t("hero.tournament")}
              </span>
            </div>
          </AnimateInView>

          {/* MY 50 POINTS */}
          <AnimateInView delay={0.2}>
            <div className="mb-2">
              <p className="text-sm sm:text-base text-zinc-500 font-medium tracking-wide mb-1">MY</p>
              <h1 className="text-[100px] sm:text-[130px] lg:text-[160px] font-black leading-[0.8] tracking-tighter">
                <span className="text-gradient-purple-cyan">50</span>
              </h1>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight -mt-1">
                POINTS
              </h2>
            </div>
          </AnimateInView>

          {/* Tagline */}
          <AnimateInView delay={0.3}>
            <p className="text-sm sm:text-base text-zinc-500 italic mb-8 sm:mb-10">
              {t("hero.tagline")}
            </p>
          </AnimateInView>

          {/* REGISTER / ENTER buttons */}
          <AnimateInView delay={0.4}>
            <div className="flex items-center gap-3 sm:gap-4 w-full max-w-sm mx-auto mb-10 sm:mb-14">
              <Link href="/register" className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-purple to-purple-light text-white font-bold text-sm btn-glow animate-glow-pulse">
                <UserPlus className="w-4 h-4" />
                {t("hero.register")}
              </Link>
              <Link href="/tournaments" className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-white/15 text-white font-bold text-sm hover:bg-white/5 hover:border-purple/30 transition-all">
                <LogIn className="w-4 h-4" />
                {t("hero.enter")}
              </Link>
            </div>
          </AnimateInView>

          {/* Bottom stats */}
          <AnimateInView delay={0.5}>
            <div className="flex items-center justify-center gap-6 sm:gap-10">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-1.5">
                  <img src="/50points/images/icons/icon-flag.png" alt="" className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
                </div>
                <span className="text-lg sm:text-xl font-black text-white">7</span>
                <span className="text-[10px] sm:text-xs text-zinc-600 font-medium uppercase tracking-wider">
                  {t("hero.activeTournaments")}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-1.5">
                  <img src="/50points/images/icons/icon-fire.png" alt="" className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
                </div>
                <span className="text-lg sm:text-xl font-black text-white">50</span>
                <span className="text-[10px] sm:text-xs text-zinc-600 font-medium uppercase tracking-wider">
                  {t("hero.totalPoints")}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-1.5">
                  <img src="/50points/images/icons/icon-horse.png" alt="" className="w-7 h-7 sm:w-8 sm:h-8 object-contain" />
                </div>
                <span className="text-[10px] sm:text-xs text-zinc-600 font-medium uppercase tracking-wider">
                  {t("hero.yourRank")}
                </span>
              </div>
            </div>
          </AnimateInView>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-dark to-transparent" />
      </section>

      {/* ─── LIVE TOURNAMENTS ─── */}
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0">
          <img src="/50points/images/hero-lobby.jpg" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/85 to-brand-dark" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <AnimateInView>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan animate-pulse-live" />
              <span className="text-xs font-semibold text-cyan uppercase tracking-widest">
                {t("tournamentsSection.liveLabel")}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3">
              {t("tournamentsSection.title")}
            </h2>
            <p className="text-zinc-500 text-sm sm:text-base mb-10 sm:mb-14 max-w-lg">
              {t("tournamentsSection.description")}
            </p>
          </AnimateInView>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {tournaments.map((tournament, i) => (
              <AnimateInView key={tournament.id} delay={i * 0.15}>
                <Link href="/tournaments" className="block glass-card rounded-2xl overflow-hidden group hover:glow-purple transition-all duration-500 gradient-border">
                  <div className="relative h-32 overflow-hidden">
                    <img src="/50points/images/live-feed.jpg" alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-brand-card/50 to-transparent" />
                  </div>
                  <div className="px-5 sm:px-6 pt-4 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-light transition-colors">
                          {tournament.trackName}
                        </h3>
                        <p className="text-xs text-zinc-500 mt-0.5">{tournament.location}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ${
                        tournament.status === "LIVE"
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}>
                        {tournament.status === "LIVE" && <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-live" />}
                        {tournament.status === "LIVE" ? t("tournamentsSection.live") : t("tournamentsSection.upcoming")}
                      </span>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-zinc-400">
                          {t("tournamentsPage.race")} {tournament.currentRace} {t("tournamentsSection.raceOf")} {tournament.totalRaces}
                        </span>
                        <span className="text-zinc-500">
                          {tournament.status === "LIVE"
                            ? `${t("tournamentsSection.next")}: ${tournament.nextRace}`
                            : `${t("tournamentsSection.starts")}: ${tournament.startTime}`}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple to-cyan rounded-full transition-all duration-500"
                          style={{ width: `${(tournament.currentRace / tournament.totalRaces) * 100}%` }} />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-zinc-500 mb-5">
                      <div className="flex items-center gap-1.5">
                        <img src="/50points/images/icons/icon-players.png" alt="" className="w-4 h-4 object-contain" />
                        <span>{tournament.players.toLocaleString()} {t("tournamentsSection.players")}</span>
                      </div>
                    </div>

                    <div className="w-full py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-purple to-purple-light rounded-xl btn-glow opacity-90 group-hover:opacity-100 transition-opacity text-center">
                      {t("tournamentsSection.enterTournament")}
                    </div>
                  </div>
                </Link>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-brand-dark" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <AnimateInView>
            <div className="text-center mb-12 sm:mb-16">
              <span className="text-xs font-semibold text-purple-light uppercase tracking-widest mb-3 block">
                {t("howItWorksSection.label")}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
                {t("howItWorksSection.title")}
              </h2>
              <p className="text-zinc-500 text-sm sm:text-base max-w-lg mx-auto">
                {t("howItWorksSection.description")}
              </p>
            </div>
          </AnimateInView>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            {howItWorks.map((step, i) => (
              <AnimateInView key={step.step} delay={i * 0.15}>
                <div className="relative glass-card rounded-2xl p-6 sm:p-8 group hover:glow-purple transition-all duration-500 h-full">
                  <div className="absolute -top-3 -left-1 sm:-top-4 sm:-left-2">
                    <span className="text-6xl sm:text-7xl font-black text-white/[0.03] select-none">{step.step}</span>
                  </div>
                  <div className="relative mb-5 sm:mb-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-purple/20 to-purple/5 border border-purple/10 flex items-center justify-center group-hover:border-purple/30 transition-colors duration-300">
                      <StepIcon name={step.icon} className="w-6 h-6 sm:w-7 sm:h-7 text-purple-light" />
                    </div>
                  </div>
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-purple-light/60 uppercase tracking-wider">
                        {t("howItWorksSection.step")} {step.step}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 group-hover:text-purple-light transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </AnimateInView>
            ))}
          </div>

          <AnimateInView delay={0.3}>
            <div className="mt-12 sm:mt-16 glass-card rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-6 text-center">
                {t("howItWorksSection.chooseStrategy")}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name: t("strategies.fullPoint"), points: t("strategies.fullPointsLabel"), risk: t("strategies.highRisk"), riskColor: "text-red-400", description: t("strategies.fullDesc"), gradient: "from-red-500/10 to-transparent", border: "border-red-500/10 hover:border-red-500/30" },
                  { name: t("strategies.dualPoint"), points: t("strategies.dualPointsLabel"), risk: t("strategies.medRisk"), riskColor: "text-amber-400", description: t("strategies.dualDesc"), gradient: "from-amber-500/10 to-transparent", border: "border-amber-500/10 hover:border-amber-500/30" },
                  { name: t("strategies.smartPick"), points: t("strategies.smartPointsLabel"), risk: t("strategies.lowRisk"), riskColor: "text-green-400", description: t("strategies.smartDesc"), gradient: "from-green-500/10 to-transparent", border: "border-green-500/10 hover:border-green-500/30" },
                ].map((strat, i) => (
                  <div key={i} className={`rounded-xl p-5 bg-gradient-to-b ${strat.gradient} border ${strat.border} transition-all duration-300`}>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-white">{strat.name}</h4>
                      <span className={`text-[11px] font-semibold ${strat.riskColor}`}>{strat.risk}</span>
                    </div>
                    <p className="text-2xl font-black text-white/90 mb-2">{strat.points}</p>
                    <p className="text-xs text-zinc-500">{strat.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateInView>
        </div>
      </section>

      {/* ─── TOP PLAYERS ─── */}
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-card/20 to-brand-dark" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <AnimateInView>
            <div className="text-center mb-10 sm:mb-14">
              <span className="text-xs font-semibold text-gold uppercase tracking-widest mb-3 block">
                {t("topPlayers.label")}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
                {t("topPlayers.title")}
              </h2>
              <p className="text-zinc-500 text-sm sm:text-base max-w-md mx-auto">
                {t("topPlayers.subtitle")}
              </p>
            </div>
          </AnimateInView>

          <AnimateInView delay={0.1}>
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="px-4 sm:px-6 py-3 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider w-full">
                  <span className="w-10 text-center">{t("topPlayers.rank")}</span>
                  <span className="flex-1">{t("topPlayers.player")}</span>
                  <span className="w-20 text-right hidden sm:block">{t("topPlayers.winRate")}</span>
                  <span className="w-20 text-right hidden sm:block">{t("topPlayers.streak")}</span>
                  <span className="w-24 text-right">{t("topPlayers.points")}</span>
                </div>
              </div>

              {topPlayers.map((player, i) => (
                <AnimateInView key={player.rank} delay={0.1 + i * 0.08}>
                  <div className={`px-4 sm:px-6 py-3.5 flex items-center gap-4 transition-all duration-200 hover:bg-white/[0.02] ${
                    i < topPlayers.length - 1 ? "border-b border-white/[0.03]" : ""
                  } ${player.rank === 1 ? "bg-gradient-to-r from-amber-500/[0.04] to-transparent" : ""}`}>
                    <div className="w-10 flex justify-center">
                      <span className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold ${getRankStyle(player.rank)}`}>
                        {player.rank}
                      </span>
                    </div>
                    <div className="flex-1 flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-white shrink-0"
                        style={{ backgroundColor: player.avatarColor + "33", color: player.avatarColor }}>
                        {player.avatar}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{player.username}</p>
                        <p className="text-[11px] text-zinc-600 sm:hidden">{player.winRate} WR</p>
                      </div>
                    </div>
                    <div className="w-20 text-right hidden sm:block">
                      <span className="text-sm text-zinc-400">{player.winRate}</span>
                    </div>
                    <div className="w-20 text-right hidden sm:flex items-center justify-end gap-1">
                      {player.streakType === "win" ? (
                        <>
                          <img src="/50points/images/icons/icon-fire.png" alt="" className="w-4 h-4 object-contain" />
                          <span className="text-sm font-medium text-orange-400">{player.streak}W</span>
                        </>
                      ) : (
                        <span className="text-sm text-zinc-600">{player.streak}L</span>
                      )}
                    </div>
                    <div className="w-24 text-right">
                      <span className={`text-sm sm:text-base font-bold ${player.rank === 1 ? "text-gradient-gold" : "text-white"}`}>
                        {player.totalPoints.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-zinc-600 ml-1">{t("common.pts")}</span>
                    </div>
                  </div>
                </AnimateInView>
              ))}

              <div className="px-6 py-4 border-t border-white/5 text-center">
                <Link href="/leaderboard" className="inline-flex items-center gap-2 text-sm font-semibold text-purple-light hover:text-white transition-colors group">
                  {t("topPlayers.viewAll")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </AnimateInView>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-brand-dark" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <AnimateInView>
            <div className="relative glass-card rounded-3xl p-8 sm:p-14 text-center overflow-hidden">
              <div className="absolute inset-0">
                <img src="/50points/images/sidebar-promo.jpg" alt="" className="w-full h-full object-cover opacity-15" />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-brand-dark/90 to-brand-dark" />
              </div>
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple via-purple-light to-cyan" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-purple/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative">
                <img src="/50points/images/icons/icon-controller.png" alt="" className="w-12 h-12 sm:w-14 sm:h-14 object-contain mx-auto mb-5 sm:mb-6" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
                  {t("cta.title")}
                </h2>
                <p className="text-sm sm:text-lg text-zinc-400 max-w-lg mx-auto mb-8 leading-relaxed">
                  {t("cta.description")}
                </p>
                <Link href="/register" className="inline-flex items-center px-10 py-4 text-base font-semibold text-white bg-gradient-to-r from-purple to-purple-light rounded-xl btn-glow animate-glow-pulse">
                  {t("cta.createAccount")}
                  <ChevronRight className="inline-block w-5 h-5 ml-1" />
                </Link>
                <p className="text-xs text-zinc-600 mt-5">{t("cta.noCreditCard")}</p>
              </div>
            </div>
          </AnimateInView>
        </div>
      </section>
    </div>
  );
}
