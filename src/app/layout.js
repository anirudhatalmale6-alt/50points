import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "50POINTS - La Competencia Definitiva de Carreras de Caballos",
  description:
    "Elige tus caballos. Gana puntos. Domina la clasificacion. Plataforma gratuita de torneos de carreras de caballos con carreras en vivo y rankings competitivos.",
  keywords: ["carreras de caballos", "torneo", "competencia", "clasificacion", "gratis", "horse racing", "tournament"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased bg-brand-dark text-zinc-100 min-h-screen`}
      >
        <Providers>
          <Header />
          <main className="pt-16 pb-16 md:pb-0">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
