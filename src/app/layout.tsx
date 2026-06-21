import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { TooltipProvider } from "@/components/ui/tooltip";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Erick Carvajal | Blockchain Developer & Web3 Builder",
  description:
    "Web3 Builder de LATAM. Solana, Rust, Anchor, Smart Contracts y tecnologías descentralizadas.",
  openGraph: {
    title: "Erick Carvajal | Blockchain Developer",
    description:
      "Web3 Builder de LATAM construyendo el futuro descentralizado.",
    url: "https://neocarvajal.dev",
    siteName: "Erick Carvajal",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Erick Carvajal | Blockchain Developer",
    description:
      "Web3 Builder de LATAM construyendo el futuro descentralizado.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delay={0}>
            <ThemeToggle />
            <main className="flex-1">{children}</main>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
