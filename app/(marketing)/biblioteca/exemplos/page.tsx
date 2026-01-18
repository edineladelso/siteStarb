/**
 * EXEMPLO DE USO INTEGRADO
 * Demonstra como usar toda a arquitetura centralizada em um componente real
 */

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

// Importar tudo da lib centralizada
import {
  // Tipos
  type Livro,
  type Usuario,
  LIMITES_SISTEMA,
  TipoConteudo,
  buscarLivros,
  categoriasLivros,
  extrairTagsUnicas,
  // Funções
  filtrarLivrosPorCategoria,
  formatarData,
  // Dados
  livrosExemplo,
  obterAutorPrincipal,
  obterRecursosPopulares,
  usuarioExemplo,
  usuarioPodeAcessar,
  verificarPermissaoDownload,
} from "@/lib";

/**
 * Componente de exemplo: Página de Biblioteca
 * Demonstra filtro, busca, validação e formatação
 */
export default function BibliotecaPaginaExemplo() {
  // Estado local
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>("");
  const [termosBusca, setTermosBusca] = useState<string>("");
  const [usuarioAtual] = useState<Usuario>(usuarioExemplo);

  // Filtrar livros
  const livrosFiltrados = useMemo(() => {
    let resultado = livrosExemplo;

    // Aplicar filtro de categoria
    if (categoriaSelecionada) {
      resultado = filtrarLivrosPorCategoria(resultado, categoriaSelecionada);
    }

    // Aplicar busca
    if (termosBusca) {
      resultado = buscarLivros(resultado, termosBusca);
    }

    return resultado;
  }, [categoriaSelecionada, termosBusca]);

  // Obter livros populares
  const populares = useMemo(() => obterRecursosPopulares(livrosExemplo, 3), []);

  // Extrair todas as tags únicas
  const tags = useMemo(() => extrairTagsUnicas(livrosExemplo), []);

  return (
    <main className="mx-auto max-w-6xl space-y-8 p-6">
      {/* ========== SEÇÃO HERO ========== */}
      <section className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">Biblioteca Star B</h1>
        <p className="text-gray-600">
          Acervo completo de livros técnicos para engenharia e programação
        </p>
      </section>

      {/* ========== BARRA DE BUSCA ========== */}
      <section className="space-y-4 rounded-lg bg-gray-50 p-6">
        <div>
          <label htmlFor="search" className="mb-2 block text-sm font-medium">
            Buscar Livros
          </label>
          <input
            id="search"
            type="text"
            placeholder="Digite título, descrição ou tags..."
            value={termosBusca}
            onChange={(e) => setTermosBusca(e.target.value)}
            className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            Categoria
          </label>
          <select
            id="category"
            value={categoriaSelecionada}
            onChange={(e) => setCategoriaSelecionada(e.target.value)}
            className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
          >
            <option value="">Todas as categorias</option>
            {categoriasLivros.map((cat) => (
              <option key={cat.href} value={cat.titulo}>
                {cat.titulo}
              </option>
            ))}
          </select>
        </div>

        <p className="text-sm text-gray-600">
          {livrosFiltrados.length} livro(s) encontrado(s)
        </p>
      </section>

      {/* ========== LIVROS MAIS POPULARES ========== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">🔥 Em Destaque</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {(populares as Livro[]).map((livro) => (
            <CartaLivro key={livro.id} livro={livro} usuario={usuarioAtual} />
          ))}
        </div>
      </section>

      {/* ========== LISTA DE LIVROS FILTRADOS ========== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Todos os Livros</h2>

        {livrosFiltrados.length === 0 ? (
          <div className="rounded-lg bg-gray-50 py-12 text-center">
            <p className="text-gray-500">
              Nenhum livro encontrado com esses critérios.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {livrosFiltrados
              .slice(0, LIMITES_SISTEMA.itensPorPagina)
              .map((livro) => (
                <CartaLivroCompleta
                  key={livro.id}
                  livro={livro}
                  usuario={usuarioAtual}
                />
              ))}
          </div>
        )}
      </section>

      {/* ========== TAGS ========== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Tags Disponíveis</h2>
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 20).map((tag) => (
            <button
              key={tag}
              onClick={() => setTermosBusca(tag)}
              className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 transition hover:bg-blue-200"
            >
              #{tag}
            </button>
          ))}
        </div>
      </section>

      {/* ========== INFORMAÇÕES DO USUÁRIO ========== */}
      <section className="space-y-2 rounded-lg bg-blue-50 p-6">
        <h3 className="text-lg font-bold">Seu Acesso</h3>
        <p>
          <strong>Usuário:</strong> {usuarioAtual.nomeCompleto}
        </p>
        <p>
          <strong>Nível:</strong> {usuarioAtual.nivelAcesso}
        </p>
        <p>
          <strong>Plano:</strong> {usuarioAtual.subscricao.plano.nome}
        </p>
        <p>
          <strong>Downloads permitidos:</strong>{" "}
          {usuarioAtual.subscricao.plano.acessoDownloads ? "✅ Sim" : "❌ Não"}
        </p>
      </section>
    </main>
  );
}

/**
 * Componente: Carta simples do livro
 */
interface CartaLivroProps {
  livro: Livro;
  usuario: Usuario;
}

function CartaLivro({ livro, usuario }: CartaLivroProps) {
  const podeAcessar = usuarioPodeAcessar(usuario, livro);
  const permissao = verificarPermissaoDownload(livro, usuario);

  return (
    <div className="overflow-hidden rounded-lg border transition hover:shadow-lg">
      {/* Imagem */}
      {livro.urls.capa && (
        <div className="relative h-48 bg-gray-200">
          {/* <Image
            src={livro.urls.capa.url}
            alt={livro.titulo}
            fill
            className="object-cover"
          /> */}
          {livro.eNovo && (
            <div className="absolute top-2 right-2 rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
              NOVO
            </div>
          )}
        </div>
      )}

      {/* Conteúdo */}
      <div className="space-y-2 p-4">
        <h3 className="line-clamp-2 font-bold">{livro.titulo}</h3>

        <p className="line-clamp-2 text-sm text-gray-600">{livro.descricao}</p>

        <div className="flex justify-between text-xs text-gray-500">
          <span>👁️ {livro.estatisticas.views}</span>
          <span>⬇️ {livro.estatisticas.downloads}</span>
          <span>⭐ {livro.estatisticas.avaliacaoMedia.toFixed(1)}</span>
        </div>

        <div className="flex gap-2 pt-2">
          <span
            className={`rounded px-2 py-1 text-xs ${
              livro.tipo === TipoConteudo.LIVRE
                ? "bg-green-100 text-green-800"
                : "bg-purple-100 text-purple-800"
            }`}
          >
            {livro.tipo === TipoConteudo.LIVRE ? "🆓 Grátis" : "💰 Pago"}
          </span>

          {!podeAcessar && (
            <span className="rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
              🔒 Restrito
            </span>
          )}
        </div>

        {!permissao.permitido && (
          <p className="text-xs text-red-600">{permissao.motivo}</p>
        )}

        <Link
          href={`/biblioteca/livros/${livro.id}`}
          className="block w-full rounded bg-blue-500 py-2 text-center text-sm font-medium text-white transition hover:bg-blue-600"
        >
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
}

/**
 * Componente: Carta completa do livro
 */
function CartaLivroCompleta({ livro, usuario }: CartaLivroProps) {
  const autor = obterAutorPrincipal(livro);
  const podeAcessar = usuarioPodeAcessar(usuario, livro);

  return (
    <div className="rounded-lg border p-4 transition hover:bg-gray-50">
      <div className="flex gap-4">
        {/* Imagem */}
        {livro.urls.capa && (
          <div className="relative h-32 w-24 shrink-0">
            {/* <Image
              src={livro.urls.capa.url}
              alt={livro.titulo}
              fill
              className="object-cover rounded"
            /> */}
          </div>
        )}

        {/* Info */}
        <div className="grow space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold">{livro.titulo}</h3>
              <p className="text-sm text-gray-600">por {autor}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold">
                Popularidade: {livro.popularidade}/10
              </p>
              <p className="text-xs text-gray-500">
                {formatarData(livro.dataPublicacao)}
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-700">{livro.descricao}</p>

          <div className="flex flex-wrap gap-2">
            <span className="rounded bg-gray-200 px-2 py-1 text-xs">
              {livro.categoria}
            </span>
            {livro.isbn && (
              <span className="rounded bg-gray-200 px-2 py-1 text-xs">
                ISBN: {livro.isbn}
              </span>
            )}
            <span
              className={`rounded px-2 py-1 text-xs ${
                livro.tipo === TipoConteudo.LIVRE
                  ? "bg-green-100 text-green-800"
                  : "bg-purple-100 text-purple-800"
              }`}
            >
              {livro.tipo === TipoConteudo.LIVRE ? "Grátis" : "Pago"}
            </span>
          </div>

          <div className="flex gap-4 text-xs text-gray-600">
            <span>👁️ {livro.estatisticas.views} visualizações</span>
            <span>⬇️ {livro.estatisticas.downloads} downloads</span>
            <span>
              ⭐ {livro.estatisticas.avaliacaoMedia} (
              {livro.estatisticas.totalAvaliacoes} avaliações)
            </span>
          </div>

          {!podeAcessar && (
            <p className="text-xs text-orange-600">
              ⚠️ Este recurso requer acesso premium
            </p>
          )}

          <Link
            href={`/biblioteca/livros/${livro.id}`}
            className="inline-block text-sm font-medium text-blue-600 hover:underline"
          >
            Abrir Livro →
          </Link>
        </div>
      </div>
    </div>
  );
}
