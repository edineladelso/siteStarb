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
    <div className="container mx-auto px-4 py-10 space-y-16">
      {/* HERO */}
      <section className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">Biblioteca Técnica Star B</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Livros profissionais de engenharia, tecnologia e inteligência artificial
          desenvolvidos para quem quer dominar conhecimento real.
        </p>
      </section>

      {/* CAROUSEL DE CATEGORIAS */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Explorar por área</h2>

        <Carousel className="w-full">
          <CarouselContent>
            {[
              "Inteligência Artificial",
              "Programação",
              "Eletrônica",
              "Mecatrônica",
              "Engenharia",
            ].map((categoria, i) => (
              <CarouselItem key={i} className="basis-1/2 md:basis-1/4">
                <Card className="p-6 text-center hover:shadow-lg transition">
                  <p className="font-medium">{categoria}</p>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* POPULARES */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Mais populares</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {populares.map((livro) => (
            <LivroCard key={livro.id} livro={livro} />
          ))}
        </div>
      </section>

      {/* NOVOS */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Novidades</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {novos.map((livro) => (
            <LivroCard key={livro.id} livro={livro} />
          ))}
        </div>
      </section>

      {/* RECOMENDAÇÕES */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Recomendados para você</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="relative h-60 w-full">
{/* {          <Image
            src={livro.capa}
            alt={livro.titulo}
            fill
            className="object-cover group-hover:scale-105 transition"
          />} */}
        </div>
      </CardHeader>

      <CardContent className="space-y-2 pt-4">
        <CardTitle className="text-lg">{livro.titulo}</CardTitle>
        <p className="text-sm text-muted-foreground">{livro.autor}</p>

        <div className="flex gap-2">
          {livro.novo && <Badge>Novo</Badge>}
          {livro.popular && <Badge variant="secondary">Popular</Badge>}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        {/* Descrição */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="w-full">
              Descrição
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{livro.titulo}</AlertDialogTitle>
              <AlertDialogDescription>
                {livro.descricao}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Fechar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Ver livro */}
        <Button className="w-full">Ver Livro</Button>

        {/* Download dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="w-full">
              Download
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuItem>PDF</DropdownMenuItem>
            <DropdownMenuItem>EPUB</DropdownMenuItem>
            <DropdownMenuItem>Resumo</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  )
}
