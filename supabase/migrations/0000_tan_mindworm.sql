CREATE TABLE "artigos" (
	"id" text PRIMARY KEY NOT NULL,
	"tipo" text DEFAULT 'artigo' NOT NULL,
	"titulo" text NOT NULL,
	"autores" text NOT NULL,
	"categoria" text NOT NULL,
	"descricao" text NOT NULL,
	"resumo" text NOT NULL,
	"palavras_chave" text,
	"ano_publicacao" integer,
	"instituicao" text,
	"pdf_url" text NOT NULL,
	"status" text DEFAULT 'rascunho' NOT NULL,
	"views" integer DEFAULT 0 NOT NULL,
	"downloads" integer DEFAULT 0 NOT NULL,
	"avaliacao" numeric(2, 1) DEFAULT '0' NOT NULL,
	"data_criacao" timestamp with time zone DEFAULT now() NOT NULL,
	"data_atualizacao" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "livros" (
	"id" text PRIMARY KEY NOT NULL,
	"tipo" text DEFAULT 'livro' NOT NULL,
	"titulo" text NOT NULL,
	"autor" text NOT NULL,
	"categoria" text NOT NULL,
	"descricao" text NOT NULL,
	"isbn" text,
	"ano_publicacao" integer,
	"editora" text,
	"idioma" text DEFAULT 'Português',
	"numero_paginas" integer,
	"capa_url" text NOT NULL,
	"pdf_url" text NOT NULL,
	"tags" text[] DEFAULT '{}',
	"status" text DEFAULT 'rascunho' NOT NULL,
	"views" integer DEFAULT 0 NOT NULL,
	"downloads" integer DEFAULT 0 NOT NULL,
	"avaliacao" numeric(2, 1) DEFAULT '0' NOT NULL,
	"data_criacao" timestamp with time zone DEFAULT now() NOT NULL,
	"data_atualizacao" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "login_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "posts_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" text NOT NULL,
	"idade" integer,
	"avatar_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projetos" (
	"id" text PRIMARY KEY NOT NULL,
	"tipo" text DEFAULT 'projeto' NOT NULL,
	"titulo" text NOT NULL,
	"autor" text NOT NULL,
	"categoria" text NOT NULL,
	"descricao" text NOT NULL,
	"problema_resolvido" text NOT NULL,
	"tecnologias" text NOT NULL,
	"repositorio_github" text,
	"documentacao_url" text,
	"imagens_url" text[] DEFAULT '{}',
	"dificuldade" text DEFAULT 'Intermediário' NOT NULL,
	"duracao" text,
	"status" text DEFAULT 'rascunho' NOT NULL,
	"views" integer DEFAULT 0 NOT NULL,
	"downloads" integer DEFAULT 0 NOT NULL,
	"avaliacao" numeric(2, 1) DEFAULT '0' NOT NULL,
	"data_criacao" timestamp with time zone DEFAULT now() NOT NULL,
	"data_atualizacao" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "softwares" (
	"id" text PRIMARY KEY NOT NULL,
	"tipo" text DEFAULT 'software' NOT NULL,
	"titulo" text NOT NULL,
	"categoria" text NOT NULL,
	"descricao" text NOT NULL,
	"site_oficial" text NOT NULL,
	"funcionalidades" text,
	"requisitos" text,
	"preco" text DEFAULT 'Gratuito',
	"plataformas" text[] DEFAULT '{}',
	"screenshots" text[] DEFAULT '{}',
	"status" text DEFAULT 'rascunho' NOT NULL,
	"views" integer DEFAULT 0 NOT NULL,
	"downloads" integer DEFAULT 0 NOT NULL,
	"avaliacao" numeric(2, 1) DEFAULT '0' NOT NULL,
	"data_criacao" timestamp with time zone DEFAULT now() NOT NULL,
	"data_atualizacao" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" text NOT NULL,
	"idade" integer NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "users_table_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "login_table" ADD CONSTRAINT "login_table_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_table" ADD CONSTRAINT "posts_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_artigos_categoria" ON "artigos" USING btree ("categoria");--> statement-breakpoint
CREATE INDEX "idx_artigos_status" ON "artigos" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_artigos_data_criacao" ON "artigos" USING btree ("data_criacao");--> statement-breakpoint
CREATE INDEX "idx_artigos_ano_publicacao" ON "artigos" USING btree ("ano_publicacao");--> statement-breakpoint
CREATE INDEX "idx_livros_categoria" ON "livros" USING btree ("categoria");--> statement-breakpoint
CREATE INDEX "idx_livros_status" ON "livros" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_livros_data_criacao" ON "livros" USING btree ("data_criacao");--> statement-breakpoint
CREATE INDEX "idx_livros_views" ON "livros" USING btree ("views");--> statement-breakpoint
CREATE INDEX "idx_projetos_categoria" ON "projetos" USING btree ("categoria");--> statement-breakpoint
CREATE INDEX "idx_projetos_status" ON "projetos" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_projetos_dificuldade" ON "projetos" USING btree ("dificuldade");--> statement-breakpoint
CREATE INDEX "idx_projetos_data_criacao" ON "projetos" USING btree ("data_criacao");--> statement-breakpoint
CREATE INDEX "idx_softwares_categoria" ON "softwares" USING btree ("categoria");--> statement-breakpoint
CREATE INDEX "idx_softwares_status" ON "softwares" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_softwares_data_criacao" ON "softwares" USING btree ("data_criacao");