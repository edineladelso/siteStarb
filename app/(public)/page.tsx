"use client";

import BadgesFeatures from "@/app/(public)/ui/BadgesFeatures";
import HomeSeparator from "@/app/(public)/ui/HomeSeparator";
import Stats from "@/app/(public)/ui/Stats";
import imgCarousel from "@/components/property/carouselProperty";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
import { itensPremium } from "@/lib/localDadosHome/PremiumHome";
import { recursosHome } from "@/lib/localDadosHome/RecursosHome";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const StarBHomePage = () => {
  return (
    <div className="min-h-svh w-full">
      {/* Navigation */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:space-y-10 sm:px-12 sm:py-10 lg:px-16 2xl:space-y-22">
        {/* HERO SECTION - Magnifico e Moderno */}
        <section className="relative">
          {/* Background decorativo */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="animate-blob absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-200 opacity-30 mix-blend-multiply blur-3xl filter"></div>
            <div className="animate-blob animation-delay-2000 absolute top-0 left-0 h-96 w-96 rounded-full bg-indigo-200 opacity-30 mix-blend-multiply blur-3xl filter"></div>
            <div className="animate-blob animation-delay-4000 absolute bottom-0 left-1/2 h-96 w-96 rounded-full bg-purple-200 opacity-30 mix-blend-multiply blur-3xl filter"></div>
          </div>

          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Hero Content */}
            <div className="order-2 space-y-6 lg:order-1 lg:space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-zinc-200/80 via-zinc-300/60 to-gray-300 px-4 py-2 text-sm font-semibold shadow shadow-black/50">
                <span className="h-2 w-2 animate-ping rounded-full bg-black"></span>
                <span className="bg-linear-to-r from-blue-900 to-slate-900 bg-clip-text font-black text-transparent">
                  Plataforma de Engenharia Profissional
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-3xl leading-tight font-black sm:text-4xl xl:text-[43px] 2xl:text-5xl">
                <span className="bg-linear-to-r from-slate-900 via-blue-900 to-indigo-800 bg-clip-text text-transparent">
                  Conhecimento Técnico
                </span>
                <br />
                <span className="bg-linear-to-r from-blue-800 to-slate-900 bg-clip-text text-transparent">
                  Sério & Profundo
                </span>
              </h1>

              {/* Description */}
              <p className="max-w-2xl text-lg leading-relaxed text-slate-700 sm:text-xl">
                A Star B é uma plataforma de aprendizagem técnica focada em{" "}
                <span className="font-semibold text-slate-900">
                  livros de engenharia
                </span>
                ,{" "}
                <span className="font-semibold text-slate-900/90">
                  softwares profissionais
                </span>
                ,{" "}
                <span className="font-semibold text-zinc-800">
                  artigos científicos
                </span>{" "}
                e{" "}
                <span className="font-semibold text-slate-900">
                  formação em IA
                </span>{" "}
                — organizada para quem quer compreender profundamente.
              </p>

              {/* Stats */}
              <Stats />

              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-around gap-3">
                <Button
                  asChild
                  variant={"secondary"}
                  size="lg"
                  className="h-10 w-full rounded-2xl bg-white/60 px-8 text-base font-semibold shadow shadow-gray-400 transition-all duration-500 hover:-translate-y-1 hover:bg-black/10 sm:h-12"
                >
                  <Link href="/biblioteca/livros">
                    Explorar Biblioteca
                    <ArrowRight />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  asChild
                  variant={"secondary"}
                  className="h-10 w-full rounded-2xl bg-white/60 px-8 text-base font-semibold shadow shadow-gray-400 transition-all duration-500 hover:-translate-y-1 hover:bg-black/10 sm:h-12"
                >
                  <Link href="/biblioteca/artigos">
                    Explorar Artigos <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Hero Visual - Carousel moderno */}
            <div className="relative order-1 space-y-14 md:order-2">
              <Carousel
                opts={{
                  loop: true,
                  align: "start",
                }}
                className="w-full rounded-4xl bg-none"
              >
                <CarouselContent className="bg-transparent">
                  {imgCarousel.map((item, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-4/3">
                        {/* Imagem de carousel */}
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          className="object-cover object-center"
                          priority={index === 0}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Controles do Carousel */}
                <div className="hidden bg-transparent sm:block">
                  <CarouselPrevious className="right-16 border-2 border-blue-200 bg-white/90 text-blue-700 shadow-lg hover:bg-white" />
                  <CarouselNext className="right-4 border-2 border-blue-200 bg-white/90 text-blue-700 shadow-lg hover:bg-white" />
                </div>
              </Carousel>

              <div className="mt-8 space-y-6">
                {/* Badges de features */}
                <BadgesFeatures />

                {/* Barra de progresso animada */}
                <div className="space-y-1 w-[90%] mx-auto">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-600">
                      Progresso da Biblioteca
                    </span>
                    <span className="font-bold text-blue-800">75%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full border border-blue-100 bg-white/60 shadow-sm backdrop-blur-sm">
                    <div
                      className="animate-progress h-full rounded-full bg-linear-to-r from-slate-900 via-indigo-900 to-blue-700"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                  <p className="text-center text-xs text-slate-500">
                    375 de 500 livros catalogados
                  </p>
                </div>

                {/* Mini cards de destaque */}

                {/* Linha decorativa com ícones */}
                <div className="flex items-center justify-center gap-4 pt-4">
                  <div className="h-px flex-1 bg-linear-to-r from-transparent via-blue-200 to-transparent"></div>
                  <div className="flex gap-2">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-slate-900"></div>
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-blue-900"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-blue-600"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <div className="h-px flex-1 bg-linear-to-r from-transparent via-blue-200 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Separator com estilo */}
        <HomeSeparator />

        {/* RECURSOS PRINCIPAIS */}
        <section className="space-y-10 lg:space-y-12">
          <header className="mx-auto max-w-3xl space-y-4 text-center">
            <h2 className="bg-linear-to-r from-slate-900 to-blue-900 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl 2xl:text-5xl">
              O que você encontra na Star B
            </h2>
            <p className="text-lg leading-relaxed text-slate-700 sm:text-xl">
              Aqui o foco é{" "}
              <span className="font-semibold text-blue-700">
                domínio intelectual
              </span>
              : entender conceitos, ferramentas e tecnologias de forma
              estruturada para aplicação profissional real.
            </p>
          </header>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {recursosHome.map((recurso, index) => (
              <Tooltip key={recurso.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={recurso.href}
                    className="group relative block rounded-2xl border border-zinc-200 bg-white/40 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-500/20"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {recurso.badge && (
                      <span className="absolute top-4 right-4 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                        {recurso.badge}
                      </span>
                    )}

                    <div className="mb-4 w-12 transform rounded-xl p-2 shadow shadow-zinc-400 transition-transform lg:group-hover:scale-110 [&>svg]:size-8">
                      {recurso.icon}
                    </div>

                    <h3 className="mb-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-700">
                      {recurso.titulo}
                    </h3>

                    <p className="text-sm leading-relaxed text-slate-600">
                      {recurso.descricao}
                    </p>

                    <div className="mt-4 flex items-center text-sm font-semibold text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                      Explorar
                      <svg
                        className="ml-1 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
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
        <HomeSeparator />

        {/* CONTEÚDO PREMIUM */}
        <section className="space-y-10 lg:space-y-12">
          <header className="mx-auto max-w-3xl space-y-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/90 px-4 py-2">
              <svg
                className="h-5 w-5 text-amber-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-semibold text-amber-800">
                Premium
              </span>
            </div>

            <h2 className="bg-linear-to-r from-slate-900 to-blue-900 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl 2xl:text-5xl">
              Conteúdo Avançado
            </h2>
            <p className="text-lg leading-relaxed text-slate-700 sm:text-xl">
              Para quem deseja ir além do estudo teórico e entrar em{" "}
              <span className="font-semibold text-slate-900">
                domínio profissional avançado
              </span>
              , a Star B disponibiliza uma área premium com acesso a materiais
              de alto nível.
            </p>
          </header>

          <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
            {itensPremium.map((item, index) => (
              <Sheet key={item.href}>
                <SheetTrigger asChild>
                  <div
                    className="group cursor-pointer rounded-2xl border border-zinc-200 bg-white/40 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl hover:shadow-blue-500/20 lg:p-8"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-700">
                        {item.titulo}
                      </h3>
                      <svg
                        className="h-5 w-5 text-amber-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>

                    <p className="mb-4 text-sm leading-relaxed text-slate-600">
                      {item.descricao}
                    </p>

                    <div className="flex items-center text-sm font-semibold text-blue-600">
                      Saber mais
                      <svg
                        className="ml-1 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </SheetTrigger>

                <SheetContent className="space-y-8 sm:max-w-md">
                  <SheetHeader>
                    <SheetTitle className="bg-linear-to-r from-blue-700 to-indigo-700 bg-clip-text text-2xl font-bold text-transparent">
                      {item.titulo}
                    </SheetTitle>
                    <SheetDescription>
                      Este conteúdo faz parte da área premium da plataforma.
                    </SheetDescription>
                  </SheetHeader>

                  <div className="relative h-svh space-y-8 px-2">
                    <div className="rounded-xl border border-blue-100 bg-linear-to-br from-blue-50 to-indigo-50 px-3 py-6 sm:p-6">
                      <p className="leading-relaxed text-slate-700">
                        O acesso completo a este tipo de conteúdo exige conta
                        premium ativa. Isso garante{" "}
                        <span className="font-semibold text-blue-700">
                          qualidade
                        </span>
                        ,{" "}
                        <span className="font-semibold text-indigo-700">
                          profundidade
                        </span>{" "}
                        e{" "}
                        <span className="font-semibold text-purple-700">
                          continuidade
                        </span>{" "}
                        na produção dos materiais.
                      </p>
                    </div>

                    <div className="space-y-3 px-2">
                      <h4 className="font-semibold text-slate-900">
                        Benefícios Premium:
                      </h4>
                      <ul className="space-y-2 text-sm text-slate-600">
                        <li className="flex items-start">
                          <svg
                            className="mt-0.5 mr-2 h-5 w-5 shrink-0 text-blue-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Conteúdo atualizado mensalmente
                        </li>
                        <li className="flex items-start">
                          <svg
                            className="mt-0.5 mr-2 h-5 w-5 shrink-0 text-blue-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Suporte prioritário
                        </li>
                        <li className="flex items-start">
                          <svg
                            className="mt-0.5 mr-2 h-5 w-5 shrink-0 text-blue-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Certificados de conclusão
                        </li>
                      </ul>
                    </div>

                    <Button
                      asChild
                      className="absolute bottom-5 mx-auto h-10 w-[96%] bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      <Link href="/premium">Conhecer Plano Premium</Link>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            ))}
          </div>
        </section>

        {/* Separator */}
        <HomeSeparator />

        {/* CALL TO ACTION FINAL */}
        <section className="relative overflow-hidden max-w-4xl mx-auto rounded-3xl bg-linear-to-br from-zinc-100 via-zinc-200/50 to-zinc-100 p-8 text-center shadow shadow-zinc-500 sm:p-12 lg:p-16">
          {/* Background Pattern */}

          <div className="relative z-10 mx-auto max-w-3xl space-y-6">
            <h2 className="text-2xl leading-tight font-black text-slate-900 sm:text-3xl 2xl:text-5xl">
              Aqui você pode aprender por curiosidade.
              <br />
              <span className="text-zinc-700">Você pode alcançar o seu potencial.</span>
            </h2>

            <p className="text-lg leading-relaxed text-slate-700 sm:text-xl">
              A Star B foi construída para quem leva conhecimento técnico a
              sério: estudantes exigentes, engenheiros em formação e
              profissionais que querem elevar seu nível intelectual.
            </p>

            <div className="flex justify-center gap-4 pt-4 max-sm:flex-wrap sm:gap-20">
              <Button
                size="lg"
                asChild
                className="h-10 rounded-2xl bg-white/20 px-8 font-semibold text-slate-900 shadow shadow-zinc-400 transition-all duration-500 hover:-translate-y-1 hover:bg-black/10 max-sm:w-[90%] sm:h-14"
              >
                <Link href="/biblioteca/livros">Começar pela Biblioteca</Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-10 rounded-2xl bg-white/20 px-8 font-semibold text-slate-900 shadow shadow-zinc-400 transition-all duration-500 hover:-translate-y-1 hover:bg-black/10 max-sm:w-[90%] sm:h-14"
              >
                <Link href="/premium">Ver Planos Premium</Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-4 pt-8 text-slate-700">
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium">Conteúdo Verificado</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium">Sem Anúncios</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium">
                  Atualizações Constantes
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
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
          0%,
          100% {
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
