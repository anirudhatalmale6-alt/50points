"use client";

import { Users, MapPin, Calendar, ChevronRight } from "lucide-react";
import AnimateInView from "@/components/AnimateInView";
import { tournaments as raceDataTournaments } from "@/lib/raceData";

export default function TournamentsPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple/10 via-brand-dark to-brand-dark" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple/5 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-6">
          <AnimateInView>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan animate-pulse-live" />
              <span className="text-xs font-semibold text-cyan uppercase tracking-widest">
                EN VIVO
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3">
              TORNEOS
            </h1>
            <p className="text-zinc-500 text-sm sm:text-base max-w-lg">
              Explora todos los torneos disponibles. Elige un hipodromo, selecciona tus caballos y compite por la cima.
            </p>
          </AnimateInView>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-32 lg:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {raceDataTournaments.map((t, i) => (
            <AnimateInView key={t.id} delay={i * 0.1}>
              <a
                href={`/tournament/${t.id}`}
                className="block glass-card rounded-2xl overflow-hidden group hover:glow-purple transition-all duration-500 gradient-border"
              >
                <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-light transition-colors">
                        {t.name}
                      </h2>
                      <div className="flex items-center gap-1.5 mt-1 text-xs text-zinc-500">
                        <MapPin className="w-3 h-3" />
                        <span>{t.track}, {t.location}</span>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ${
                        t.status === "live"
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {t.status === "live" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-live" />
                      )}
                      {t.status === "live" ? "EN VIVO" : "PROXIMO"}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-zinc-400">
                        Carrera {t.racesCompleted} de {t.totalRaces}
                      </span>
                      <span className="text-zinc-500">
                        <Calendar className="w-3 h-3 inline mr-1" />
                        {new Date(t.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple to-cyan rounded-full transition-all duration-500"
                        style={{
                          width: `${(t.racesCompleted / t.totalRaces) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-zinc-600 mb-4 line-clamp-2">{t.description}</p>

                  <div className="flex items-center gap-4 text-xs text-zinc-500 mb-5">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-purple-light" />
                      <span>{t.playersJoined.toLocaleString()} jugadores</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span>{t.totalRaces} carreras</span>
                    </div>
                  </div>

                  <div className="w-full py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-purple to-purple-light rounded-xl btn-glow opacity-90 group-hover:opacity-100 transition-opacity text-center flex items-center justify-center gap-1">
                    Entrar al Torneo
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </a>
            </AnimateInView>
          ))}
        </div>
      </div>
    </div>
  );
}
