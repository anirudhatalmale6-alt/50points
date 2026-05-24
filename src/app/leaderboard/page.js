"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Flame,
  Medal,
  Crown,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

const leaderboardPlayers = [
  { rank: 1, username: "ThunderHoof", initials: "TH", color: "#f59e0b", points: 14820, winRate: 68, streak: 7, trend: "up", change: 0 },
  { rank: 2, username: "GallopKing", initials: "GK", color: "#a855f7", points: 13455, winRate: 62, streak: 4, trend: "up", change: 1 },
  { rank: 3, username: "RailRunner", initials: "RR", color: "#06b6d4", points: 12890, winRate: 59, streak: 3, trend: "down", change: 1 },
  { rank: 4, username: "OddsWhisperer", initials: "OW", color: "#10b981", points: 11740, winRate: 55, streak: 1, trend: "up", change: 2 },
  { rank: 5, username: "FurlongMaster", initials: "FM", color: "#ec4899", points: 10320, winRate: 52, streak: 2, trend: "up", change: 1 },
  { rank: 6, username: "TrackPhantom", initials: "TP", color: "#8b5cf6", points: 9875, winRate: 51, streak: 5, trend: "up", change: 3 },
  { rank: 7, username: "DerbyQueen", initials: "DQ", color: "#f43f5e", points: 9340, winRate: 49, streak: 0, trend: "down", change: 2 },
  { rank: 8, username: "PaddockPro", initials: "PP", color: "#14b8a6", points: 8920, winRate: 48, streak: 3, trend: "up", change: 1 },
  { rank: 9, username: "SilkRider", initials: "SR", color: "#f97316", points: 8445, winRate: 47, streak: 1, trend: "down", change: 1 },
  { rank: 10, username: "BreezeMaster", initials: "BM", color: "#6366f1", points: 7990, winRate: 46, streak: 2, trend: "up", change: 0 },
  { rank: 11, username: "StallionAce", initials: "SA", color: "#22d3ee", points: 7650, winRate: 45, streak: 4, trend: "up", change: 2 },
  { rank: 12, username: "HomeStretch", initials: "HS", color: "#a3e635", points: 7210, winRate: 44, streak: 0, trend: "down", change: 3 },
  { rank: 13, username: "PostTimePick", initials: "PT", color: "#fb923c", points: 6880, winRate: 43, streak: 1, trend: "up", change: 1 },
  { rank: 14, username: "TurfTitan", initials: "TT", color: "#c084fc", points: 6540, winRate: 42, streak: 2, trend: "up", change: 0 },
  { rank: 15, username: "PhotoFinish", initials: "PF", color: "#38bdf8", points: 6210, winRate: 41, streak: 0, trend: "down", change: 1 },
  { rank: 16, username: "MorningLine", initials: "ML", color: "#4ade80", points: 5870, winRate: 40, streak: 3, trend: "up", change: 4 },
  { rank: 17, username: "JockeyMind", initials: "JM", color: "#fb7185", points: 5530, winRate: 39, streak: 1, trend: "down", change: 2 },
  { rank: 18, username: "CloseCall", initials: "CC", color: "#818cf8", points: 5190, winRate: 38, streak: 0, trend: "up", change: 1 },
  { rank: 19, username: "BettingEdge", initials: "BE", color: "#fbbf24", points: 4850, winRate: 37, streak: 2, trend: "down", change: 1 },
  { rank: 20, username: "WireToWire", initials: "WW", color: "#2dd4bf", points: 4520, winRate: 36, streak: 1, trend: "up", change: 0 },
  { rank: 21, username: "LuckyGait", initials: "LG", color: "#e879f9", points: 4180, winRate: 35, streak: 0, trend: "down", change: 3 },
  { rank: 22, username: "NoseAhead", initials: "NA", color: "#34d399", points: 3840, winRate: 34, streak: 1, trend: "up", change: 1 },
  { rank: 23, username: "HoofBeats", initials: "HB", color: "#f472b6", points: 3500, winRate: 33, streak: 2, trend: "up", change: 2 },
  { rank: 24, username: "RaceReader", initials: "RD", color: "#60a5fa", points: 3160, winRate: 32, streak: 0, trend: "down", change: 1 },
  { rank: 25, username: "TripleThreat", initials: "3T", color: "#a78bfa", points: 2820, winRate: 31, streak: 1, trend: "up", change: 0 },
];

const timeFilters = ["Daily", "Weekly", "Monthly", "All Time"];
const tournamentFilters = ["All Tournaments", "Gulfstream Park", "Churchill Downs", "Santa Anita Park"];

const ROWS_PER_PAGE = 10;

function getRankColor(rank) {
  if (rank === 1) return { bg: "from-yellow-500/20 to-yellow-600/5", border: "border-yellow-500/30", glow: "shadow-[0_0_30px_rgba(245,158,11,0.3)]", text: "text-yellow-400" };
  if (rank === 2) return { bg: "from-slate-400/20 to-slate-500/5", border: "border-slate-400/30", glow: "shadow-[0_0_30px_rgba(148,163,184,0.3)]", text: "text-slate-300" };
  if (rank === 3) return { bg: "from-amber-700/20 to-amber-800/5", border: "border-amber-700/30", glow: "shadow-[0_0_30px_rgba(217,119,6,0.25)]", text: "text-amber-600" };
  return { bg: "", border: "border-white/5", glow: "", text: "text-zinc-400" };
}

function RankBadge({ rank }) {
  if (rank === 1) return <span className="text-lg">&#x1F947;</span>;
  if (rank === 2) return <span className="text-lg">&#x1F948;</span>;
  if (rank === 3) return <span className="text-lg">&#x1F949;</span>;
  return <span className="text-sm text-zinc-500 font-mono w-6 text-center">#{rank}</span>;
}

export default function LeaderboardPage() {
  const [activeFilter, setActiveFilter] = useState("All Time");
  const [tournamentFilter, setTournamentFilter] = useState("All Tournaments");
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const top3 = leaderboardPlayers.slice(0, 3);
  const totalPages = Math.ceil(leaderboardPlayers.length / ROWS_PER_PAGE);
  const paginatedPlayers = leaderboardPlayers.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-purple-light transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/5 border border-yellow-500/20">
            <Trophy className="w-7 h-7 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">LEADERBOARD</h1>
            <p className="text-sm text-zinc-500 mt-1">See who leads the pack</p>
          </div>
        </motion.div>

        {/* Filters Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10"
        >
          {/* Time Filters */}
          <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/5">
            {timeFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => { setActiveFilter(filter); setCurrentPage(1); }}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  activeFilter === filter
                    ? "text-white"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {activeFilter === filter && (
                  <motion.div
                    layoutId="activeTimeFilter"
                    className="absolute inset-0 bg-gradient-to-r from-purple to-purple-light rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </button>
            ))}
          </div>

          {/* Tournament Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-zinc-300 hover:border-purple/30 transition-colors"
            >
              {tournamentFilter}
              <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-[#1a1a2e] border border-white/10 shadow-xl shadow-black/40 overflow-hidden z-50"
                >
                  {tournamentFilters.map((t) => (
                    <button
                      key={t}
                      onClick={() => { setTournamentFilter(t); setShowDropdown(false); }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                        tournamentFilter === t
                          ? "bg-purple/20 text-purple-light"
                          : "text-zinc-300 hover:bg-white/5"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* TOP 3 Podium */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {/* Position 2 - Left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="order-2 sm:order-1 sm:mt-8"
          >
            <PodiumCard player={top3[1]} position={2} />
          </motion.div>

          {/* Position 1 - Center (larger) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="order-1 sm:order-2"
          >
            <PodiumCard player={top3[0]} position={1} />
          </motion.div>

          {/* Position 3 - Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="order-3 sm:mt-8"
          >
            <PodiumCard player={top3[2]} position={3} />
          </motion.div>
        </div>

        {/* Rankings Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] backdrop-blur-xl"
        >
          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider border-b border-white/5 bg-white/[0.02]">
            <div className="col-span-1">Rank</div>
            <div className="col-span-4">Player</div>
            <div className="col-span-2 text-right">Points</div>
            <div className="col-span-2 text-right">Win Rate</div>
            <div className="col-span-2 text-right">Streak</div>
            <div className="col-span-1 text-right">Trend</div>
          </div>

          {/* Table Rows */}
          {paginatedPlayers.map((player, index) => (
            <motion.div
              key={player.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.05 * index }}
              className={`grid grid-cols-2 sm:grid-cols-12 gap-2 sm:gap-4 px-4 sm:px-6 py-4 items-center border-b border-white/[0.03] transition-all duration-300 hover:bg-purple/[0.04] hover:shadow-[inset_0_0_30px_rgba(124,58,237,0.05)] cursor-pointer group ${
                index % 2 === 0 ? "bg-white/[0.01]" : "bg-transparent"
              }`}
            >
              {/* Rank */}
              <div className="col-span-1 flex items-center gap-2 sm:gap-0">
                <RankBadge rank={player.rank} />
              </div>

              {/* Player */}
              <div className="col-span-1 sm:col-span-4 flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ring-2 ring-white/10 group-hover:ring-purple/30 transition-all"
                  style={{ backgroundColor: player.color + "25", color: player.color }}
                >
                  {player.initials}
                </div>
                <span className="font-medium text-sm text-zinc-200 group-hover:text-white transition-colors truncate">
                  {player.username}
                </span>
              </div>

              {/* Points */}
              <div className="col-span-1 sm:col-span-2 text-right">
                <span className="font-bold text-sm sm:text-base text-gradient-purple">
                  {player.points.toLocaleString()}
                </span>
                <span className="text-xs text-zinc-600 ml-1 hidden sm:inline">pts</span>
              </div>

              {/* Win Rate */}
              <div className="col-span-1 sm:col-span-2 text-right">
                <span className="text-sm text-zinc-300">{player.winRate}%</span>
              </div>

              {/* Streak */}
              <div className="hidden sm:flex col-span-2 justify-end items-center gap-1">
                {player.streak > 0 ? (
                  <>
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span className="text-sm font-medium text-orange-400">{player.streak}</span>
                  </>
                ) : (
                  <span className="text-sm text-zinc-600">-</span>
                )}
              </div>

              {/* Trend */}
              <div className="hidden sm:flex col-span-1 justify-end items-center gap-1">
                {player.trend === "up" ? (
                  <div className="flex items-center gap-0.5 text-emerald-400">
                    <TrendingUp className="w-4 h-4" />
                    {player.change > 0 && <span className="text-xs">+{player.change}</span>}
                  </div>
                ) : (
                  <div className="flex items-center gap-0.5 text-red-400">
                    <TrendingDown className="w-4 h-4" />
                    {player.change > 0 && <span className="text-xs">-{player.change}</span>}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 bg-white/[0.02] border-t border-white/5">
            <p className="text-xs text-zinc-500">
              Showing {(currentPage - 1) * ROWS_PER_PAGE + 1}-{Math.min(currentPage * ROWS_PER_PAGE, leaderboardPlayers.length)} of {leaderboardPlayers.length} players
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:border-purple/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                    currentPage === page
                      ? "bg-purple text-white"
                      : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:border-purple/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function PodiumCard({ player, position }) {
  const colors = getRankColor(position);
  const isFirst = position === 1;

  return (
    <div
      className={`relative rounded-2xl border ${colors.border} ${colors.glow} p-6 text-center bg-gradient-to-b ${colors.bg} backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] ${
        isFirst ? "sm:py-10" : ""
      }`}
    >
      {/* Crown for #1 */}
      {isFirst && (
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-5 left-1/2 -translate-x-1/2"
        >
          <Crown className="w-8 h-8 text-yellow-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.6)]" />
        </motion.div>
      )}

      {/* Position Number */}
      <div className={`text-5xl font-black mb-3 ${colors.text} opacity-20`}>
        {position}
      </div>

      {/* Avatar */}
      <div className="flex justify-center mb-3">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold ring-4 ${
            position === 1 ? "ring-yellow-500/40" : position === 2 ? "ring-slate-400/40" : "ring-amber-700/40"
          }`}
          style={{ backgroundColor: player.color + "30", color: player.color }}
        >
          {player.initials}
        </div>
      </div>

      {/* Username */}
      <h3 className="font-bold text-lg text-white mb-1">{player.username}</h3>

      {/* Points */}
      <p className="text-2xl font-black text-gradient-purple mb-2">
        {player.points.toLocaleString()}
      </p>
      <p className="text-xs text-zinc-500 mb-3">Total Points</p>

      {/* Trend */}
      <div className="flex items-center justify-center gap-1">
        {player.trend === "up" ? (
          <div className="flex items-center gap-1 text-emerald-400 text-xs font-medium px-2 py-1 rounded-full bg-emerald-400/10">
            <TrendingUp className="w-3 h-3" />
            Rising
          </div>
        ) : (
          <div className="flex items-center gap-1 text-red-400 text-xs font-medium px-2 py-1 rounded-full bg-red-400/10">
            <TrendingDown className="w-3 h-3" />
            Falling
          </div>
        )}
      </div>
    </div>
  );
}
