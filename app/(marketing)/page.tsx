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

interface Feature {
  title: string;
  description: string;
  href: string;
  badge?: string;
}

const features: Feature[] = [
  {
    title: "Livros Técnicos",
    description:
      "Coleções profundas por área (engenharia, programação, IA, eletrónica) com foco em compreensão real e aplicação prática.",
    href: "biblioteca/livros",
  },
  {
    title: "Softwares de Engenharia",
    description:
      "Conteúdos sobre ferramentas profissionais: para que servem, como usar, quando aplicar e boas práticas técnicas.",
    href: "/softwares",
  },
  {
    title: "Artigos Técnicos e Científicos",
    description:
      "Leitura orientada, interpretação de papers, artigos comentados e produção académica estruturada.",
    href: "/biblioteca/artigos",
  },
  {
    title: "Aprender Inteligência Artificial",
    description:
      "Fundamentos sólidos, aplicações reais e construção de modelos com visão de engenharia.",
    href: "/ia",
    badge: "Avançado (Premium)",
  },
];

const premiumContent = [
  {
    title: "Projetos de Pesquisa, TCC e Dissertações",
    description:
      "Acesso completo a projetos de pesquisa, de conclusao de curso e muito mais",
    href: "/academico/tcc",
  },
  {
    title: "Projetos Reais Documentados",
    description:
      "Acesso completo a projetos com construção passo a passo, decisões técnicas e guias profissionais.",
    href: "/projetos",
  },
  {
    title: "IA em Nível Avançado",
    description:
      "Modelos, arquiteturas, integração em sistemas reais e uso profissional de inteligência artificial.",
    href: "/ia/avancado",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl space-y-20 px-6 py-12">
      {/* HERO */}
      <section className="grid items-center gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <h1 className="text-5xl font-bold tracking-tight">
            Conhecimento técnico sério.
            <br />
            Engenharia explicada como deve ser.
          </h1>
          <p className="text-muted-foreground text-lg">
            A Star B é uma plataforma de aprendizagem técnica focada em livros
            de engenharia, softwares profissionais, artigos científicos e
            formação sólida em inteligência artificial — organizada para quem
            quer compreender profundamente, não apenas seguir tutoriais.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/biblioteca/livros">Explorar Biblioteca</Link>
            </Button>

            <Button variant="outline" size="lg" asChild>
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
          className="z-0 w-full rounded-2xl"
        >
          <CarouselContent>
            {imgCarousel.map((item, index) => (
              <CarouselItem key={index}>
                <div className="text-muted-foreground relative z-0 flex h-100 w-115 items-center justify-center overflow-hidden rounded-2xl text-lg">
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
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      <Separator />

      {/* CORE FEATURES */}
      <section className="space-y-10">
        <header className="space-y-3 text-center">
          <h2 className="text-3xl font-bold">O que você encontra na Star B</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            Aqui o foco é domínio intelectual: entender conceitos, ferramentas e
            tecnologias de forma estruturada para aplicação profissional real.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <Tooltip key={f.href}>
              <TooltipTrigger asChild>
                <Link
                  href={f.href}
                  className="relative block rounded-2xl border p-6 transition hover:shadow-md"
                >
                  {f.badge && (
                    <span className="absolute top-3 right-3 rounded-full border px-2 py-0.5 text-xs">
                      {f.badge}
                    </span>
                  )}
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm">
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
      <section className="space-y-10">
        <header className="space-y-3 text-center">
          <h2 className="text-3xl font-bold">Conteúdo Avançado (Premium)</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            Para quem deseja ir além do estudo teórico e entrar em domínio
            profissional avançado, a Star B disponibiliza uma área premium com
            acesso a materiais de alto nível.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2">
          {premiumContent.map((item) => (
            <Sheet key={item.href}>
              <SheetTrigger asChild>
                <div className="cursor-pointer rounded-2xl border p-6 transition hover:shadow-md">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm">
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

                <div className="text-muted-foreground mt-6 space-y-4 text-sm">
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
      <section className="space-y-6 text-center">
        <h2 className="text-3xl font-bold">
          Aqui você não aprende por curiosidade. Você estuda para dominar.
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          A Star B foi construída para quem leva conhecimento técnico a sério:
          estudantes exigentes, engenheiros em formação e profissionais que
          querem elevar seu nível intelectual.
        </p>

        <Button size="lg" asChild>
          <Link href="/biblioteca/livros">Começar pela Biblioteca</Link>
        </Button>
      </section>
    </main>
  );
}
