/**
 * EXEMPLO DE USO INTEGRADO
 * Demonstra como usar toda a arquitetura centralizada em um componente real
 */

'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Importar tudo da lib centralizada
import {
  // Tipos
  type Livro,
  type Usuario,
  TipoConteudo,
  NivelAcesso,

  // Dados
  livrosExemplo,
  usuarioExemplo,
  categoriasLivros,

  // Funções
  filtrarLivrosPorCategoria,
  buscarLivros,
  formatarData,
  obterRecursosPopulares,
  obterAutorPrincipal,
  usuarioPodeAcessar,
  verificarPermissaoDownload,
  extrairTagsUnicas,

  // Configurações
  CATEGORIAS_LIVROS,
  LIMITES_SISTEMA,
} from '@/lib';

/**
 * Componente de exemplo: Página de Biblioteca
 * Demonstra filtro, busca, validação e formatação
 */
export default function BibliotecaPaginaExemplo() {
  // Estado local
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('');
  const [termosBusca, setTermosBusca] = useState<string>('');
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
  const populares = useMemo(
    () => obterRecursosPopulares(livrosExemplo, 3),
    []
  );

  // Extrair todas as tags únicas
  const tags = useMemo(() => extrairTagsUnicas(livrosExemplo), []);

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-8">
      {/* ========== SEÇÃO HERO ========== */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Biblioteca Star B</h1>
        <p className="text-gray-600">
          Acervo completo de livros técnicos para engenharia e programação
        </p>
      </section>

      {/* ========== BARRA DE BUSCA ========== */}
      <section className="bg-gray-50 p-6 rounded-lg space-y-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium mb-2">
            Buscar Livros
          </label>
          <input
            id="search"
            type="text"
            placeholder="Digite título, descrição ou tags..."
            value={termosBusca}
            onChange={(e) => setTermosBusca(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Categoria
          </label>
          <select
            id="category"
            value={categoriaSelecionada}
            onChange={(e) => setCategoriaSelecionada(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(populares as Livro[]).map((livro) => (
            <CartaLivro
              key={livro.id}
              livro={livro}
              usuario={usuarioAtual}
            />
          ))}
        </div>
      </section>

      {/* ========== LISTA DE LIVROS FILTRADOS ========== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Todos os Livros</h2>

        {livrosFiltrados.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">
              Nenhum livro encontrado com esses critérios.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {livrosFiltrados.slice(0, LIMITES_SISTEMA.itensPorPagina).map((livro) => (
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
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition"
            >
              #{tag}
            </button>
          ))}
        </div>
      </section>

      {/* ========== INFORMAÇÕES DO USUÁRIO ========== */}
      <section className="bg-blue-50 p-6 rounded-lg space-y-2">
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
          <strong>Downloads permitidos:</strong>{' '}
          {usuarioAtual.subscricao.plano.acessoDownloads ? '✅ Sim' : '❌ Não'}
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
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition">
      {/* Imagem */}
      {livro.urls.capa && (
        <div className="relative h-48 bg-gray-200">
          <Image
            src={livro.urls.capa.url}
            alt={livro.titulo}
            fill
            className="object-cover"
          />
          {livro.eNovo && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
              NOVO
            </div>
          )}
        </div>
      )}

      {/* Conteúdo */}
      <div className="p-4 space-y-2">
        <h3 className="font-bold line-clamp-2">{livro.titulo}</h3>

        <p className="text-sm text-gray-600 line-clamp-2">
          {livro.descricao}
        </p>

        <div className="flex justify-between text-xs text-gray-500">
          <span>👁️ {livro.estatisticas.views}</span>
          <span>⬇️ {livro.estatisticas.downloads}</span>
          <span>⭐ {livro.estatisticas.avaliacaoMedia.toFixed(1)}</span>
        </div>

        <div className="flex gap-2 pt-2">
          <span
            className={`text-xs px-2 py-1 rounded ${
              livro.tipo === TipoConteudo.LIVRE
                ? 'bg-green-100 text-green-800'
                : 'bg-purple-100 text-purple-800'
            }`}
          >
            {livro.tipo === TipoConteudo.LIVRE ? '🆓 Grátis' : '💰 Pago'}
          </span>

          {!podeAcessar && (
            <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
              🔒 Restrito
            </span>
          )}
        </div>

        {!permissao.permitido && (
          <p className="text-xs text-red-600">{permissao.motivo}</p>
        )}

        <Link
          href={`/biblioteca/livros/${livro.id}`}
          className="block w-full text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition text-sm font-medium"
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
    <div className="border rounded-lg p-4 hover:bg-gray-50 transition">
      <div className="flex gap-4">
        {/* Imagem */}
        {livro.urls.capa && (
          <div className="relative w-24 h-32 flex-shrink-0">
            <Image
              src={livro.urls.capa.url}
              alt={livro.titulo}
              fill
              className="object-cover rounded"
            />
          </div>
        )}

        {/* Info */}
        <div className="flex-grow space-y-2">
          <div className="flex justify-between items-start">
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
            <span className="text-xs bg-gray-200 px-2 py-1 rounded">
              {livro.categoria}
            </span>
            {livro.isbn && (
              <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                ISBN: {livro.isbn}
              </span>
            )}
            <span
              className={`text-xs px-2 py-1 rounded ${
                livro.tipo === TipoConteudo.LIVRE
                  ? 'bg-green-100 text-green-800'
                  : 'bg-purple-100 text-purple-800'
              }`}
            >
              {livro.tipo === TipoConteudo.LIVRE ? 'Grátis' : 'Pago'}
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
            className="inline-block text-blue-600 hover:underline text-sm font-medium"
          >
            Abrir Livro →
          </Link>
        </div>
      </div>
    </div>
  );
}
