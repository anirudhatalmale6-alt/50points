"use client";

import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";

export default function Providers({ children }) {
  return (
    <LanguageProvider>
      <AuthProvider>{children}</AuthProvider>
    </LanguageProvider>
  );
}
