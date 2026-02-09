CREATE TYPE "public"."tabela" AS ENUM('artigos', 'livros', 'projetos', 'softwares', 'profiles');--> statement-breakpoint
ALTER TABLE "livros" ADD COLUMN "novo" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "livros" ADD COLUMN "popular" boolean DEFAULT false;