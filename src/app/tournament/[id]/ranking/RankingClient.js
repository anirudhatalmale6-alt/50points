'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, Trophy, Activity, MessageCircle, Info,
  MapPin, Calendar, Users, Zap,
} from 'lucide-react';
import Link from 'next/link';
import { getTournamentById } from '@/lib/raceData';
import { getRankingData } from '@/lib/rankingData';
import FloatingTicketBar from '@/components/FloatingTicketBar';
import TournamentRanking from '@/components/TournamentRanking';
import RealTimeRanking from '@/components/RealTimeRanking';
import TournamentChat from '@/components/TournamentChat';

const tabs = [
  { id: 'ranking', label: 'Ranking', icon: Trophy },
  { id: 'live', label: 'En Vivo', icon: Activity },
  { id: 'chat', label: 'Chat', icon: MessageCircle },
];

export default function RankingClient() {
  const params = useParams();
  const tournament = useMemo(() => getTournamentById(params.id), [params.id]);
  const rankingData = useMemo(() => getRankingData(params.id), [params.id]);
  const [activeTab, setActiveTab] = useState('ranking');
  const [activeTicketIndex, setActiveTicketIndex] = useState(0);

  if (!tournament) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">🏇</div>
          <p className="text-white/40">Torneo no encontrado</p>
          <Link href="/" className="text-purple-light text-sm mt-2 inline-block hover:underline">
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  const statusConfig = {
    live: { label: 'EN VIVO', color: 'bg-red-500', glow: 'shadow-[0_0_20px_rgba(239,68,68,0.5)]' },
    upcoming: { label: 'PROXIMO', color: 'bg-purple', glow: 'shadow-[0_0_20px_rgba(124,58,237,0.3)]' },
    completed: { label: 'COMPLETADO', color: 'bg-white/20', glow: '' },
  };
  const status = statusConfig[tournament.status];

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/50points/images/live-feed.jpg" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-brand-dark/90 to-brand-dark" />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple/5 rounded-full blur-[100px]" />

        <div className="relative max-w-lg mx-auto px-4 pt-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <Link
              href={`/tournament/${tournament.id}`}
              className="inline-flex items-center gap-1 text-white/40 hover:text-white/70 text-sm transition-colors"
            >
              <ChevronLeft size={16} />
              <span>Carreras</span>
            </Link>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white ${status.color} ${status.glow}`}>
              {tournament.status === 'live' && (
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse-live" />
              )}
              {status.label}
            </span>
          </div>

          <h1 className="text-xl font-bold text-white mb-0.5">{tournament.name}</h1>
          <div className="flex items-center gap-3 text-xs text-white/40">
            <span className="flex items-center gap-1">
              <MapPin size={11} className="text-cyan" />
              {tournament.track}
            </span>
            <span className="flex items-center gap-1">
              <Users size={11} className="text-purple-light" />
              {tournament.playersJoined.toLocaleString()} jugadores
            </span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-lg mx-auto px-4 pb-24">
        {/* Floating Ticket Bar */}
        <div className="mb-4">
          <FloatingTicketBar
            tickets={rankingData.userTickets}
            autoRotate={true}
            rotateInterval={5000}
          />
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-4 p-1 rounded-xl bg-white/[0.03] border border-white/5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-purple/20 to-cyan/10 text-white border border-white/10'
                    : 'text-white/30 hover:text-white/50'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-purple-light' : ''} />
                {tab.label}
                {tab.id === 'live' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'ranking' && (
              <TournamentRanking data={rankingData} />
            )}
            {activeTab === 'live' && (
              <RealTimeRanking
                data={rankingData}
                activeTicket={rankingData.userTickets[activeTicketIndex]}
              />
            )}
            {activeTab === 'chat' && (
              <TournamentChat />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-brand-dark/95 backdrop-blur-xl border-t border-white/5 z-40">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-around">
          <Link
            href={`/tournament/${tournament.id}`}
            className="flex flex-col items-center gap-1 text-white/30 hover:text-white/60 transition-colors"
          >
            <Zap size={18} />
            <span className="text-[10px]">Carreras</span>
          </Link>
          <button className="flex flex-col items-center gap-1 text-purple-light">
            <Trophy size={18} />
            <span className="text-[10px] font-bold">Ranking</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'chat' ? 'text-cyan' : 'text-white/30 hover:text-white/60'}`}
          >
            <MessageCircle size={18} />
            <span className="text-[10px]">Chat</span>
          </button>
          <Link
            href={`/tournament/${tournament.id}`}
            className="flex flex-col items-center gap-1 text-white/30 hover:text-white/60 transition-colors"
          >
            <Info size={18} />
            <span className="text-[10px]">Info</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
