"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  Flame,
  Target,
  TrendingUp,
  Calendar,
  MapPin,
  Edit3,
  ArrowLeft,
  Lock,
  Award,
  Zap,
  Star,
  Shield,
  Crown,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const userProfile = {
  username: "RailRunner",
  initials: "RR",
  color: "#06b6d4",
  memberSince: "March 2025",
  location: "Melbourne, AU",
  globalRank: 47,
  totalPoints: 4280,
  winRate: 58,
  tournamentsPlayed: 34,
  currentStreak: 3,
};

const performanceData = [
  { day: "Mon", points: 320 },
  { day: "Tue", points: 180 },
  { day: "Wed", points: 540 },
  { day: "Thu", points: 410 },
  { day: "Fri", points: 290 },
  { day: "Sat", points: 650 },
  { day: "Sun", points: 480 },
];

const recentTickets = [
  {
    id: 1,
    race: "Race 5 - Sprint Stakes",
    track: "Gulfstream Park",
    strategy: "Full Point",
    horses: ["Midnight Storm"],
    pointsEarned: 210,
    date: "May 23, 2026",
  },
  {
    id: 2,
    race: "Race 8 - Mile Cup",
    track: "Churchill Downs",
    strategy: "Dual Point",
    horses: ["Golden Arrow", "Silver Bolt"],
    pointsEarned: 95,
    date: "May 22, 2026",
  },
  {
    id: 3,
    race: "Race 3 - Turf Classic",
    track: "Santa Anita Park",
    strategy: "Smart Pick",
    horses: ["Wild Card", "Iron Will", "Lucky Charm"],
    pointsEarned: -50,
    date: "May 21, 2026",
  },
  {
    id: 4,
    race: "Race 11 - Derby Trial",
    track: "Churchill Downs",
    strategy: "Full Point",
    horses: ["Blazing Glory"],
    pointsEarned: 315,
    date: "May 20, 2026",
  },
  {
    id: 5,
    race: "Race 6 - Maiden Race",
    track: "Gulfstream Park",
    strategy: "Dual Point",
    horses: ["Quiet Thunder", "Dawn Patrol"],
    pointsEarned: -25,
    date: "May 19, 2026",
  },
];

const achievements = [
  { id: 1, name: "Primera Victoria", description: "Gana tu primera seleccion", icon: Star, unlocked: true, color: "#f59e0b" },
  { id: 2, name: "Racha de 5 Carreras", description: "Gana 5 carreras seguidas", icon: Flame, unlocked: true, color: "#a855f7" },
  { id: 3, name: "Top 10 Diario", description: "Alcanza el top 10 diario", icon: TrendingUp, unlocked: true, color: "#06b6d4" },
  { id: 4, name: "Campeon de Torneo", description: "Gana un torneo completo", icon: Crown, unlocked: false, color: "#f59e0b" },
  { id: 5, name: "Club 1000 Puntos", description: "Gana 1000+ puntos en un dia", icon: Zap, unlocked: false, color: "#a855f7" },
  { id: 6, name: "Seleccion Perfecta", description: "Todos los caballos clasifican en Smart Pick", icon: Shield, unlocked: false, color: "#06b6d4" },
];

const maxPoints = Math.max(...performanceData.map((d) => d.points));

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProfilePage() {
  const circumference = 2 * Math.PI * 36;
  const winRateOffset = circumference - (userProfile.winRate / 100) * circumference;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-cyan/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-purple-light transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Inicio
        </Link>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10"
        >
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple to-purple-light p-[3px]">
              <div
                className="w-full h-full rounded-full flex items-center justify-center text-2xl font-bold"
                style={{ backgroundColor: userProfile.color + "20", color: userProfile.color }}
              >
                {userProfile.initials}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mb-2">
              <h1 className="text-3xl font-bold">{userProfile.username}</h1>
              <span className="px-3 py-1 rounded-full bg-purple/15 border border-purple/20 text-purple-light text-xs font-semibold">
                #{userProfile.globalRank} Global
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                Miembro desde {userProfile.memberSince}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {userProfile.location}
              </span>
            </div>
          </div>

          {/* Edit Button */}
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-sm text-zinc-300 hover:border-purple/30 hover:text-white transition-all bg-white/[0.02]">
            <Edit3 className="w-4 h-4" />
            Editar Perfil
          </button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {/* Total Points */}
          <motion.div variants={fadeUp} className="glass-card rounded-2xl p-5 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-purple-light" />
              <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Puntos Totales</span>
            </div>
            <p className="text-3xl font-black text-gradient-purple">
              {userProfile.totalPoints.toLocaleString()}
            </p>
          </motion.div>

          {/* Win Rate */}
          <motion.div variants={fadeUp} className="glass-card rounded-2xl p-5 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Target className="w-5 h-5 text-cyan" />
              <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">% Victoria</span>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    fill="none"
                    stroke="url(#winRateGradient)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={winRateOffset}
                  />
                  <defs>
                    <linearGradient id="winRateGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">{userProfile.winRate}%</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tournaments Played */}
          <motion.div variants={fadeUp} className="glass-card rounded-2xl p-5 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Torneos</span>
            </div>
            <p className="text-3xl font-black text-white">
              {userProfile.tournamentsPlayed}
            </p>
          </motion.div>

          {/* Current Streak */}
          <motion.div variants={fadeUp} className="glass-card rounded-2xl p-5 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-orange-400" />
              <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Racha</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Flame className="w-7 h-7 text-orange-400" />
              <span className="text-3xl font-black text-orange-400">{userProfile.currentStreak}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-card rounded-2xl p-6 mb-10"
        >
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-light" />
            Historial de Rendimiento
          </h2>

          <div className="flex items-end gap-3 sm:gap-4 h-48">
            {performanceData.map((d, i) => {
              const heightPct = (d.points / maxPoints) * 100;
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPct}%` }}
                    transition={{ duration: 0.8, delay: 0.1 * i, ease: "easeOut" }}
                    className="w-full max-w-[40px] rounded-t-lg bg-gradient-to-t from-purple to-purple-light relative group cursor-pointer"
                  >
                    {/* Tooltip */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-[#1a1a2e] border border-white/10 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {d.points} pts
                    </div>
                  </motion.div>
                  <span className="text-xs text-zinc-500">{d.day}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Tickets */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card rounded-2xl p-6 mb-10"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan" />
              Tickets Recientes
            </h2>
            <Link
              href="#"
              className="flex items-center gap-1 text-sm text-purple-light hover:text-purple transition-colors"
            >
              Ver Todo
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentTickets.map((ticket, i) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * i }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-purple/10 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm text-zinc-200 truncate">{ticket.race}</p>
                    <span className="text-xs text-zinc-600">|</span>
                    <span className="text-xs text-zinc-500">{ticket.track}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      ticket.strategy === "Full Point"
                        ? "bg-red-500/10 text-red-400"
                        : ticket.strategy === "Dual Point"
                        ? "bg-yellow-500/10 text-yellow-400"
                        : "bg-emerald-500/10 text-emerald-400"
                    }`}>
                      {ticket.strategy}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {ticket.horses.join(", ")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:flex-shrink-0">
                  <span className={`text-sm font-bold ${
                    ticket.pointsEarned >= 0 ? "text-emerald-400" : "text-red-400"
                  }`}>
                    {ticket.pointsEarned >= 0 ? "+" : ""}{ticket.pointsEarned} pts
                  </span>
                  <span className="text-xs text-zinc-600">{ticket.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-400" />
            Logros
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <AchievementBadge key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function AchievementBadge({ achievement }) {
  const Icon = achievement.icon;

  return (
    <motion.div
      whileHover={{ scale: achievement.unlocked ? 1.04 : 1, y: achievement.unlocked ? -2 : 0 }}
      className={`relative p-5 rounded-xl text-center transition-all duration-300 ${
        achievement.unlocked
          ? "glass-card cursor-pointer"
          : "bg-white/[0.01] border border-white/[0.03] opacity-50"
      }`}
      style={
        achievement.unlocked
          ? { boxShadow: `0 0 20px ${achievement.color}15` }
          : {}
      }
    >
      {/* Lock overlay */}
      {!achievement.unlocked && (
        <div className="absolute top-3 right-3">
          <Lock className="w-4 h-4 text-zinc-600" />
        </div>
      )}

      <div
        className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3 ${
          achievement.unlocked ? "" : "grayscale"
        }`}
        style={{
          backgroundColor: achievement.unlocked ? achievement.color + "20" : "rgba(255,255,255,0.03)",
        }}
      >
        <Icon
          className="w-6 h-6"
          style={{
            color: achievement.unlocked ? achievement.color : "#3f3f46",
          }}
        />
      </div>

      <h3 className={`text-sm font-bold mb-1 ${achievement.unlocked ? "text-white" : "text-zinc-600"}`}>
        {achievement.name}
      </h3>
      <p className={`text-xs ${achievement.unlocked ? "text-zinc-500" : "text-zinc-700"}`}>
        {achievement.description}
      </p>
    </motion.div>
  );
}
