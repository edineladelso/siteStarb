"use client";

import Link from "next/link";

// Dados mockados (substitua pelos seus dados reais)
const libraryLinks = [
  { title: "Engenharia", href: "/biblioteca/engenharia", description: "Livros técnicos de engenharia" },
  { title: "Programação", href: "/biblioteca/programacao", description: "Desenvolvimento de software" },
  { title: "IA & ML", href: "/biblioteca/ia", description: "Inteligência artificial" },
];

const academicLinks = [
  { title: "TCC", href: "/academico/tcc", description: "Trabalhos de conclusão" },
  { title: "Dissertações", href: "/academico/dissertacoes", description: "Mestrado e doutorado" },
  { title: "Artigos", href: "/academico/artigos", description: "Publicações científicas" },
];

const projectLinks = [
  { title: "IoT", href: "/projetos/iot", description: "Internet das Coisas" },
  { title: "Automação", href: "/projetos/automacao", description: "Sistemas automatizados" },
  { title: "Robótica", href: "/projetos/robotica", description: "Projetos robóticos" },
];

const philosophyPrinciples = [
  "Profundidade técnica acima de tutoriais superficiais",
  "Documentação estruturada e referenciada",
  "Projetos reais com código, decisões e contexto",
  "Formação para construir, não apenas consumir conhecimento",
];

type ResourceLink = {
  title: string;
  href: string;
  description?: string;
};

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-purple-600/10 border-b border-blue-100">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230A4D8C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="container relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-lg border border-blue-100 mb-6">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-semibold text-slate-700">Sobre Nós</span>
            </div>

            {/* Título */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
              Sobre a <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Star B</span>
            </h1>

            {/* Descrição */}
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 leading-relaxed">
              Um ecossistema de conhecimento técnico estruturado, criado para quem quer dominar engenharia e tecnologia com <span className="font-semibold text-blue-700">profundidade real</span>.
            </p>

            {/* Stats rápidos */}
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow-md border border-slate-100">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                <span className="text-sm font-semibold text-slate-700">500+ Recursos</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow-md border border-slate-100">
                <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                <span className="text-sm font-semibold text-slate-700">Conteúdo Acadêmico</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow-md border border-slate-100">
                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-semibold text-slate-700">Projetos Reais</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* CONTEÚDO PRINCIPAL */}
          <div className="lg:col-span-2 space-y-10 sm:space-y-12">
            {/* O QUE VOCÊ ENCONTRA */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  O que você encontra aqui
                </h2>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-100">
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  Star B reúne livros técnicos, documentação estruturada, produção acadêmica e projetos reais documentados, organizados para formar profissionais capazes de construir sistemas funcionais no mundo real.
                </p>
              </div>
            </section>

            {/* BIBLIOTECA TÉCNICA */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Biblioteca Técnica
                </h2>
              </div>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Conteúdo do básico ao avançado, com rigor técnico profissional: livros, guias e documentação técnica conectados à prática profissional.
              </p>

              <LinkGrid items={libraryLinks} />
            </section>

            {/* PRODUÇÃO ACADÊMICA */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Produção Acadêmica
                </h2>
              </div>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Repositório estruturado de TCC, dissertações e artigos científicos para elevar o nível técnico da produção acadêmica disponível em português.
              </p>

              <LinkGrid items={academicLinks} />
            </section>

            {/* ESPAÇO DE PROJETOS */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Espaço de Projetos
                </h2>
              </div>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Projetos reais documentados com processo completo: decisão técnica, implementação, erros, correções e guias para replicação.
              </p>

              <LinkGrid items={projectLinks} />
            </section>

            {/* FILOSOFIA */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Filosofia da Star B
                </h2>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 border-l-4 border-blue-600 shadow-lg">
                <blockquote className="text-lg sm:text-xl italic text-slate-700 mb-6">
                  "Conhecimento só tem valor quando é estruturado, compreendido e aplicável."
                </blockquote>

                <div className="space-y-3">
                  {philosophyPrinciples.map((principle, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <p className="text-base text-slate-700">{principle}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* SIDEBAR COM IMAGEM E INFO */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Imagem destacada */}
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 flex items-center justify-center">
                  {/* Placeholder - substitua com sua imagem real */}
                  <div className="text-center text-white p-6">
                    <svg className="w-20 h-20 mx-auto mb-3 opacity-90" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm font-semibold">Mecatrônica</p>
                  </div>
                </div>
              </div>

              {/* Card de contato/CTA */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Faça Parte
                </h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  Junte-se a milhares de estudantes e profissionais que estão elevando seu nível técnico.
                </p>
                <Link 
                  href="/biblioteca" 
                  className="block w-full text-center px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Explorar Biblioteca
                </Link>
              </div>

              {/* Stats card */}
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Nossa Comunidade
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Leitores Ativos</span>
                    <span className="text-lg font-bold text-blue-700">5.000+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Downloads</span>
                    <span className="text-lg font-bold text-indigo-700">15.000+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Avaliação</span>
                    <div className="flex items-center gap-1">
                      <span className="text-lg font-bold text-purple-700">4.9</span>
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function LinkGrid({ items }: { items: { title: string; href: string; description?: string }[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group block bg-white rounded-xl p-5 border-2 border-slate-100 hover:border-blue-300 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}