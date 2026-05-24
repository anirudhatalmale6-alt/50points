"use client";

import { Target, Trophy, TrendingUp, Users, Radio, Zap, Clock, ChevronRight, Flame, Award, ArrowRight } from "lucide-react";
import AnimateInView from "@/components/AnimateInView";
import { tournaments, topPlayers, howItWorks } from "@/lib/mockData";

/* ─── Inline horse silhouette SVG ─── */
function HorseSilhouette({ className = "" }) {
  return (
    <svg
      viewBox="0 0 200 180"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M180 45c-3-8-12-15-20-12-4 1-6 5-9 7-5 3-11 2-17 2-3-8-4-17-10-23-4-4-10-6-15-9-6-3-11-7-18-8-5 0-9 2-13 5-3 2-6 5-10 5-5 0-9-4-14-5-6-1-11 2-15 6-5 5-8 12-10 19-3 9-4 19-3 28 1 6 3 12 3 18 0 7-3 14-3 21 0 5 1 10 3 14l2 8c0 4-2 7-3 11-2 5-2 10 0 15 1 3 4 6 8 6 3 0 5-2 6-4 2-4 2-9 1-13l3-12c3-5 6-10 8-16 1 9 5 18 10 25 3 4 5 9 6 14 1 6 1 12 3 17 1 4 4 7 8 7 3 0 6-2 7-5 1-4 0-9-1-13l-4-14c0-4 1-9 3-13 3-6 8-11 13-15 6-5 13-9 20-12 6-3 13-5 19-9 5-4 9-9 12-15 4-9 5-19 3-28-1-5-3-10-4-15-2-4-3-9-3-14 3-3 7-5 9-9 3-5 3-11 1-16z" />
    </svg>
  );
}

/* ─── Stats icon map ─── */
function StatIcon({ name, className }) {
  const icons = {
    users: Users,
    radio: Radio,
    zap: Zap,
    clock: Clock,
  };
  const Icon = icons[name] || Zap;
  return <Icon className={className} />;
}

/* ─── Rank badge colors ─── */
function getRankStyle(rank) {
  switch (rank) {
    case 1:
      return "bg-gradient-to-br from-yellow-400 to-amber-600 text-black shadow-lg shadow-amber-500/20";
    case 2:
      return "bg-gradient-to-br from-zinc-300 to-zinc-500 text-black";
    case 3:
      return "bg-gradient-to-br from-amber-600 to-amber-800 text-white";
    default:
      return "bg-white/5 text-zinc-400";
  }
}

/* ─── The how-it-works icon map ─── */
function StepIcon({ name, className }) {
  const icons = { target: Target, trophy: Trophy, "trending-up": TrendingUp };
  const Icon = icons[name] || Target;
  return <Icon className={className} />;
}

/* ═══════════════════════════════════════════════════════════════
   HOMEPAGE
   ═══════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Gradient background layers */}
        <div className="absolute inset-0 bg-brand-dark" />
        <div className="absolute inset-0 bg-gradient-radial from-purple/8 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple/30 to-transparent" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />

        {/* Horse silhouette decoration - hidden on mobile, very subtle on desktop */}
        <div className="hidden lg:block absolute right-[-10%] bottom-[5%] w-[500px] h-[450px] opacity-[0.015] pointer-events-none select-none blur-sm">
          <HorseSilhouette className="w-full h-full" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <AnimateInView delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6 sm:mb-8">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-live" />
              <span className="text-xs sm:text-sm font-medium text-zinc-300">
                Torneos en vivo ahora
              </span>
            </div>
          </AnimateInView>

          <AnimateInView delay={0.2}>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-4 sm:mb-6">
              <span className="text-gradient-purple-cyan">50</span>
              <span className="text-white">POINTS</span>
            </h1>
          </AnimateInView>

          <AnimateInView delay={0.3}>
            <p className="text-lg sm:text-2xl lg:text-3xl font-semibold text-white/90 mb-3 sm:mb-4">
              La Competencia Definitiva de Carreras de Caballos
            </p>
          </AnimateInView>

          <AnimateInView delay={0.4}>
            <p className="text-sm sm:text-lg text-zinc-400 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
              Elige tus caballos. Gana puntos. Domina la clasificacion.
            </p>
          </AnimateInView>

          <AnimateInView delay={0.5}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
              <button className="w-full sm:w-auto px-8 py-3.5 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-purple to-purple-light rounded-xl btn-glow animate-glow-pulse">
                Unirse al Torneo
                <ChevronRight className="inline-block w-4 h-4 ml-1" />
              </button>
              <button className="w-full sm:w-auto px-8 py-3.5 text-sm sm:text-base font-semibold text-zinc-300 border border-white/10 rounded-xl hover:bg-white/5 hover:border-purple/30 transition-all duration-300">
                Como Funciona
              </button>
            </div>
          </AnimateInView>

          {/* Stats Bar */}
          <AnimateInView delay={0.6}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
              {[
                { value: "12,450+", label: "Jugadores", icon: "users" },
                { value: "3", label: "Pistas en Vivo", icon: "radio" },
                { value: "$0", label: "Entrada", icon: "zap" },
                { value: "24/7", label: "Carreras", icon: "clock" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="glass-card rounded-xl px-4 py-3 sm:py-4 flex flex-col items-center gap-1 transition-all duration-300"
                >
                  <StatIcon name={stat.icon} className="w-4 h-4 text-purple-light mb-1" />
                  <span className="text-xl sm:text-2xl font-bold text-white">{stat.value}</span>
                  <span className="text-[11px] sm:text-xs text-zinc-500 font-medium uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </AnimateInView>
        </div>
      </section>

      {/* ─── LIVE TOURNAMENTS ─── */}
      <section className="relative py-16 sm:py-24">
        {/* Subtle background */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-card/30 to-brand-dark" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <AnimateInView>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan animate-pulse-live" />
              <span className="text-xs font-semibold text-cyan uppercase tracking-widest">
                EN VIVO
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3">
              TORNEOS EN VIVO
            </h2>
            <p className="text-zinc-500 text-sm sm:text-base mb-10 sm:mb-14 max-w-lg">
              Unete a un torneo. Elige tus caballos, gana puntos y compite en tiempo real.
            </p>
          </AnimateInView>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {tournaments.map((t, i) => (
              <AnimateInView key={t.id} delay={i * 0.15}>
                <div className="glass-card rounded-2xl overflow-hidden group hover:glow-purple transition-all duration-500 gradient-border">
                  {/* Card header */}
                  <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-light transition-colors">
                          {t.trackName}
                        </h3>
                        <p className="text-xs text-zinc-500 mt-0.5">{t.location}</p>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ${
                          t.status === "LIVE"
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        {t.status === "LIVE" && (
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-live" />
                        )}
                        {t.status === "LIVE" ? "EN VIVO" : t.status === "UPCOMING" ? "PROXIMO" : t.status}
                      </span>
                    </div>

                    {/* Race progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-zinc-400">
                          Carrera {t.currentRace} de {t.totalRaces}
                        </span>
                        <span className="text-zinc-500">
                          {t.status === "LIVE"
                            ? `Siguiente: ${t.nextRace}`
                            : `Comienza: ${t.startTime}`}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple to-cyan rounded-full transition-all duration-500"
                          style={{
                            width: `${(t.currentRace / t.totalRaces) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex items-center gap-4 text-xs text-zinc-500 mb-5">
                      <div className="flex items-center gap-1.5">
                        <Trophy className="w-3.5 h-3.5 text-gold" />
                        <span>{t.prizeInfo}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-purple-light" />
                        <span>{t.players.toLocaleString()} jugadores</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <button className="w-full py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-purple to-purple-light rounded-xl btn-glow opacity-90 group-hover:opacity-100 transition-opacity">
                      Entrar al Torneo
                    </button>
                  </div>
                </div>
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
                Primeros Pasos
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
                COMO FUNCIONA
              </h2>
              <p className="text-zinc-500 text-sm sm:text-base max-w-lg mx-auto">
                Tres simples pasos para comenzar a competir. Sin deposito, sin compromiso, pura estrategia.
              </p>
            </div>
          </AnimateInView>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            {howItWorks.map((step, i) => (
              <AnimateInView key={step.step} delay={i * 0.15}>
                <div className="relative glass-card rounded-2xl p-6 sm:p-8 group hover:glow-purple transition-all duration-500 h-full">
                  {/* Step number */}
                  <div className="absolute -top-3 -left-1 sm:-top-4 sm:-left-2">
                    <span className="text-6xl sm:text-7xl font-black text-white/[0.03] select-none">
                      {step.step}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="relative mb-5 sm:mb-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-purple/20 to-purple/5 border border-purple/10 flex items-center justify-center group-hover:border-purple/30 transition-colors duration-300">
                      <StepIcon
                        name={step.icon}
                        className="w-6 h-6 sm:w-7 sm:h-7 text-purple-light"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-purple-light/60 uppercase tracking-wider">
                        Paso {step.step}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 group-hover:text-purple-light transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </AnimateInView>
            ))}
          </div>

          {/* Strategy cards below how it works */}
          <AnimateInView delay={0.3}>
            <div className="mt-12 sm:mt-16 glass-card rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-6 text-center">
                Elige tu Estrategia
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    name: "Full Point",
                    points: "50pts on 1",
                    risk: "Alto Riesgo",
                    riskColor: "text-red-400",
                    description: "Todo en un solo caballo para maximo premio",
                    gradient: "from-red-500/10 to-transparent",
                    border: "border-red-500/10 hover:border-red-500/30",
                  },
                  {
                    name: "Dual Point",
                    points: "25 + 25",
                    risk: "Riesgo Medio",
                    riskColor: "text-amber-400",
                    description: "Divide entre dos caballos para juego equilibrado",
                    gradient: "from-amber-500/10 to-transparent",
                    border: "border-amber-500/10 hover:border-amber-500/30",
                  },
                  {
                    name: "Smart Pick",
                    points: "30 / 15 / 5",
                    risk: "Bajo Riesgo",
                    riskColor: "text-green-400",
                    description: "Distribuye en tres para puntuacion consistente",
                    gradient: "from-green-500/10 to-transparent",
                    border: "border-green-500/10 hover:border-green-500/30",
                  },
                ].map((strat, i) => (
                  <div
                    key={i}
                    className={`rounded-xl p-5 bg-gradient-to-b ${strat.gradient} border ${strat.border} transition-all duration-300`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-white">{strat.name}</h4>
                      <span className={`text-[11px] font-semibold ${strat.riskColor}`}>
                        {strat.risk}
                      </span>
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
                Ranking
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
                TOP JUGADORES
              </h2>
              <p className="text-zinc-500 text-sm sm:text-base max-w-md mx-auto">
                {"Los mejores del dia. Puedes superarlos?"}
              </p>
            </div>
          </AnimateInView>

          {/* Leaderboard */}
          <AnimateInView delay={0.1}>
            <div className="glass-card rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="px-4 sm:px-6 py-3 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider w-full">
                  <span className="w-10 text-center">Rango</span>
                  <span className="flex-1">Jugador</span>
                  <span className="w-20 text-right hidden sm:block">% Victoria</span>
                  <span className="w-20 text-right hidden sm:block">Racha</span>
                  <span className="w-24 text-right">Puntos</span>
                </div>
              </div>

              {/* Rows */}
              {topPlayers.map((player, i) => (
                <AnimateInView key={player.rank} delay={0.1 + i * 0.08}>
                  <div
                    className={`px-4 sm:px-6 py-3.5 flex items-center gap-4 transition-all duration-200 hover:bg-white/[0.02] ${
                      i < topPlayers.length - 1 ? "border-b border-white/[0.03]" : ""
                    } ${player.rank === 1 ? "bg-gradient-to-r from-amber-500/[0.04] to-transparent" : ""}`}
                  >
                    {/* Rank */}
                    <div className="w-10 flex justify-center">
                      <span
                        className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold ${getRankStyle(
                          player.rank
                        )}`}
                      >
                        {player.rank}
                      </span>
                    </div>

                    {/* Player */}
                    <div className="flex-1 flex items-center gap-3 min-w-0">
                      <div
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-white shrink-0"
                        style={{ backgroundColor: player.avatarColor + "33", color: player.avatarColor }}
                      >
                        {player.avatar}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">
                          {player.username}
                        </p>
                        <p className="text-[11px] text-zinc-600 sm:hidden">
                          {player.winRate} WR
                        </p>
                      </div>
                    </div>

                    {/* Win Rate */}
                    <div className="w-20 text-right hidden sm:block">
                      <span className="text-sm text-zinc-400">{player.winRate}</span>
                    </div>

                    {/* Streak */}
                    <div className="w-20 text-right hidden sm:flex items-center justify-end gap-1">
                      {player.streakType === "win" ? (
                        <>
                          <Flame className="w-3.5 h-3.5 text-orange-400" />
                          <span className="text-sm font-medium text-orange-400">
                            {player.streak}W
                          </span>
                        </>
                      ) : (
                        <span className="text-sm text-zinc-600">{player.streak}L</span>
                      )}
                    </div>

                    {/* Points */}
                    <div className="w-24 text-right">
                      <span
                        className={`text-sm sm:text-base font-bold ${
                          player.rank === 1 ? "text-gradient-gold" : "text-white"
                        }`}
                      >
                        {player.totalPoints.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-zinc-600 ml-1">pts</span>
                    </div>
                  </div>
                </AnimateInView>
              ))}

              {/* View All */}
              <div className="px-6 py-4 border-t border-white/5 text-center">
                <button className="inline-flex items-center gap-2 text-sm font-semibold text-purple-light hover:text-white transition-colors group">
                  Ver Clasificacion Completa
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
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
              {/* Gradient border top */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple via-purple-light to-cyan" />

              {/* Glow blob */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-purple/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative">
                <Award className="w-10 h-10 sm:w-12 sm:h-12 text-purple-light mx-auto mb-5 sm:mb-6" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
                  Listo para competir?
                </h2>
                <p className="text-sm sm:text-lg text-zinc-400 max-w-lg mx-auto mb-8 leading-relaxed">
                  Unete a miles de fanaticos de las carreras de caballos en la competencia definitiva de puntos. Gratis siempre.
                </p>
                <button className="px-10 py-4 text-base font-semibold text-white bg-gradient-to-r from-purple to-purple-light rounded-xl btn-glow animate-glow-pulse">
                  Crear Cuenta Gratis
                  <ChevronRight className="inline-block w-5 h-5 ml-1" />
                </button>
                <p className="text-xs text-zinc-600 mt-5">
                  Sin tarjeta de credito. Comienza a jugar en menos de 60 segundos.
                </p>
              </div>
            </div>
          </AnimateInView>
        </div>
      </section>
    </div>
  );
}
