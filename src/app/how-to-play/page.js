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
    title: "Unete a un Torneo",
    icon: Users,
    color: "#7c3aed",
    description:
      "Explora torneos en vivo y proximos de los mejores hipodromos del mundo. Cada torneo es gratuito y abierto a todos los jugadores. Simplemente selecciona un torneo para comenzar.",
    details: [
      "Torneos diarios en los principales hipodromos",
      "Completamente gratis para participar",
      "Compite contra miles de jugadores",
      "Multiples carreras por torneo",
    ],
  },
  {
    number: 2,
    title: "Elige tu Estrategia",
    icon: Target,
    color: "#a855f7",
    description:
      "Tienes 50 puntos por carrera para asignar a tus selecciones de caballos. Elige entre tres estrategias que se adapten a tu nivel de riesgo.",
    strategies: [
      {
        name: "Full Point",
        points: "50 pts en 1 caballo",
        risk: "Alto Riesgo",
        riskColor: "#ef4444",
        multiplier: "1x Cuota",
        description: "Apuesta todo a un solo caballo para la maxima recompensa.",
        icon: Flame,
      },
      {
        name: "Dual Point",
        points: "25 + 25 dividido",
        risk: "Riesgo Medio",
        riskColor: "#f59e0b",
        multiplier: "0.8x Cuota",
        description: "Divide entre dos caballos para un riesgo equilibrado.",
        icon: Crosshair,
      },
      {
        name: "Smart Pick",
        points: "30 / 15 / 5 dividido",
        risk: "Bajo Riesgo",
        riskColor: "#10b981",
        multiplier: "0.6x Cuota",
        description: "Distribuye entre tres caballos para maximizar tus chances.",
        icon: Shield,
      },
    ],
  },
  {
    number: 3,
    title: "Elige tus Caballos",
    icon: Crosshair,
    color: "#06b6d4",
    description:
      "Estudia la tarjeta de carrera antes de cada competencia. Veras el nombre de cada caballo, jockey, entrenador, forma reciente y cuotas en vivo. Usa esta informacion para hacer selecciones informadas antes de que comience la carrera.",
    details: [
      "Ve estadisticas del caballo, info del jockey y forma",
      "Consulta cuotas en vivo actualizadas en tiempo real",
      "Revisa datos de rendimiento pasado",
      "Confirma tus selecciones antes del inicio",
    ],
  },
  {
    number: 4,
    title: "Gana Puntos",
    icon: Zap,
    color: "#f59e0b",
    description:
      "Cuando tu caballo gana, tus puntos asignados se multiplican por la cuota del caballo. Cuanto mayor sea la cuota, mayor sera la recompensa.",
    formula: {
      label: "Puntos Ganados = Puntos Asignados x Cuota",
      example: "Ejemplo: 50 pts x 4.20 cuota = 210 pts ganados!",
    },
  },
  {
    number: 5,
    title: "Sube en el Ranking",
    icon: TrendingUp,
    color: "#10b981",
    description:
      "Acumula puntos en carreras y torneos para subir en la clasificacion. Compite en rankings diarios, semanales y mensuales para demostrar tu conocimiento en carreras de caballos.",
    details: [
      "Clasificaciones diarias se reinician cada dia",
      "Rankings semanales para jugadores constantes",
      "Campeonatos mensuales para los mejores",
      "Salon de la fama historico",
    ],
  },
];

const faqs = [
  {
    question: "Es gratis?",
    answer:
      "Si, 50POINTS es completamente gratis para jugar. No hay tarifas de entrada, cargos ocultos ni compras dentro de la app. Solo registrate y comienza a competir.",
  },
  {
    question: "Como se determinan las cuotas?",
    answer:
      "Usamos las cuotas oficiales del hipodromo reportadas por cada pista. Las cuotas se actualizan en tiempo real antes de cada carrera y se bloquean al momento del inicio.",
  },
  {
    question: "Puedo cambiar mis selecciones?",
    answer:
      "Si, puedes modificar tus selecciones de caballos y estrategia en cualquier momento antes de que comience la carrera. Una vez que la carrera inicia, todas las selecciones quedan bloqueadas.",
  },
  {
    question: "Que puedo ganar?",
    answer:
      "Actualmente, compites por posiciones en la clasificacion, logros y derechos de presumir. Estamos trabajando en premios y recompensas para futuras temporadas -- mantente atento!",
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
          Volver al Inicio
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
            Primeros Pasos
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">COMO JUGAR</h1>
          <p className="text-zinc-500 max-w-xl mx-auto">
            Domina el juego en cinco simples pasos. Elige caballos, gana puntos, sube en la clasificacion.
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
            <h2 className="text-2xl font-bold mb-2">Preguntas Frecuentes</h2>
            <p className="text-sm text-zinc-500">Todo lo que necesitas saber</p>
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Listo para competir?</h2>
          <p className="text-zinc-400 mb-6 max-w-md mx-auto">
            Unete a miles de jugadores y demuestra tu conocimiento en carreras de caballos. Gratis para jugar, siempre.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple to-purple-light text-white font-semibold text-sm btn-glow transition-all hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]"
          >
            Crear Cuenta Gratis
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
              Paso {step.number}
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
