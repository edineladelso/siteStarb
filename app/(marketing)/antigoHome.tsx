"use client";

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
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

import imgCarousel from "@/components/property/carouselProperty";
import { itenssPremium, recursosHome } from "@/lib/dados";

// Force client-side only rendering to prevent build-time issues
const HomePage = () => {
  return (
    <main className="mx-auto max-w-6xl space-y-10 px-4 py-6 sm:space-y-16 sm:px-6 sm:py-12 md:space-y-20">
      {/* HERO */}
      <section className="grid items-center gap-6 sm:gap-8 md:grid-cols-2 md:gap-10">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Conhecimento técnico sério.
            <br />
            Engenharia explicada como deve ser.
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            A Star B é uma plataforma de aprendizagem técnica focada em livros
            de engenharia, softwares profissionais, artigos científicos e
            formação sólida em inteligência artificial — organizada para quem
            quer compreender profundamente, não apenas seguir tutoriais.
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Button asChild size="lg" className="text-base sm:text-sm">
              <Link href="/biblioteca/livros">Explorar Biblioteca</Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              asChild
              className="text-base sm:text-sm"
            >
              <Link href="/softwares">Ver Softwares de Engenharia</Link>
            </Button>
          </div>
        </div>

        {/* Visual / Carousel */}
        <Carousel
          opts={{
            loop: true,
            align: "start",
          }}
          className="z-0 w-full rounded-xl sm:rounded-2xl"
        >
          <CarouselContent>
            {imgCarousel.map((item, index) => (
              <CarouselItem key={index}>
                <div className="text-muted-foreground relative z-0 flex h-60 w-full items-center justify-center rounded-xl bg-transparent text-lg shadow sm:h-80 sm:w-115 sm:rounded-2xl md:h-100">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="absolute -top-10 z-0 object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </section>

      <Separator />

      {/* CORE FEATURES */}
      <section className="space-y-6 sm:space-y-8 md:space-y-10">
        <header className="space-y-2 text-center sm:space-y-3">
          <h2 className="text-2xl font-bold sm:text-3xl">
            O que você encontra na Star B
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-sm">
            Aqui o foco é domínio intelectual: entender conceitos, ferramentas e
            tecnologias de forma estruturada para aplicação profissional real.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-4">
          {recursosHome.map((f) => (
            <Tooltip key={f.href}>
              <TooltipTrigger asChild>
                <Link
                  href={f.href}
                  className="relative block rounded-lg border p-4 transition hover:shadow-md sm:rounded-xl sm:p-5 md:rounded-2xl md:p-6"
                >
                  {f.badge && (
                    <span className="absolute top-2 right-2 rounded-full border px-2 py-0.5 text-xs sm:top-3 sm:right-3">
                      {f.badge}
                    </span>
                  )}
                  <h3 className="text-base font-semibold sm:text-sm">
                    {f.titulo}
                  </h3>
                  <p className="text-muted-foreground mt-2 text-xs sm:text-sm">
                    {f.descricao}
                  </p>
                </Link>
              </TooltipTrigger>
              <TooltipContent>Acessar {f.titulo}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </section>

      <Separator />

      {/* PREMIUM CONTENT */}
      <section className="space-y-6 sm:space-y-8 md:space-y-10">
        <header className="space-y-2 text-center sm:space-y-3">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Conteúdo Avançado (Premium)
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-sm">
            Para quem deseja ir além do estudo teórico e entrar em domínio
            profissional avançado, a Star B disponibiliza uma área premium com
            acesso a materiais de alto nível.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6">
          {itenssPremium.map((item) => (
            <Sheet key={item.href}>
              <SheetTrigger asChild>
                <div className="cursor-pointer rounded-lg border p-4 transition hover:shadow-md sm:rounded-xl sm:p-5 md:rounded-2xl md:p-6">
                  <h3 className="text-base font-semibold sm:text-sm">
                    {item.titulo}
                  </h3>
                  <p className="text-muted-foreground mt-2 text-xs sm:text-sm">
                    {item.descricao}
                  </p>
                </div>
              </SheetTrigger>

              <SheetContent>
                <SheetHeader>
                  <SheetTitle>{item.titulo}</SheetTitle>
                  <SheetDescription>
                    Este conteúdo faz parte da área premium da plataforma.
                  </SheetDescription>
                </SheetHeader>

                <div className="text-muted-foreground mt-6 space-y-4 text-base">
                  <p>
                    O acesso completo a este tipo de conteúdo exige conta
                    premium ativa. Isso garante qualidade, profundidade e
                    continuidade na produção dos materiais.
                  </p>

                  <Button asChild>
                    <Link href="/premium">Conhecer plano Premium</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </section>

      <Separator />

      {/* FINAL CTA */}
      <section className="space-y-4 text-center sm:space-y-6">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Aqui você não aprende por curiosidade. Você estuda para dominar.
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-sm">
          A Star B foi construída para quem leva conhecimento técnico a sério:
          estudantes exigentes, engenheiros em formação e profissionais que
          querem elevar seu nível intelectual.
        </p>

        <Button size="lg" asChild className="text-base sm:text-sm">
          <Link href="/biblioteca/livros">Começar pela Biblioteca</Link>
        </Button>
      </section>
    </main>
  );
};

// Export as dynamic component to ensure client-side only rendering
export default dynamic(() => Promise.resolve(HomePage), {
  ssr: false,
});