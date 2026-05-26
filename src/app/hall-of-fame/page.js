"use client";

import { motion } from "framer-motion";
import { Crown, Trophy, Star, Flame, Zap, Skull, Eye, Award, ArrowLeft, Lock, Target, TrendingUp, Shield } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const categoryIcons = {
  fullPoint: Target,
  dualPoint: Shield,
  smartPoint: Zap,
  dominance: Crown,
  comebacks: TrendingUp,
  mythic: Star,
};

const categoryColors = {
  fullPoint: "#7c3aed",
  dualPoint: "#06b6d4",
  smartPoint: "#f59e0b",
  dominance: "#ef4444",
  comebacks: "#10b981",
  mythic: "#fbbf24",
};

const statusConfig = {
  impossible: { icon: Lock, color: "#dc2626", bg: "from-red-900/20 to-red-950/10" },
  legendary: { icon: Crown, color: "#fbbf24", bg: "from-yellow-900/20 to-yellow-950/10" },
  hot: { icon: Flame, color: "#f97316", bg: "from-orange-900/20 to-orange-950/10" },
  dormant: { icon: Skull, color: "#6b7280", bg: "from-gray-900/20 to-gray-950/10" },
  viral: { icon: Eye, color: "#a855f7", bg: "from-purple-900/20 to-purple-950/10" },
};

const mockRecords = [
  { id: 1, category: "mythic", name: "Torneo Perfecto", nameEn: "Perfect Tournament", desc: "Anotar puntos en cada carrera", descEn: "Score points in every race", status: "impossible", holder: null, date: null },
  { id: 2, category: "fullPoint", name: "8 Full Points Consecutivos", nameEn: "8 Consecutive Full Points", desc: "8 Full Points seguidos", descEn: "8 Full Points in a row", status: "impossible", holder: null, date: null },
  { id: 3, category: "dominance", name: "Rey Absoluto", nameEn: "Supreme Dominator", desc: "Liderar un torneo completo", descEn: "Lead an entire tournament", status: "legendary", holder: "Storm_Rider", date: "2026-05-20" },
  { id: 4, category: "fullPoint", name: "7 Full Points Consecutivos", nameEn: "7 Consecutive Full Points", desc: "7 Full Points seguidos", descEn: "7 Full Points in a row", status: "legendary", holder: "Night_Fury", date: "2026-05-18" },
  { id: 5, category: "comebacks", name: "Remontada Historica", nameEn: "Historic Comeback", desc: "De ultimo a Top 3", descEn: "From last to Top 3", status: "hot", holder: "Phantom_Ace", date: "2026-05-22" },
  { id: 6, category: "smartPoint", name: "Smart Point Supremo", nameEn: "Supreme Smart Point", desc: "5 Smart 30 consecutivos", descEn: "5 consecutive Smart 30", status: "hot", holder: "Shadow_King", date: "2026-05-19" },
  { id: 7, category: "dualPoint", name: "6 Dual Points Consecutivos", nameEn: "6 Consecutive Dual Points", desc: "6 Dual Points seguidos", descEn: "6 Dual Points in a row", status: "legendary", holder: "Iron_Horse", date: "2026-05-15" },
  { id: 8, category: "dominance", name: "Dominio Triple", nameEn: "Triple Dominance", desc: "Dominar 3 hipodromos", descEn: "Dominate 3 racetracks", status: "impossible", holder: null, date: null },
  { id: 9, category: "mythic", name: "Ticket Inmortal", nameEn: "Immortal Ticket", desc: "Ticket con mas puntos en la historia", descEn: "Ticket with most points in history", status: "legendary", holder: "Storm_Rider", date: "2026-05-21" },
  { id: 10, category: "fullPoint", name: "Full Point 100x1", nameEn: "Full Point 100x1", desc: "Acertar caballo 100-to-1", descEn: "Correctly pick 100-to-1 horse", status: "impossible", holder: null, date: null },
  { id: 11, category: "comebacks", name: "Ultimo Aliento", nameEn: "Last Breath", desc: "Ganar en la carrera final", descEn: "Win in the final race", status: "viral", holder: "Dark_Runner", date: "2026-05-23" },
  { id: 12, category: "smartPoint", name: "Smart Point Legendario", nameEn: "Legendary Smart Point", desc: "8 Smart Points consecutivos", descEn: "8 consecutive Smart Points", status: "dormant", holder: "Ace_Rider", date: "2025-12-01" },
  { id: 13, category: "dominance", name: "3K Full Point", nameEn: "3K Full Point", desc: "Primer jugador en 3K usando Full", descEn: "First player to 3K using Full", status: "hot", holder: "Night_Fury", date: "2026-05-24" },
  { id: 14, category: "dualPoint", name: "Dual Perfecto", nameEn: "Perfect Dual", desc: "Dual Point en todas las carreras validas", descEn: "Dual Point in all valid races", status: "impossible", holder: null, date: null },
  { id: 15, category: "mythic", name: "Leyenda Absoluta", nameEn: "Absolute Legend", desc: "Titulo mas alto del sistema", descEn: "Highest title in the system", status: "impossible", holder: null, date: null },
  { id: 16, category: "comebacks", name: "De Ultimo a #1", nameEn: "From Last to #1", desc: "Pasar de ultimo lugar a primero", descEn: "Go from last place to first", status: "legendary", holder: "Phantom_Ace", date: "2026-05-17" },
  { id: 17, category: "fullPoint", name: "5K Full Point", nameEn: "5K Full Point", desc: "Primer jugador en 5K usando Full", descEn: "First player to 5K using Full", status: "impossible", holder: null, date: null },
  { id: 18, category: "smartPoint", name: "Rey del Smart 30", nameEn: "King of Smart 30", desc: "7 Smart 30 consecutivos", descEn: "7 consecutive Smart 30", status: "dormant", holder: null, date: null },
];

const podiumPlayers = [
  { rank: 2, name: "Night_Fury", points: "4,215", records: 12, avatar: "NF", color: "#94a3b8" },
  { rank: 1, name: "Storm_Rider", points: "5,847", records: 18, avatar: "SR", color: "#fbbf24" },
  { rank: 3, name: "Phantom_Ace", points: "3,892", records: 9, avatar: "PA", color: "#cd7c2f" },
];

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function HallOfFamePage() {
  const { t, language } = useLanguage();
  const isEn = language === "en";

  const categories = [
    { key: "all", label: t("hallOfFame.allTime") },
    { key: "fullPoint", label: t("hallOfFame.fullPoint") },
    { key: "dualPoint", label: t("hallOfFame.dualPoint") },
    { key: "smartPoint", label: t("hallOfFame.smartPoint") },
    { key: "dominance", label: t("hallOfFame.dominance") },
    { key: "comebacks", label: t("hallOfFame.comebacks") },
    { key: "mythic", label: t("hallOfFame.mythic") },
  ];

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      {/* Golden glow effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-15"
          style={{ background: "radial-gradient(ellipse, rgba(251,191,36,0.4) 0%, rgba(245,158,11,0.1) 50%, transparent 80%)" }} />
      </div>

      {/* Hero / Podium Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/50points/images/ranking-hero.jpg" alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/40 via-[#050508]/80 to-[#050508]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-gold-light transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            {t("hallOfFame.backToHome")}
          </Link>

          {/* Title */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-amber-600/10 border border-yellow-500/20 flex items-center justify-center"
                style={{ boxShadow: "0 0 40px rgba(251,191,36,0.2)" }}>
                <Trophy className="w-10 h-10 text-yellow-400" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
              <span className="text-gradient-gold">{t("hallOfFame.title")}</span>
            </h1>
            <p className="text-zinc-500 max-w-xl mx-auto text-sm sm:text-base">{t("hallOfFame.subtitle")}</p>
          </motion.div>

          {/* Podium */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-end justify-center gap-3 sm:gap-6 mb-16 max-w-lg mx-auto">
            {podiumPlayers.map((player) => {
              const height = player.rank === 1 ? "h-44 sm:h-56" : player.rank === 2 ? "h-32 sm:h-44" : "h-28 sm:h-40";
              const size = player.rank === 1 ? "w-16 h-16 sm:w-20 sm:h-20 text-xl sm:text-2xl" : "w-12 h-12 sm:w-16 sm:h-16 text-base sm:text-lg";
              const medalColor = player.rank === 1 ? "from-yellow-400 to-amber-600" : player.rank === 2 ? "from-zinc-300 to-zinc-500" : "from-amber-600 to-amber-800";

              return (
                <div key={player.rank} className="flex flex-col items-center flex-1 max-w-[140px]">
                  {/* Avatar */}
                  <div className={`${size} rounded-full bg-gradient-to-br ${medalColor} flex items-center justify-center font-black text-black mb-3`}
                    style={{ boxShadow: player.rank === 1 ? "0 0 30px rgba(251,191,36,0.4)" : "none" }}>
                    {player.avatar}
                  </div>

                  <p className="text-sm sm:text-base font-bold text-white mb-0.5 truncate max-w-full">{player.name}</p>
                  <p className="text-xs text-zinc-500 mb-2">{player.points} pts</p>

                  {/* Podium bar */}
                  <div className={`w-full ${height} rounded-t-xl bg-gradient-to-t ${
                    player.rank === 1 ? "from-yellow-900/30 to-yellow-700/10 border-yellow-500/20" :
                    player.rank === 2 ? "from-zinc-800/30 to-zinc-700/10 border-zinc-500/20" :
                    "from-amber-900/30 to-amber-800/10 border-amber-600/20"
                  } border border-b-0 flex flex-col items-center justify-start pt-4`}>
                    <span className={`text-2xl sm:text-3xl font-black ${
                      player.rank === 1 ? "text-yellow-400" : player.rank === 2 ? "text-zinc-400" : "text-amber-600"
                    }`}>#{player.rank}</span>
                    <span className="text-[10px] text-zinc-500 mt-1">{player.records} records</span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Records Grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((cat) => (
            <button key={cat.key} className="px-4 py-2 rounded-lg text-xs font-semibold border border-white/10 text-zinc-400 hover:text-white hover:border-purple/30 hover:bg-purple/5 transition-all">
              {cat.label}
            </button>
          ))}
        </div>

        {/* Records cards */}
        <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockRecords.map((record) => {
            const CatIcon = categoryIcons[record.category] || Star;
            const catColor = categoryColors[record.category] || "#7c3aed";
            const status = statusConfig[record.status] || statusConfig.dormant;
            const StatusIcon = status.icon;

            return (
              <motion.div key={record.id} variants={fadeUp}
                className={`rounded-xl p-5 bg-gradient-to-br ${status.bg} border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 group relative overflow-hidden`}>
                {/* Background horse silhouette */}
                <div className="absolute -bottom-4 -right-4 opacity-[0.03] pointer-events-none">
                  <svg viewBox="0 0 200 180" fill="currentColor" className="w-28 h-28 text-white">
                    <path d="M180 45c-3-8-12-15-20-12-4 1-6 5-9 7-5 3-11 2-17 2-3-8-4-17-10-23-4-4-10-6-15-9-6-3-11-7-18-8-5 0-9 2-13 5-3 2-6 5-10 5-5 0-9-4-14-5-6-1-11 2-15 6-5 5-8 12-10 19-3 9-4 19-3 28 1 6 3 12 3 18 0 7-3 14-3 21 0 5 1 10 3 14l2 8c0 4-2 7-3 11-2 5-2 10 0 15 1 3 4 6 8 6 3 0 5-2 6-4 2-4 2-9 1-13l3-12c3-5 6-10 8-16 1 9 5 18 10 25 3 4 5 9 6 14 1 6 1 12 3 17 1 4 4 7 8 7 3 0 6-2 7-5 1-4 0-9-1-13l-4-14c0-4 1-9 3-13 3-6 8-11 13-15 6-5 13-9 20-12 6-3 13-5 19-9 5-4 9-9 12-15 4-9 5-19 3-28-1-5-3-10-4-15-2-4-3-9-3-14 3-3 7-5 9-9 3-5 3-11 1-16z" />
                  </svg>
                </div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: catColor + "20" }}>
                        <CatIcon className="w-4 h-4" style={{ color: catColor }} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">{isEn ? record.nameEn : record.name}</h3>
                        <p className="text-[11px] text-zinc-600">{isEn ? record.descEn : record.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
                      style={{ backgroundColor: status.color + "15", color: status.color }}>
                      <StatusIcon className="w-3 h-3" />
                      {t(`hallOfFame.${record.status}`)}
                    </div>
                  </div>

                  {/* Holder */}
                  {record.holder ? (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/[0.05]">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple/30 to-purple/10 flex items-center justify-center text-[10px] font-bold text-purple-light">
                        {record.holder.substring(0, 2)}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">{record.holder}</p>
                        <p className="text-[10px] text-zinc-600">{record.date}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/[0.05]">
                      <Lock className="w-4 h-4 text-zinc-700" />
                      <p className="text-xs text-zinc-600 italic">{t("hallOfFame.noOneYet")}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
