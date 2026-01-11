import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Maven_Pro, Poppins, Mukta_Malar, Montserrat, Neuton, Spectral } from "next/font/google";

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
  title: "StarB Vagas",
  description:
    "Criado no processo de aprendizagem do next js para cadastrar usuarios e fornecer funcionalidades ilustrativas para busca e gerenciamento de vagas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-pt" className={`${mavenPro.variable} ${poppins.variable} ${muktaMalar.variable} ${montserrat.variable} ${neuton.variable} ${spectral.variable}`}>
      <body>
        <SidebarProvider>
          <AppSidebar />
          <div className="flex min-h-screen w-full flex-col">
            <Header />
            <main className="flex flex-1">{children}</main>
            <Footer />
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
