import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HelpSphere - दान करें, स्वयंसेवा करें और वास्तविक प्रभाव देखें",
  description: "HelpSphere दानदाताओं, स्वयंसेवकों और सत्यापित NGOs को जोड़ता है। हर रुपये को ट्रैक करें और पूर्ण पारदर्शिता के साथ वास्तविक प्रभाव देखें।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi">
      <body className={`${inter.variable} ${outfit.variable}`}>
        {children}
      </body>
    </html>
  );
}
