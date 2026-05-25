import Link from "next/link";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-brand-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-purple to-purple-light">
                <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold">
                <span className="text-gradient-purple-cyan">50</span>
                <span className="text-white">POINTS</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed">
              La plataforma favorita de los amantes de las carreras de caballos, donde los jugadores se convierten en competidores.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Plataforma</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Torneos", href: "/tournaments" },
                { label: "Clasificacion", href: "/leaderboard" },
                { label: "Como Jugar", href: "/how-to-play" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-zinc-500 hover:text-purple-light transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Cuenta</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Iniciar Sesion", href: "/login" },
                { label: "Registrarse", href: "/register" },
                { label: "Perfil", href: "/profile" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-zinc-500 hover:text-purple-light transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {["Terminos de Servicio", "Politica de Privacidad", "Juego Responsable"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-zinc-600 cursor-default">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} 50POINTS. Todos los derechos reservados. Esta es una plataforma gratuita. Sin apuestas con dinero real.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-zinc-600">Solo +18</span>
            <span className="text-xs text-zinc-700">|</span>
            <span className="text-xs text-zinc-600">Juega Responsablemente</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
