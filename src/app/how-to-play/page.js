"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  Target,
  TrendingUp,
  Crosshair,
  Users,
  HelpCircle,
  ArrowLeft,
  ChevronRight,
  Zap,
  Shield,
  Flame,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: 1,
    title: "Join a Tournament",
    icon: Users,
    color: "#7c3aed",
    description:
      "Browse live and upcoming tournaments from top racetracks around the world. Each tournament is free to enter and open to all players. Simply select a tournament to get started.",
    details: [
      "Tournaments run daily at major tracks",
      "Completely free to enter",
      "Compete against thousands of players",
      "Multiple races per tournament",
    ],
  },
  {
    number: 2,
    title: "Choose Your Strategy",
    icon: Target,
    color: "#a855f7",
    description:
      "You get 50 points per race to allocate across your horse picks. Choose from three strategies that match your risk appetite.",
    strategies: [
      {
        name: "Full Point",
        points: "50 pts on 1 horse",
        risk: "High Risk",
        riskColor: "#ef4444",
        multiplier: "1x Odds",
        description: "Go all-in on a single horse for maximum reward.",
        icon: Flame,
      },
      {
        name: "Dual Point",
        points: "25 + 25 split",
        risk: "Medium Risk",
        riskColor: "#f59e0b",
        multiplier: "0.8x Odds",
        description: "Split between two horses for balanced risk.",
        icon: Crosshair,
      },
      {
        name: "Smart Pick",
        points: "30 / 15 / 5 split",
        risk: "Low Risk",
        riskColor: "#10b981",
        multiplier: "0.6x Odds",
        description: "Spread across three horses to maximize chances.",
        icon: Shield,
      },
    ],
  },
  {
    number: 3,
    title: "Pick Your Horses",
    icon: Crosshair,
    color: "#06b6d4",
    description:
      "Study the race card before each race. You will see each horse's name, jockey, trainer, recent form, and live odds. Use this info to make informed picks before the race begins.",
    details: [
      "View horse stats, jockey info, and form",
      "Check live odds updated in real time",
      "Review past performance data",
      "Lock in your picks before post time",
    ],
  },
  {
    number: 4,
    title: "Earn Points",
    icon: Zap,
    color: "#f59e0b",
    description:
      "When your horse wins, your allocated points are multiplied by the horse's odds. The higher the odds, the bigger the payout.",
    formula: {
      label: "Points Earned = Allocated Points x Odds",
      example: "Example: 50 pts x 4.20 odds = 210 pts earned!",
    },
  },
  {
    number: 5,
    title: "Climb the Rankings",
    icon: TrendingUp,
    color: "#10b981",
    description:
      "Accumulate points across races and tournaments to climb the leaderboard. Compete in daily, weekly, and monthly rankings to prove your horse racing knowledge.",
    details: [
      "Daily leaderboards reset each day",
      "Weekly rankings for consistent performers",
      "Monthly championships for top players",
      "All-time hall of fame",
    ],
  },
];

const faqs = [
  {
    question: "Is it free?",
    answer:
      "Yes, 50POINTS is completely free to play. There are no entry fees, no hidden charges, and no in-app purchases required. Just sign up and start competing.",
  },
  {
    question: "How are odds determined?",
    answer:
      "We use the official track odds as reported by each racetrack. Odds are updated in real time leading up to each race and locked at post time.",
  },
  {
    question: "Can I change my picks?",
    answer:
      "Yes, you can modify your horse selections and strategy at any time before the race starts. Once the race begins (post time), all picks are locked in.",
  },
  {
    question: "What do I win?",
    answer:
      "Right now, you compete for leaderboard rankings, achievements, and bragging rights. We are building toward prizes and rewards in future seasons -- stay tuned!",
  },
];

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HowToPlayPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/3 w-96 h-96 bg-purple/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-cyan/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
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
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple/10 border border-purple/20 text-purple-light text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            Getting Started
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">HOW TO PLAY</h1>
          <p className="text-zinc-500 max-w-xl mx-auto">
            Master the game in five simple steps. Pick horses, earn points, climb the leaderboard.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="space-y-8 mb-20"
        >
          {steps.map((step) => (
            <motion.div key={step.number} variants={fadeUp}>
              <StepCard step={step} />
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
            <p className="text-sm text-zinc-500">Everything else you need to know</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + 0.1 * i }}
                className="glass-card rounded-xl p-5"
              >
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-purple-light flex-shrink-0" />
                  {faq.question}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-center rounded-2xl p-10 bg-gradient-to-br from-purple/15 to-cyan/5 border border-purple/20"
        >
          <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to compete?</h2>
          <p className="text-zinc-400 mb-6 max-w-md mx-auto">
            Join thousands of players and prove your horse racing knowledge. Free to play, forever.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple to-purple-light text-white font-semibold text-sm btn-glow transition-all hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]"
          >
            Create Free Account
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

function StepCard({ step }) {
  const Icon = step.icon;

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden">
      {/* Step Number Background */}
      <div className="absolute -top-4 -right-4 text-[120px] font-black text-white/[0.02] select-none leading-none pointer-events-none">
        {step.number}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: step.color + "18" }}
          >
            <Icon className="w-6 h-6" style={{ color: step.color }} />
          </div>
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-0.5">
              Step {step.number}
            </p>
            <h3 className="text-xl font-bold text-white">{step.title}</h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-zinc-400 leading-relaxed mb-5">
          {step.description}
        </p>

        {/* Details bullets */}
        {step.details && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {step.details.map((detail, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                {detail}
              </div>
            ))}
          </div>
        )}

        {/* Strategies (Step 2) */}
        {step.strategies && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {step.strategies.map((strategy) => {
              const SIcon = strategy.icon;
              return (
                <div
                  key={strategy.name}
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-purple/20 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <SIcon className="w-5 h-5" style={{ color: strategy.riskColor }} />
                    <h4 className="font-semibold text-sm text-white">{strategy.name}</h4>
                  </div>
                  <p className="text-xs text-zinc-500 mb-3">{strategy.description}</p>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-zinc-400">{strategy.points}</span>
                    <span className="text-xs font-medium" style={{ color: strategy.riskColor }}>
                      {strategy.risk}
                    </span>
                    <span className="text-xs text-purple-light">{strategy.multiplier}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Formula (Step 4) */}
        {step.formula && (
          <div className="rounded-xl bg-gradient-to-r from-yellow-500/5 to-yellow-600/[0.02] border border-yellow-500/15 p-5 text-center">
            <p className="text-sm font-semibold text-yellow-400 mb-2">
              {step.formula.label}
            </p>
            <p className="text-lg font-bold text-white">
              {step.formula.example}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
