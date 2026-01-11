import Link from "next/link";
import Image from "next/image";
import mecatronica from "@/public/img/mecatronica.webp";

interface ResourceLink {
  title: string;
  href: string;
  description?: string;
}

const libraryLinks: ResourceLink[] = [
  {
    title: "Livros Técnicos",
    href:"biblioteca/livros",
    description: "Coleção organizada por áreas e níveis.",
  },
  {
    title: "Documentação Técnica",
    href: "/biblioteca/documentacao",
    description: "Guias, padrões e referências estruturadas.",
  },
  {
    title: "Guias Práticos",
    href: "/biblioteca/guias",
    description: "Aprenda construindo, passo a passo.",
  },
];

const academicLinks: ResourceLink[] = [
  { title: "TCC e Monografias", href: "/academico/tcc" },
  { title: "Dissertações", href: "/academico/dissertacoes" },
  { title: "Artigos Científicos", href: "/academico/artigos" },
];

const projectLinks: ResourceLink[] = [
  { title: "Projetos com Microcontroladores", href: "/projetos/embarcados" },
  { title: "Plataformas com IA", href: "/projetos/inteligencia-artificial" },
  { title: "Backends e Frontends Profissionais", href: "/projetos/software" },
  { title: "Automação e Sistemas Inteligentes", href: "/projetos/automacao" },
];

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="font-body space-y-3 text-xl leading-relaxed tracking-wide text-neutral-700">
        {children}
      </div>
    </section>
  );
}

function LinkGrid({ items }: { items: ResourceLink[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="hover: block rounded-xl border border-neutral-300 p-3 transition hover:shadow-md"
        >
          <h3 className="font-medium">{item.title}</h3>
          {item.description && (
            <p className="mt-1 text-sm">{item.description}</p>
          )}
        </Link>
      ))}
    </div>
  );
}

export default function Sobre() {
  return (
    <main className="mx-auto h-full max-w-6xl space-y-8 overflow-hidden rounded-2xl border px-10 py-12">
      <header >
        <h1 className="text-4xl font-bold tracking-tight">Sobre a Star B</h1>
      </header>

      <div className="flex w-full items-start gap-4">
        <article className="flex h-[500px] flex-1 flex-col gap-8 overflow-scroll">
          <p className="text-lg text-neutral-700">
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
            <blockquote className="border-l-4 pl-4 italic">
              Conhecimento só tem valor quando é estruturado, compreendido e
              aplicável.
            </blockquote>
            <ul className="ml-6 list-disc">
              <li>Clareza absoluta</li>
              <li>Profundidade técnica</li>
              <li>Aplicação prática direta</li>
            </ul>
          </Section>
        </article>
        <Image
          src={mecatronica}
          alt="Mecatrônica"
          width={340}
          height={300}
          className="m-0 rounded-xl"
        />
      </div>
    </main>
  );
}
