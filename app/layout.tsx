import type { ReactNode } from "react";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import { APP_NAME } from "@/lib/config";
import "./globals.css";

// Polices auto-hébergées (paquets @fontsource-variable) : pas de dépendance au réseau au moment du build.
const display = localFont({
  src: "../node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-opsz-normal.woff2",
  weight: "200 800",
  variable: "--font-display",
});
const text = localFont({
  src: "../node_modules/@fontsource-variable/figtree/files/figtree-latin-wght-normal.woff2",
  weight: "300 900",
  variable: "--font-text",
});

export const metadata = {
  title: APP_NAME,
  description: "Build your career profile through AI conversations, then find the people and opportunities to move forward.",
  icons: { icon: "/brand/alumnia-symbole.svg", apple: "/brand/icone-app.svg" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable}`}>
      <body>
        {children}
        {/* Un seul Toaster pour toute l'app (règle Sonner). Style : encre, pilule, pastille jaune. */}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "var(--ink)",
              color: "#fff",
              borderRadius: "999px",
              border: "none",
              fontWeight: 700,
            },
            classNames: { description: "toast-badge" },
          }}
        />
      </body>
    </html>
  );
}
