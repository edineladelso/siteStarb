'use client'

import { useState } from "react"
import Image from "next/image"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Badge } from "@/components/ui/badge"

// Tipagem profissional
export type Livro = {
  id: string
  titulo: string
  autor: string
  descricao: string
  capa: string
  categoria: "IA" | "Programação" | "Eletrônica" | "Mecatrônica" | "Engenharia" | "Mecânica" | "matematica";
  popular: boolean
  novo: boolean
}

// Mock profissional (substituível por API / banco depois)
const livros: Livro[] = [
  {
    id: "1",
    titulo: "Inteligência Artificial Aplicada",
    autor: "Star B",
    descricao:
      "Livro técnico aprofundado sobre fundamentos, modelos modernos de IA e aplicações reais em engenharia e sistemas inteligentes.",
    capa: "",
    categoria: "IA",
    popular: true,
    novo: true,
  },
  {
    id: "2",
    titulo: "Engenharia de Software Moderna",
    autor: "Star B",
    descricao:
      "Arquitetura profissional de sistemas, padrões de projeto, escalabilidade e boas práticas reais de mercado.",
    capa: "",
    categoria: "Programação",
    popular: true,
    novo: false,
  },
  {
    id: "3",
    titulo: "Mecatrônica Essencial",
    autor: "Star B",
    descricao:
      "Integração entre mecânica, eletrônica e programação aplicada a sistemas físicos inteligentes.",
    capa: "",
    categoria: "Mecatrônica",
    popular: false,
    novo: true,
  },
]

export default function LivrosPage() {
  const populares = livros.filter((l) => l.popular)
  const novos = livros.filter((l) => l.novo)

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-10 space-y-10 sm:space-y-12 md:space-y-16">
      {/* HERO */}
      <section className="space-y-2 sm:space-y-3 md:space-y-4 text-center">
        <h1 className="text-3xl sm:text-3xl font-bold">Biblioteca Técnica Star B</h1>
        <p className="text-muted-foreground text-base sm:text-sm max-w-2xl mx-auto">
          Livros profissionais de engenharia, tecnologia e inteligência artificial
          desenvolvidos para quem quer dominar conhecimento real.
        </p>
      </section>

      {/* CAROUSEL DE CATEGORIAS */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl font-semibold">Explorar por área</h2>

        <Carousel className="w-full">
          <CarouselContent>
            {[
              "Inteligência Artificial",
              "Programação",
              "Eletrônica",
              "Mecatrônica",
              "Engenharia",
            ].map((categoria, i) => (
              <CarouselItem key={i} className="basis-full sm:basis-1/2 md:basis-1/4">
                <Card className="p-4 sm:p-6 text-center hover:shadow-lg transition">
                  <p className="font-medium text-base sm:text-sm">{categoria}</p>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </section>

      {/* POPULARES */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl font-semibold">Mais populares</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {populares.map((livro) => (
            <LivroCard key={livro.id} livro={livro} />
          ))}
        </div>
      </section>

      {/* NOVOS */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl font-semibold">Novidades</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {novos.map((livro) => (
            <LivroCard key={livro.id} livro={livro} />
          ))}
        </div>
      </section>

      {/* RECOMENDAÇÕES */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl font-semibold">Recomendados para você</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {livros.map((livro) => (
            <LivroCard key={livro.id} livro={livro} />
          ))}
        </div>
      </section>
    </div>
  )
}

function LivroCard({ livro }: { livro: Livro }) {
  return (
    <Card className="overflow-hidden group">
      <CardHeader className="p-0">
        <div className="relative h-40 sm:h-50 md:h-60 w-full">
{/* {          <Image
            src={livro.capa}
            alt={livro.titulo}
            fill
            className="object-cover group-hover:scale-105 transition"
          />} */}
        </div>
      </CardHeader>

      <CardContent className="space-y-2 pt-3 sm:pt-4">
        <CardTitle className="text-base sm:text-lg">{livro.titulo}</CardTitle>
        <p className="text-xs sm:text-sm text-muted-foreground">{livro.autor}</p>

        <div className="flex gap-2">
          {livro.novo && <Badge className="text-xs">Novo</Badge>}
          {livro.popular && <Badge variant="secondary" className="text-xs">Popular</Badge>}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 sm:gap-3">
        {/* Descrição */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="w-full text-xs sm:text-sm">
              Descrição
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-sm sm:max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-base sm:text-lg">{livro.titulo}</AlertDialogTitle>
              <AlertDialogDescription className="text-xs sm:text-sm">
                {livro.descricao}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Fechar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Ver livro */}
        <Button className="w-full text-xs sm:text-sm">Ver Livro</Button>

        {/* Download dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="w-full text-xs sm:text-sm">
              Download
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 sm:w-48">
            <DropdownMenuItem className="text-xs sm:text-sm">PDF</DropdownMenuItem>
            <DropdownMenuItem className="text-xs sm:text-sm">EPUB</DropdownMenuItem>
            <DropdownMenuItem className="text-xs sm:text-sm">Resumo</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  )
}
