import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TestApi } from "./components/TestApi";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ReciclaWeb - Educação Ambiental Digital",
  description: "Aprenda sobre reciclagem de forma interativa e divertida. Teste seus conhecimentos sobre separação de resíduos.",
  keywords: "reciclagem, educação ambiental, sustentabilidade, coleta seletiva",
  authors: [{ name: "João Vitor Tortorello" }, { name: "Eduardo Augusto Clara Olivato" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
     </body>
    </html>
  );
}
