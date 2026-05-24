'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Trophy, ChevronDown, Check } from 'lucide-react';
import { strategies } from './PickSelector';

function JockeySilk({ primary, secondary, size = 24 }) {
  return (
    <div
      className="rounded-sm flex-shrink-0 overflow-hidden flex"
      style={{ width: size, height: size }}
    >
      <div style={{ backgroundColor: primary, width: '50%', height: '100%' }} />
      <div style={{ backgroundColor: secondary, width: '50%', height: '100%' }} />
    </div>
  );
}

function PostBadge({ number }) {
  const colors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
    'bg-purple-500', 'bg-cyan-500', 'bg-orange-500', 'bg-pink-500',
    'bg-indigo-500', 'bg-teal-500', 'bg-amber-500', 'bg-rose-500',
  ];
  return (
    <div className={`w-7 h-7 rounded-full ${colors[(number - 1) % colors.length]} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
      {number}
    </div>
  );
}

export default function RaceCard({
  race,
  activeStrategy,
  selectedHorses,
  onPickHorse,
  isExpanded = true,
  onToggleExpand,
  showHeader = true,
}) {
  const strategy = strategies.find((s) => s.id === activeStrategy);
  const maxPicks = strategy?.maxPicks || 1;
  const allocation = strategy?.allocation || [50];

  const getHorsePoints = (horseId) => {
    const idx = selectedHorses.indexOf(horseId);
    if (idx === -1) return 0;
    return allocation[idx] || 0;
  };

  const isSelected = (horseId) => selectedHorses.includes(horseId);
  const canPick = selectedHorses.length < maxPicks;

  const surfaceColors = {
    Dirt: 'text-amber-400 bg-amber-400/10',
    Turf: 'text-green-400 bg-green-400/10',
    Synthetic: 'text-cyan-400 bg-cyan-400/10',
  };

  const statusColors = {
    completed: 'bg-white/10 text-white/50',
    live: 'bg-red-500/20 text-red-400',
    upcoming: 'bg-purple/20 text-purple-light',
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-lg overflow-hidden">
      {/* Race header */}
      {showHeader && (
        <button
          onClick={onToggleExpand}
          className="w-full flex items-center justify-between p-4 md:p-5 hover:bg-white/[0.02] transition-colors"
        >
          <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
            <div className="bg-gradient-to-br from-purple to-purple-light text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">
              R{race.number}
            </div>
            <div className="text-left min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-white font-semibold text-sm md:text-base truncate">
                  {race.name !== `Race ${race.number}` ? race.name : `CARRERA ${race.number}`}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${statusColors[race.status]}`}>
                  {race.status === 'live' && (
                    <span className="inline-block w-1.5 h-1.5 bg-red-400 rounded-full mr-1 animate-pulse-live" />
                  )}
                  {race.status}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-0.5 text-white/40 text-xs">
                <span>{race.distance}m</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${surfaceColors[race.surface]}`}>
                  {race.surface}
                </span>
                <span className="hidden sm:inline">{race.class}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="hidden md:flex items-center gap-1 text-gold text-xs">
              <Trophy size={12} />
              <span>${race.purse?.toLocaleString()}</span>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-white/40 text-xs">
              <Clock size={12} />
              <span>{race.postTime}</span>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={18} className="text-white/30" />
            </motion.div>
          </div>
        </button>
      )}

      {/* Expandable race content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {/* Race meta bar */}
            <div className="flex items-center gap-4 px-4 md:px-5 py-3 border-t border-b border-white/5 bg-white/[0.01] text-xs text-white/40 flex-wrap">
              <div className="flex items-center gap-1">
                <MapPin size={11} />
                <span>{race.distance}m {race.surface}</span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy size={11} className="text-gold" />
                <span className="text-gold/80">${race.purse?.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={11} />
                <span>{race.postTime}</span>
              </div>
              <span className="text-white/20">{race.class}</span>
              <span className="ml-auto text-white/30">{race.horses.length} runners</span>
            </div>

            {/* Desktop table header */}
            <div className="hidden md:grid grid-cols-[40px_32px_1fr_1fr_1fr_60px_70px_100px] gap-3 px-5 py-2 text-[10px] text-white/30 uppercase tracking-wider font-medium border-b border-white/5">
              <span>#</span>
              <span>Silk</span>
              <span>Horse</span>
              <span>Jockey</span>
              <span>Trainer</span>
              <span className="text-right">Wgt</span>
              <span className="text-right">Odds</span>
              <span className="text-center">Pick</span>
            </div>

            {/* Horse list */}
            <div className="divide-y divide-white/5">
              {race.horses.map((horse, idx) => {
                const selected = isSelected(horse.id);
                const points = getHorsePoints(horse.id);
                const selectionIdx = selectedHorses.indexOf(horse.id);

                return (
                  <motion.div
                    key={horse.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className={`
                      transition-all duration-200
                      ${selected
                        ? 'bg-purple/10 border-l-2 border-l-purple'
                        : 'hover:bg-white/[0.02] border-l-2 border-l-transparent'
                      }
                    `}
                  >
                    {/* Desktop row */}
                    <div className="hidden md:grid grid-cols-[40px_32px_1fr_1fr_1fr_60px_70px_100px] gap-3 items-center px-5 py-3">
                      <PostBadge number={horse.postPosition} />
                      <JockeySilk primary={horse.silkColors.primary} secondary={horse.silkColors.secondary} />
                      <span className="text-white font-semibold text-sm truncate">{horse.name}</span>
                      <span className="text-white/50 text-xs truncate">{horse.jockey}</span>
                      <span className="text-white/40 text-xs truncate">{horse.trainer}</span>
                      <span className="text-white/50 text-xs text-right">{horse.weight}kg</span>
                      <span className="text-gold font-bold text-sm text-right">{horse.odds.toFixed(2)}</span>
                      <div className="flex items-center justify-center gap-2">
                        {selected && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`
                              text-[10px] font-bold px-1.5 py-0.5 rounded
                              ${strategy?.tagColors?.[selectionIdx] || 'bg-purple'} text-white
                            `}
                          >
                            {points}pts
                          </motion.span>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onPickHorse(horse.id)}
                          disabled={!canPick && !selected}
                          className={`
                            px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 min-w-[60px]
                            ${selected
                              ? 'bg-gradient-to-r from-purple to-purple-light text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                              : canPick
                                ? 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10 hover:border-purple/50'
                                : 'bg-white/[0.02] text-white/20 border border-white/5 cursor-not-allowed'
                            }
                          `}
                        >
                          {selected ? (
                            <span className="flex items-center gap-1 justify-center">
                              <Check size={12} />
                              Picked
                            </span>
                          ) : (
                            'Pick'
                          )}
                        </motion.button>
                      </div>
                    </div>

                    {/* Mobile card */}
                    <div className="md:hidden p-3">
                      <div className="flex items-center gap-3">
                        <PostBadge number={horse.postPosition} />
                        <JockeySilk primary={horse.silkColors.primary} secondary={horse.silkColors.secondary} size={20} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-semibold text-sm truncate">{horse.name}</span>
                            <span className="text-gold font-bold text-xs">{horse.odds.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-white/40 mt-0.5">
                            <span className="truncate">{horse.jockey}</span>
                            <span className="text-white/20">|</span>
                            <span className="truncate">{horse.trainer}</span>
                            <span className="text-white/20">|</span>
                            <span>{horse.weight}kg</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {selected && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className={`
                                text-[10px] font-bold px-1.5 py-0.5 rounded
                                ${strategy?.tagColors?.[selectionIdx] || 'bg-purple'} text-white
                              `}
                            >
                              {points}pts
                            </motion.span>
                          )}
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onPickHorse(horse.id)}
                            disabled={!canPick && !selected}
                            className={`
                              w-9 h-9 rounded-lg flex items-center justify-center transition-all
                              ${selected
                                ? 'bg-gradient-to-r from-purple to-purple-light text-white shadow-[0_0_12px_rgba(124,58,237,0.4)]'
                                : canPick
                                  ? 'bg-white/5 text-white/50 border border-white/10'
                                  : 'bg-white/[0.02] text-white/15 border border-white/5 cursor-not-allowed'
                              }
                            `}
                          >
                            {selected ? <Check size={14} /> : '+'}
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
