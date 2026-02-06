CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"nome" text NOT NULL,
	"apelido" text,
	"avatar_url" text,
	"role" text DEFAULT 'user' NOT NULL,
	"provider" text DEFAULT 'email' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "profiles_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "livros" ALTER COLUMN "views" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "livros" ALTER COLUMN "downloads" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "livros" ALTER COLUMN "avaliacao" SET NOT NULL;