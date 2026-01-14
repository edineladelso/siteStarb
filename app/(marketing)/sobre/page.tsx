import Link from "next/link";
import Image from "next/image";
import mecatronica from "@/public/img/mecatronica.webp";
import {
  libraryLinks,
  academicLinks,
  projectLinks,
  philosophyPrinciples,
  type ResourceLink,
} from "@/lib/data";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3 sm:space-y-4">
      <h2 className="text-lg sm:text-xl font-semibold tracking-tight">{title}</h2>
      <div className="font-body space-y-2 sm:space-y-3 text-base sm:text-xl leading-relaxed tracking-wide text-neutral-700">
        {children}
      </div>
    </section>
  );
}

function LinkGrid({ items }: { items: ResourceLink[] }) {
  return (
    <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="hover: block rounded-lg sm:rounded-xl border border-neutral-300 p-3 sm:p-4 transition hover:shadow-md"
        >
          <h3 className="font-medium text-base sm:text-sm">{item.title}</h3>
          {item.description && (
            <p className="mt-1 text-xs sm:text-sm">{item.description}</p>
          )}
        </Link>
      ))}
    </div>
  );
}

export default function Sobre() {
  return (
    <main className="mx-auto h-full max-w-6xl space-y-6 sm:space-y-8 overflow-hidden rounded-lg sm:rounded-2xl border px-4 sm:px-8 md:px-10 py-8 sm:py-12">
      <header >
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Sobre a Star B</h1>
      </header>

      <div className="flex flex-col lg:flex-row w-full items-start gap-4 md:gap-6">
        <article className="flex h-auto lg:h-125 flex-1 flex-col gap-6 sm:gap-8 lg:overflow-scroll">
          <p className="text-base sm:text-lg text-neutral-700">
            A Star B é um ecossistema de conhecimento técnico estruturado,
            criado para quem quer dominar engenharia e tecnologia com
            profundidade real.
          </p>
          <Section title="O que você encontra aqui">
            <p>
              Star B reúne livros técnicos, documentação estruturada,
              produção académica e projetos reais documentados, organizados para
              formar profissionais capazes de construir sistemas funcionais no
              mundo real.
            </p>
          </Section>
          <Section title="Biblioteca Técnica">
            <p>
              Conteúdo do básico ao avançado, com rigor tecnico profissional: livros, guias e documentação técnica conectados à prática profissional.
            </p>
            <LinkGrid items={libraryLinks} />
          </Section>
          <Section title="Produção Académica">
            <p>
              Repositório estruturado de TCC, dissertações e artigos científicos
              para elevar o nível técnico da produção académica disponível em
              português.
            </p>
            <LinkGrid items={academicLinks} />
          </Section>
          <Section title="Espaço de Projetos">
            <p>
              Projetos reais documentados com processo completo: decisão
              técnica, implementação, erros, correções e guias para replicação.
            </p>
            <LinkGrid items={projectLinks} />
          </Section>
          <Section title="Filosofia da Star B">
            <blockquote className="border-l-4 pl-3 sm:pl-4 italic text-base sm:text-sm">
              Conhecimento só tem valor quando é estruturado, compreendido e
              aplicável.
            </blockquote>
            <ul className="ml-4 sm:ml-6 list-disc space-y-1 text-base sm:text-sm">
              {philosophyPrinciples.map((principle) => (
                <li key={principle}>{principle}</li>
              ))}
            </ul>
          </Section>
        </article>
        <Image
          src={mecatronica}
          alt="Mecatrônica"
          width={340}
          height={300}
          className="m-0 rounded-lg sm:rounded-xl w-full lg:w-80 h-auto shrink-0"
        />
      </div>
    </main>
  );
}
