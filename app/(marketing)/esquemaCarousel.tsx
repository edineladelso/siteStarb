"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

// Componente de ícones (substitua pelos seus ícones reais)
const BookIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const CodeIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const AcademicIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M12 14l9-5-9-5-9 5 9 5z" />
    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
  </svg>
);

const AIIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const StarBHomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const recursosHome = [
    {
      titulo: "Biblioteca Técnica",
      descricao: "Livros de engenharia, programação e ciências exatas organizados por área",
      href: "/biblioteca/livros",
      icon: <BookIcon />,
      badge: "500+ Livros"
    },
    {
      titulo: "Softwares Profissionais",
      descricao: "Tutoriais e documentação de ferramentas como AutoCAD, MATLAB, SolidWorks",
      href: "/softwares",
      icon: <CodeIcon />,
    },
    {
      titulo: "Artigos Científicos",
      descricao: "Papers, pesquisas e estudos técnicos comentados e organizados",
      href: "/artigos",
      icon: <AcademicIcon />,
    },
    {
      titulo: "IA & Machine Learning",
      descricao: "Formação estruturada em inteligência artificial e aprendizado de máquina",
      href: "/ia",
      icon: <AIIcon />,
      badge: "Novo"
    },
  ];

  const itensPremium = [
    {
      titulo: "Cursos Aprofundados",
      descricao: "Trilhas completas de estudo guiado em tópicos avançados",
      href: "/premium/cursos"
    },
    {
      titulo: "Webinars & Workshops",
      descricao: "Sessões ao vivo com especialistas da indústria",
      href: "/premium/webinars"
    },
    {
      titulo: "Projetos Práticos",
      descricao: "Casos reais de engenharia com dados e análises completas",
      href: "/premium/projetos"
    },
    {
      titulo: "Mentoria Individual",
      descricao: "Suporte direto de engenheiros experientes",
      href: "/premium/mentoria"
    },
  ];

  // Dados do carousel (substitua pelas suas imagens reais)
  const imgCarousel = [
    { src: "/images/hero1.jpg", alt: "Engineering Books" },
    { src: "/images/hero2.jpg", alt: "Technical Software" },
    { src: "/images/hero3.jpg", alt: "AI Learning" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-blue-100 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center transform transition-transform group-hover:scale-110">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                Star B
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/biblioteca" className="text-sm font-medium text-slate-700 hover:text-blue-700 transition-colors">
                Biblioteca
              </Link>
              <Link href="/softwares" className="text-sm font-medium text-slate-700 hover:text-blue-700 transition-colors">
                Softwares
              </Link>
              <Link href="/artigos" className="text-sm font-medium text-slate-700 hover:text-blue-700 transition-colors">
                Artigos
              </Link>
              <Link href="/ia" className="text-sm font-medium text-slate-700 hover:text-blue-700 transition-colors">
                IA
              </Link>
              <Link href="/premium" className="text-sm font-medium text-slate-700 hover:text-blue-700 transition-colors">
                Premium
              </Link>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="hidden md:flex">
                Entrar
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Começar Grátis
              </Button>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-blue-50"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-blue-100 bg-white">
            <div className="px-4 py-4 space-y-3">
              <Link href="/biblioteca" className="block py-2 text-sm font-medium text-slate-700">Biblioteca</Link>
              <Link href="/softwares" className="block py-2 text-sm font-medium text-slate-700">Softwares</Link>
              <Link href="/artigos" className="block py-2 text-sm font-medium text-slate-700">Artigos</Link>
              <Link href="/ia" className="block py-2 text-sm font-medium text-slate-700">IA</Link>
              <Link href="/premium" className="block py-2 text-sm font-medium text-slate-700">Premium</Link>
            </div>
          </div>
        )}
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 space-y-16 sm:space-y-24 lg:space-y-32">
        {/* HERO SECTION - Magnifico e Moderno */}
        <section className="relative">
          {/* Background decorativo */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Hero Content */}
            <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/50 animate-pulse-slow">
                <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                <span>Plataforma de Engenharia Profissional</span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
                <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                  Conhecimento Técnico
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Sério & Profundo
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl">
                A Star B é uma plataforma de aprendizagem técnica focada em{" "}
                <span className="font-semibold text-blue-700">livros de engenharia</span>,{" "}
                <span className="font-semibold text-indigo-700">softwares profissionais</span>,{" "}
                <span className="font-semibold text-purple-700">artigos científicos</span> e{" "}
                <span className="font-semibold text-blue-700">formação em IA</span> — 
                organizada para quem quer compreender profundamente.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-blue-100 shadow-sm">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">500+</div>
                  <div className="text-xs sm:text-sm text-slate-600 mt-1">Livros</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-blue-100 shadow-sm">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">50+</div>
                  <div className="text-xs sm:text-sm text-slate-600 mt-1">Softwares</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-blue-100 shadow-sm">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">1000+</div>
                  <div className="text-xs sm:text-sm text-slate-600 mt-1">Artigos</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-base font-semibold shadow-xl shadow-blue-500/30 h-14 px-8"
                >
                  <Link href="/biblioteca/livros">
                    Explorar Biblioteca
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="border-2 border-blue-200 hover:bg-blue-50 text-base font-semibold h-14 px-8"
                >
                  <Link href="/softwares">Ver Softwares</Link>
                </Button>
              </div>
            </div>

            {/* Hero Visual - Carousel moderno */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/20">
                {/* Placeholder para o carousel - substitua com suas imagens reais */}
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <BookIcon />
                    <p className="mt-4 text-xl font-bold">Carousel de Imagens</p>
                    <p className="text-sm opacity-90 mt-2">Substitua com suas imagens reais</p>
                  </div>
                </div>
                
                {/* Overlay decorativo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              </div>

              {/* Elementos decorativos flutuantes */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500 rounded-full opacity-20 blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-indigo-500 rounded-full opacity-20 blur-2xl animate-pulse animation-delay-2000"></div>
            </div>
          </div>
        </section>

        {/* Separator com estilo */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-6 text-sm text-slate-500">
              ✦
            </span>
          </div>
        </div>

        {/* RECURSOS PRINCIPAIS */}
        <section className="space-y-10 lg:space-y-12">
          <header className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
              O que você encontra na Star B
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
              Aqui o foco é <span className="font-semibold text-blue-700">domínio intelectual</span>: entender conceitos, ferramentas e tecnologias de forma estruturada para aplicação profissional real.
            </p>
          </header>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {recursosHome.map((recurso, index) => (
              <Tooltip key={recurso.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={recurso.href}
                    className="group relative block rounded-2xl border-2 border-blue-100 bg-white/60 backdrop-blur-sm p-6 lg:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1 hover:border-blue-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {recurso.badge && (
                      <span className="absolute top-4 right-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 text-xs font-semibold shadow-lg">
                        {recurso.badge}
                      </span>
                    )}
                    
                    <div className="text-blue-600 mb-4 transform transition-transform group-hover:scale-110">
                      {recurso.icon}
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                      {recurso.titulo}
                    </h3>
                    
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {recurso.descricao}
                    </p>

                    <div className="mt-4 flex items-center text-blue-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      Explorar
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Acessar {recurso.titulo}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </section>

        {/* Separator */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-6 text-sm text-slate-500">
              ✦
            </span>
          </div>
        </div>

        {/* CONTEÚDO PREMIUM */}
        <section className="space-y-10 lg:space-y-12">
          <header className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-300">
              <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-semibold text-amber-800">Premium</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
              Conteúdo Avançado
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
              Para quem deseja ir além do estudo teórico e entrar em <span className="font-semibold text-blue-700">domínio profissional avançado</span>, a Star B disponibiliza uma área premium com acesso a materiais de alto nível.
            </p>
          </header>

          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {itensPremium.map((item, index) => (
              <Sheet key={item.href}>
                <SheetTrigger asChild>
                  <div 
                    className="cursor-pointer group rounded-2xl border-2 border-blue-100 bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm p-6 lg:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1 hover:border-blue-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                        {item.titulo}
                      </h3>
                      <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {item.descricao}
                    </p>

                    <div className="flex items-center text-blue-600 text-sm font-semibold">
                      Saber mais
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </SheetTrigger>

                <SheetContent className="sm:max-w-md">
                  <SheetHeader>
                    <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                      {item.titulo}
                    </SheetTitle>
                    <SheetDescription>
                      Este conteúdo faz parte da área premium da plataforma.
                    </SheetDescription>
                  </SheetHeader>

                  <div className="mt-6 space-y-6">
                    <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 border border-blue-100">
                      <p className="text-slate-700 leading-relaxed">
                        O acesso completo a este tipo de conteúdo exige conta premium ativa. Isso garante <span className="font-semibold text-blue-700">qualidade</span>, <span className="font-semibold text-indigo-700">profundidade</span> e <span className="font-semibold text-purple-700">continuidade</span> na produção dos materiais.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-slate-900">Benefícios Premium:</h4>
                      <ul className="space-y-2 text-sm text-slate-600">
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Conteúdo atualizado mensalmente
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Suporte prioritário
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Certificados de conclusão
                        </li>
                      </ul>
                    </div>

                    <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-12">
                      <Link href="/premium">Conhecer Plano Premium</Link>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            ))}
          </div>
        </section>

        {/* Separator */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-6 text-sm text-slate-500">
              ✦
            </span>
          </div>
        </div>

        {/* CALL TO ACTION FINAL */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 sm:p-12 lg:p-16 text-center shadow-2xl shadow-blue-500/30">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>

          <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              Aqui você não aprende por curiosidade.
              <br />
              <span className="text-blue-100">Você estuda para dominar.</span>
            </h2>
            
            <p className="text-lg sm:text-xl text-blue-50 leading-relaxed">
              A Star B foi construída para quem leva conhecimento técnico a sério: estudantes exigentes, engenheiros em formação e profissionais que querem elevar seu nível intelectual.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                asChild 
                className="bg-white text-blue-700 hover:bg-blue-50 font-semibold h-14 px-8 shadow-xl"
              >
                <Link href="/biblioteca/livros">
                  Começar pela Biblioteca
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </Button>

              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="border-2 border-white text-white hover:bg-white/10 font-semibold h-14 px-8"
              >
                <Link href="/premium">Ver Planos Premium</Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="pt-8 flex flex-wrap justify-center gap-8 text-blue-100">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Conteúdo Verificado</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Sem Anúncios</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Atualizações Constantes</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-blue-100 bg-white/60 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                  Star B
                </span>
              </div>
              <p className="text-sm text-slate-600">
                Plataforma de aprendizagem técnica para engenheiros e profissionais sérios.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Conteúdo</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="/biblioteca" className="hover:text-blue-700 transition-colors">Biblioteca</Link></li>
                <li><Link href="/softwares" className="hover:text-blue-700 transition-colors">Softwares</Link></li>
                <li><Link href="/artigos" className="hover:text-blue-700 transition-colors">Artigos</Link></li>
                <li><Link href="/ia" className="hover:text-blue-700 transition-colors">IA & ML</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Premium</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="/premium" className="hover:text-blue-700 transition-colors">Planos</Link></li>
                <li><Link href="/premium/cursos" className="hover:text-blue-700 transition-colors">Cursos</Link></li>
                <li><Link href="/premium/mentoria" className="hover:text-blue-700 transition-colors">Mentoria</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="/sobre" className="hover:text-blue-700 transition-colors">Sobre</Link></li>
                <li><Link href="/contato" className="hover:text-blue-700 transition-colors">Contato</Link></li>
                <li><Link href="/termos" className="hover:text-blue-700 transition-colors">Termos</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-blue-100 text-center text-sm text-slate-600">
            <p>&copy; {new Date().getFullYear()} Star B. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default StarBHomePage;