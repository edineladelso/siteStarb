import type { Metadata } from "next";
import {
  Maven_Pro,
  Montserrat,
  Mukta_Malar,
  Neuton,
  Poppins,
  Spectral,
} from "next/font/google";
import "./globals.css";

const mavenPro = Maven_Pro({
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-maven-pro",
});
const poppins = Poppins({
  weight: "300",
  subsets: ["latin"],
  variable: "--font-poppins",
});
const muktaMalar = Mukta_Malar({
  weight: "300",
  subsets: ["latin"],
  variable: "--font-mukta-malar",
});
const montserrat = Montserrat({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const neuton = Neuton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-neuton",
});
const spectral = Spectral({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-spectral",
});

export const metadata: Metadata = {
  title: "StarB Site",
  description:
    "Site official da Star B criado pelo fundador da Star B (Edinel Mário Adelso). Este é um site de tecnologia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-pt"
      className={`${mavenPro.variable} ${poppins.variable} ${muktaMalar.variable} ${montserrat.variable} ${neuton.variable} ${spectral.variable}`}
    >
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body className="min-h-svh bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="min-h-svh">{children}</div>
      </body>
    </html>
  );
}
