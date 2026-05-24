'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Calendar, Users, Trophy, Clock, ChevronLeft,
  Flame, Timer, CheckCircle2, ArrowRight, Zap,
} from 'lucide-react';
import { getTournamentById } from '@/lib/raceData';
import RaceCard from '@/components/RaceCard';
import PickSelector, { strategies } from '@/components/PickSelector';
import TicketSummary from '@/components/TicketSummary';
import TicketConfirmation from '@/components/TicketConfirmation';

export default function TournamentClient() {
  const params = useParams();
  const tournament = useMemo(() => getTournamentById(params.id), [params.id]);

  const [expandedRace, setExpandedRace] = useState(null);
  const [activeStrategy, setActiveStrategy] = useState('full');
  const [picks, setPicks] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedRace, setConfirmedRace] = useState(null);
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });

  const nextRace = useMemo(() => {
    if (!tournament) return null;
    return tournament.races.find((r) => r.status === 'upcoming' || r.status === 'live') || tournament.races[tournament.races.length - 1];
  }, [tournament]);

  useEffect(() => {
    const targetTime = new Date();
    targetTime.setHours(targetTime.getHours() + 1, 23, 0, 0);

    const tick = () => {
      const now = new Date();
      const diff = Math.max(0, targetTime - now);
      setCountdown({
        hours: Math.floor(diff / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentRacePicks = expandedRace ? (picks[expandedRace] || []) : [];
  const currentRace = tournament?.races.find((r) => r.id === expandedRace);
  const strategy = strategies.find((s) => s.id === activeStrategy);
  const totalPointsRemaining = 50 - (strategy?.allocation?.slice(0, currentRacePicks.length).reduce((s, v) => s + v, 0) || 0);
  const isPicksComplete = currentRacePicks.length === (strategy?.maxPicks || 1);

  const handlePickHorse = useCallback((horseId) => {
    if (!expandedRace) return;
    setPicks((prev) => {
      const racePicks = prev[expandedRace] || [];
      if (racePicks.includes(horseId)) {
        return { ...prev, [expandedRace]: racePicks.filter((id) => id !== horseId) };
      }
      const maxPicks = strategies.find((s) => s.id === activeStrategy)?.maxPicks || 1;
      if (racePicks.length >= maxPicks) return prev;
      return { ...prev, [expandedRace]: [...racePicks, horseId] };
    });
  }, [expandedRace, activeStrategy]);

  const handleStrategyChange = useCallback((strategyId) => {
    setActiveStrategy(strategyId);
    if (expandedRace) {
      setPicks((prev) => ({ ...prev, [expandedRace]: [] }));
    }
  }, [expandedRace]);

  const handleConfirm = useCallback(() => {
    setConfirmedRace(expandedRace);
    setShowConfirmation(true);
  }, [expandedRace]);

  const handleCloseConfirmation = useCallback(() => {
    setShowConfirmation(false);
    setConfirmedRace(null);
  }, []);

  const toggleRace = useCallback((raceId) => {
    setExpandedRace((prev) => (prev === raceId ? null : raceId));
  }, []);

  if (!tournament) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">🏇</div>
          <p className="text-white/40">Torneo no encontrado</p>
          <a href="/" className="text-purple-light text-sm mt-2 inline-block hover:underline">
            Volver al Inicio
          </a>
        </div>
      </div>
    );
  }

  const statusConfig = {
    live: { label: 'EN VIVO', color: 'bg-red-500', glow: 'shadow-[0_0_20px_rgba(239,68,68,0.5)]', textColor: 'text-red-400' },
    upcoming: { label: 'PROXIMO', color: 'bg-purple', glow: 'shadow-[0_0_20px_rgba(124,58,237,0.3)]', textColor: 'text-purple-light' },
    completed: { label: 'COMPLETADO', color: 'bg-white/20', glow: '', textColor: 'text-white/50' },
  };
  const status = statusConfig[tournament.status];

  return (
    <div className="min-h-screen bg-brand-dark">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple/10 via-brand-dark to-brand-dark" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple/5 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-8">
          <a href="/" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-6 transition-colors">
            <ChevronLeft size={16} />
            <span>Volver a Torneos</span>
          </a>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-white ${status.color} ${status.glow}`}>
                  {tournament.status === 'live' && (
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse-live" />
                  )}
                  {status.label}
                </span>
              </div>

              <p className="text-[11px] text-purple-light uppercase tracking-[0.2em] font-bold mb-2">TORNEO</p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-1 leading-tight">
                {tournament.name}
              </h1>

              <p className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-light to-cyan bg-clip-text text-transparent mb-2">
                POINT RUSH
              </p>

              <p className="text-sm sm:text-base font-bold text-white/60 uppercase tracking-widest mb-3">
                {tournament.track}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-cyan" />
                  <span>{tournament.track}, {tournament.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-purple-light" />
                  <span>{new Date(tournament.date).toLocaleDateString('es-ES', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>

              <p className="text-white/30 text-sm mt-3 max-w-2xl">
                {tournament.description}
              </p>

              <a
                href={nextRace ? `/tournament/${tournament.id}/race/${nextRace.id}` : '#'}
                className="mt-5 inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple to-purple-light hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-shadow"
              >
                HACER MI TICKET AHORA
                <ArrowRight size={16} />
              </a>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/[0.03] backdrop-blur-lg border border-white/10 rounded-xl p-5 lg:min-w-[280px]"
            >
              <div className="text-center mb-4">
                <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Jugadores Activos</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-light to-cyan bg-clip-text text-transparent">
                  {tournament.playersJoined.toLocaleString()}
                </p>
                <p className="text-xs text-white/30 mt-1">de {tournament.totalPlayers.toLocaleString()} cupos</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40 flex items-center gap-1.5"><Users size={12} />Participacion</span>
                  <span className="text-white font-medium">{Math.round((tournament.playersJoined / tournament.totalPlayers) * 100)}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple to-cyan rounded-full"
                    style={{ width: `${(tournament.playersJoined / tournament.totalPlayers) * 100}%` }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-32 lg:pb-12">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-3 gap-3 mb-6">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/[0.03] border border-white/10 rounded-xl p-3 text-center backdrop-blur-lg">
                <div className="flex items-center justify-center gap-1.5 text-green-400 mb-1">
                  <CheckCircle2 size={14} />
                  <span className="text-lg font-bold">{tournament.racesCompleted}</span>
                </div>
                <p className="text-[10px] text-white/40 uppercase tracking-wider">Completadas</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white/[0.03] border border-white/10 rounded-xl p-3 text-center backdrop-blur-lg">
                <div className="flex items-center justify-center gap-1.5 text-red-400 mb-1">
                  <Flame size={14} />
                  <span className="text-lg font-bold">{tournament.races.filter((r) => r.status === 'live').length}</span>
                </div>
                <p className="text-[10px] text-white/40 uppercase tracking-wider">En Vivo</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/[0.03] border border-white/10 rounded-xl p-3 text-center backdrop-blur-lg">
                <div className="flex items-center justify-center gap-1.5 text-purple-light mb-1">
                  <Timer size={14} />
                  <span className="text-lg font-bold">{tournament.races.filter((r) => r.status === 'upcoming').length}</span>
                </div>
                <p className="text-[10px] text-white/40 uppercase tracking-wider">Proximas</p>
              </motion.div>
            </div>

            <AnimatePresence>
              {expandedRace && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-4 overflow-hidden">
                  <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4 backdrop-blur-lg">
                    <PickSelector activeStrategy={activeStrategy} onStrategyChange={handleStrategyChange} picksCount={currentRacePicks.length} totalPoints={totalPointsRemaining} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Zap size={18} className="text-purple-light" />
                Programa de Carreras
              </h2>
              <span className="text-xs text-white/30">{tournament.totalRaces} carreras</span>
            </div>

            <div className="space-y-3">
              {tournament.races.map((race, idx) => (
                <motion.div key={race.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * idx }}>
                  <RaceCard
                    race={race}
                    activeStrategy={activeStrategy}
                    selectedHorses={picks[race.id] || []}
                    onPickHorse={expandedRace === race.id ? handlePickHorse : () => {}}
                    isExpanded={expandedRace === race.id}
                    onToggleExpand={() => toggleRace(race.id)}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[320px] flex-shrink-0 space-y-4">
            {nextRace && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/[0.03] backdrop-blur-lg border border-white/10 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={14} className="text-cyan" />
                  <span className="text-xs text-white/40 uppercase tracking-wider font-medium">Proxima Carrera En</span>
                </div>
                <div className="flex items-center justify-center gap-3 mb-4">
                  {[
                    { value: countdown.hours, label: 'HRS' },
                    { value: countdown.minutes, label: 'MIN' },
                    { value: countdown.seconds, label: 'SEC' },
                  ].map((unit) => (
                    <div key={unit.label} className="text-center">
                      <div className="bg-white/[0.05] border border-white/10 rounded-lg w-16 h-16 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white font-mono">{String(unit.value).padStart(2, '0')}</span>
                      </div>
                      <span className="text-[9px] text-white/30 uppercase tracking-widest mt-1 block">{unit.label}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-white/[0.03] rounded-lg p-3 border border-white/5">
                  <p className="text-xs text-white/50">
                    <span className="text-white font-semibold">CARRERA {nextRace.number}</span>
                    <span className="mx-1.5 text-white/20">|</span>
                    {nextRace.distance}m {nextRace.surface}
                  </p>
                  <p className="text-[10px] text-white/30 mt-0.5">{nextRace.class} - Post time {nextRace.postTime}</p>
                </div>
                <a
                  href={`/tournament/${tournament.id}/race/${nextRace.id}`}
                  className="mt-3 w-full py-2.5 rounded-lg text-center text-xs font-bold text-white bg-gradient-to-r from-purple to-purple-light block hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-shadow"
                >
                  <div className="flex items-center justify-center gap-1.5">
                    Ver Carrera Completa
                    <ArrowRight size={12} />
                  </div>
                </a>
              </motion.div>
            )}

            {expandedRace && currentRace && (
              <TicketSummary raceNumber={currentRace.number} activeStrategy={activeStrategy} selectedHorses={currentRacePicks} horses={currentRace.horses} totalPoints={totalPointsRemaining} onConfirm={handleConfirm} isComplete={isPicksComplete} />
            )}

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/[0.03] backdrop-blur-lg border border-white/10 rounded-xl p-5">
              <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Info del Torneo</h3>
              <div className="space-y-3">
                <InfoRow label="Pista" value={tournament.track} />
                <InfoRow label="Ubicacion" value={tournament.location} />
                <InfoRow label="Fecha" value={new Date(tournament.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' })} />
                <InfoRow label="Carreras" value={`${tournament.racesCompleted} / ${tournament.totalRaces}`} />
                <InfoRow label="Entrada" value="Gratis" />
                <InfoRow label="Tipo" value="Competencia de Puntos" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white/[0.03] backdrop-blur-lg border border-white/10 rounded-xl p-5">
              <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Como Funciona</h3>
              <div className="space-y-2.5 text-xs text-white/50">
                <div className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple/20 text-purple-light flex items-center justify-center text-[10px] font-bold flex-shrink-0">1</span>
                  <p>En cada carrera, distribuye <span className="text-gold font-semibold">50 puntos</span> entre tus selecciones</p>
                </div>
                <div className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple/20 text-purple-light flex items-center justify-center text-[10px] font-bold flex-shrink-0">2</span>
                  <p>Elige una estrategia: Full, Dual o Smart Pick</p>
                </div>
                <div className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple/20 text-purple-light flex items-center justify-center text-[10px] font-bold flex-shrink-0">3</span>
                  <p>Puntos x Cuota = tu puntuacion si tu seleccion gana</p>
                </div>
                <div className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple/20 text-purple-light flex items-center justify-center text-[10px] font-bold flex-shrink-0">4</span>
                  <p>El mayor puntaje total en todas las carreras gana!</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {confirmedRace && (
        <TicketConfirmation
          isOpen={showConfirmation}
          onClose={handleCloseConfirmation}
          raceName={currentRace?.name}
          raceNumber={currentRace?.number}
          activeStrategy={activeStrategy}
          selectedHorses={picks[confirmedRace] || []}
          horses={tournament.races.find((r) => r.id === confirmedRace)?.horses || []}
          tournamentId={tournament.id}
        />
      )}
    </div>
  );
}

function InfoRow({ label, value, highlight = false }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-white/30">{label}</span>
      <span className={`text-xs font-medium ${highlight ? 'text-gold font-bold' : 'text-white/70'}`}>{value}</span>
    </div>
  );
}
