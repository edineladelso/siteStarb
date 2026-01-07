import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "StarB Vagas",
  description: "Criado no processo de aprendizagem do next js para cadastrar usuarios e fornecer funcionalidades ilustrativas para busca e gerenciamento de vagas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-pt">
      <body className="min-h-screen flex flex-col">
        <header>
          <Navbar />
        </header>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
