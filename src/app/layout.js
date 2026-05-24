import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "50POINTS - The Ultimate Horse Racing Competition",
  description:
    "Pick your horses. Earn points. Dominate the leaderboard. Free-to-play horse racing tournament platform with live races and competitive rankings.",
  keywords: ["horse racing", "tournament", "competition", "leaderboard", "free to play"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased bg-brand-dark text-zinc-100 min-h-screen`}
      >
        <Header />
        <main className="pt-16 pb-16 md:pb-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
