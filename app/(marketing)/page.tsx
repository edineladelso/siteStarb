"use client";

import Link from "next/link";
import Image from "next/image";
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

import imgCarousel from "@/components/property/carouselProperty";
import { homeFeatures, premiumItems } from "@/lib/data";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl space-y-10 sm:space-y-16 md:space-y-20 px-4 sm:px-6 py-6 sm:py-12">
      {/* HERO */}
      <section className="grid items-center gap-6 sm:gap-8 md:gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
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

            <Button variant="outline" size="lg" asChild className="text-base sm:text-sm">
              <Link href="/softwares">Ver Softwares de Engenharia</Link>
            </Button>
          </div>
        </div>

        {/* Visual / Carousel */}
        <Carousel
          opts={{
            loop: true, // Esta opção ativa o scroll infinito
            align: "start",
          }}
          className="z-0 w-full rounded-xl sm:rounded-2xl"
        >
          <CarouselContent>
            {imgCarousel.map((item, index) => (
              <CarouselItem key={index}>
                <div className="text-muted-foreground relative z-0 flex h-60 sm:h-80 md:h-100 w-full sm:w-115 items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl text-lg">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="z-0 object-cover"
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
        <header className="space-y-2 sm:space-y-3 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">O que você encontra na Star B</h2>
          <p className="text-muted-foreground text-base sm:text-sm mx-auto max-w-2xl">
            Aqui o foco é domínio intelectual: entender conceitos, ferramentas e
            tecnologias de forma estruturada para aplicação profissional real.
          </p>
        </header>

        <div className="grid gap-4 sm:gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {homeFeatures.map((f) => (
            <Tooltip key={f.href}>
              <TooltipTrigger asChild>
                <Link
                  href={f.href}
                  className="relative block rounded-lg sm:rounded-xl md:rounded-2xl border p-4 sm:p-5 md:p-6 transition hover:shadow-md"
                >
                  {f.badge && (
                    <span className="absolute top-2 sm:top-3 right-2 sm:right-3 rounded-full border px-2 py-0.5 text-xs">
                      {f.badge}
                    </span>
                  )}
                  <h3 className="font-semibold text-base sm:text-sm">{f.title}</h3>
                  <p className="text-muted-foreground mt-2 text-xs sm:text-sm">
                    {f.description}
                  </p>
                </Link>
              </TooltipTrigger>
              <TooltipContent>Acessar {f.title}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </section>

      <Separator />

      {/* PREMIUM CONTENT */}
      <section className="space-y-6 sm:space-y-8 md:space-y-10">
        <header className="space-y-2 sm:space-y-3 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">Conteúdo Avançado (Premium)</h2>
          <p className="text-muted-foreground text-base sm:text-sm mx-auto max-w-2xl">
            Para quem deseja ir além do estudo teórico e entrar em domínio
            profissional avançado, a Star B disponibiliza uma área premium com
            acesso a materiais de alto nível.
          </p>
        </header>

        <div className="grid gap-4 sm:gap-5 md:gap-6 sm:grid-cols-2">
          {premiumItems.map((item) => (
            <Sheet key={item.href}>
              <SheetTrigger asChild>
                <div className="cursor-pointer rounded-lg sm:rounded-xl md:rounded-2xl border p-4 sm:p-5 md:p-6 transition hover:shadow-md">
                  <h3 className="font-semibold text-base sm:text-sm">{item.title}</h3>
                  <p className="text-muted-foreground mt-2 text-xs sm:text-sm">
                    {item.description}
                  </p>
                </div>
              </SheetTrigger>

              <SheetContent>
                <SheetHeader>
                  <SheetTitle>{item.title}</SheetTitle>
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
      <section className="space-y-4 sm:space-y-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold">
          Aqui você não aprende por curiosidade. Você estuda para dominar.
        </h2>
        <p className="text-muted-foreground text-base sm:text-sm mx-auto max-w-2xl">
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
}
