/**
 * Utilitários para manipulação de dados centralizados
 * Inclui funções para filtro, busca, formatação e processamento
 */

import {
  Livro,
  Software,
  Projeto,
  Usuario,
  FiltrosPesquisa,
  ResultadoPesquisa,
  TipoConteudo,
  NivelAcesso,
  EstatisticasLivro,
  EstatisticasSoftware,
  EstatisticasProjeto,
} from './tipos';

// ============================================
// FUNÇÕES DE FILTRO
// ============================================

export function filtrarLivrosPorCategoria(
  livros: Livro[],
  categoria: string
): Livro[] {
  return livros.filter((livro) =>
    livro.categoria.toLowerCase() === categoria.toLowerCase()
  );
}

export function filtrarPorTipo(
  recurso: Livro | Software | Projeto,
  tipo: TipoConteudo
): boolean {
  return recurso.tipo === tipo;
}

export function filtrarPorNivel(
  usuario: Usuario,
  nivelMinimo: NivelAcesso
): boolean {
  const niveis = [
    NivelAcesso.VISITANTE,
    NivelAcesso.USUARIO_BASICO,
    NivelAcesso.USUARIO_PREMIUM,
    NivelAcesso.MODERADOR,
    NivelAcesso.ADMINISTRADOR,
  ];

  const indexUsuario = niveis.indexOf(usuario.nivelAcesso);
  const indexMinimo = niveis.indexOf(nivelMinimo);

  return indexUsuario >= indexMinimo;
}

export function filtrarNovos(recursos: (Livro | Software | Projeto)[]): (Livro | Software | Projeto)[] {
  return recursos.filter((r) => r.eNovo);
}

export function aplicarFiltrosPesquisa(
  livros: Livro[],
  softwares: Software[],
  projetos: Projeto[],
  filtros: FiltrosPesquisa
): ResultadoPesquisa[] {
  const resultados: ResultadoPesquisa[] = [];

  // Filtrar livros
  let livrosFiltrados = livros;
  if (filtros.categoria) {
    livrosFiltrados = filtrarLivrosPorCategoria(livros, filtros.categoria);
  }
  if (filtros.tipo) {
    livrosFiltrados = livrosFiltrados.filter((l) =>
      filtrarPorTipo(l, filtros.tipo!)
    );
  }
  if (filtros.apenasNovos) {
    livrosFiltrados = livrosFiltrados.filter((l) => l.eNovo);
  }

  resultados.push(
    ...livrosFiltrados.map((livro) => ({
      id: livro.id,
      titulo: livro.titulo,
      descricao: livro.descricao,
      tipo: 'livro' as const,
      capa: livro.urls.capa?.url,
      popularidade: livro.popularidade,
      href: `/biblioteca/livros/${livro.id}`,
    }))
  );

  // Filtrar softwares
  let softwaresFiltrados = softwares;
  if (filtros.categoria) {
    softwaresFiltrados = softwares.filter(
      (s) => s.categoria.toLowerCase() === filtros.categoria!.toLowerCase()
    );
  }
  if (filtros.tipo) {
    softwaresFiltrados = softwaresFiltrados.filter((s) =>
      filtrarPorTipo(s, filtros.tipo!)
    );
  }
  if (filtros.apenasNovos) {
    softwaresFiltrados = softwaresFiltrados.filter((s) => s.eNovo);
  }

  resultados.push(
    ...softwaresFiltrados.map((software) => ({
      id: software.id,
      titulo: software.nome,
      descricao: software.descricao,
      tipo: 'software' as const,
      capa: software.urls.capa?.url,
      popularidade: software.popularidade,
      href: `/softwares/${software.id}`,
    }))
  );

  // Filtrar projetos
  let projetosFiltrados = projetos;
  if (filtros.tipo) {
    projetosFiltrados = projetosFiltrados.filter((p) =>
      filtrarPorTipo(p, filtros.tipo!)
    );
  }
  if (filtros.apenasNovos) {
    projetosFiltrados = projetosFiltrados.filter((p) => p.eNovo);
  }

  resultados.push(
    ...projetosFiltrados.map((projeto) => ({
      id: projeto.id,
      titulo: projeto.titulo,
      descricao: projeto.descricao,
      tipo: 'projeto' as const,
      capa: projeto.urls.capa?.url,
      popularidade: projeto.popularidade,
      href: `/projetos/${projeto.id}`,
    }))
  );

  // Aplicar ordenação
  if (filtros.ordenacao) {
    resultados.sort((a, b) => {
      switch (filtros.ordenacao) {
        case 'recente':
          return 0;
        case 'populares':
          return b.popularidade - a.popularidade;
        case 'avaliacao':
          return 0;
        default:
          return 0;
      }
    });
  }

  return resultados;
}

// ============================================
// FUNÇÕES DE BUSCA
// ============================================

export function buscarLivros(
  livros: Livro[],
  termo: string
): Livro[] {
  const termoLower = termo.toLowerCase();
  return livros.filter(
    (livro) =>
      livro.titulo.toLowerCase().includes(termoLower) ||
      livro.descricao.toLowerCase().includes(termoLower) ||
      livro.tags.some((tag) => tag.toLowerCase().includes(termoLower))
  );
}

export function buscarSoftwares(
  softwares: Software[],
  termo: string
): Software[] {
  const termoLower = termo.toLowerCase();
  return softwares.filter(
    (software) =>
      software.nome.toLowerCase().includes(termoLower) ||
      software.descricao.toLowerCase().includes(termoLower) ||
      software.tags.some((tag) => tag.toLowerCase().includes(termoLower))
  );
}

export function buscarProjetos(
  projetos: Projeto[],
  termo: string
): Projeto[] {
  const termoLower = termo.toLowerCase();
  return projetos.filter(
    (projeto) =>
      projeto.titulo.toLowerCase().includes(termoLower) ||
      projeto.descricao.toLowerCase().includes(termoLower) ||
      projeto.tags.some((tag) => tag.toLowerCase().includes(termoLower))
  );
}

// ============================================
// FUNÇÕES DE FORMATAÇÃO
// ============================================

export function formatarData(data: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(data);
}

export function formatarDataCompleta(data: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(data);
}

export function formatarPreco(preco: number, moeda: string = 'BRL'): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: moeda,
  }).format(preco);
}

export function formatarNumeros(numero: number): string {
  if (numero >= 1_000_000) {
    return (numero / 1_000_000).toFixed(1) + 'M';
  }
  if (numero >= 1_000) {
    return (numero / 1_000).toFixed(1) + 'K';
  }
  return numero.toString();
}

// ============================================
// FUNÇÕES DE VALIDAÇÃO
// ============================================

export function usuarioPodeAcessar(
  usuario: Usuario,
  recurso: Livro | Software | Projeto
): boolean {
  // Recursos gratuitos são acessíveis para todos
  if (recurso.tipo === TipoConteudo.LIVRE) {
    return true;
  }

  // Recursos pagos precisam de acesso premium
  if (recurso.tipo === TipoConteudo.PAGO) {
    return (
      usuario.nivelAcesso === NivelAcesso.USUARIO_PREMIUM ||
      usuario.nivelAcesso === NivelAcesso.MODERADOR ||
      usuario.nivelAcesso === NivelAcesso.ADMINISTRADOR
    );
  }

  return false;
}

export function usuarioPodeDownload(usuario: Usuario): boolean {
  const plano = usuario.subscricao.plano;
  return plano.acessoDownloads;
}

export function usuarioPodeAcessarIA(usuario: Usuario): boolean {
  const plano = usuario.subscricao.plano;
  return plano.acessoIA;
}

export function verificarPermissaoDownload(
  livro: Livro,
  usuario: Usuario
): { permitido: boolean; motivo?: string } {
  if (!livro.permissaoDownload.permitido) {
    return {
      permitido: false,
      motivo: 'O publicador não permite downloads deste livro',
    };
  }

  if (!usuarioPodeAcessar(usuario, livro)) {
    return {
      permitido: false,
      motivo: 'Você não tem acesso a este recurso',
    };
  }

  if (!usuarioPodeDownload(usuario)) {
    return {
      permitido: false,
      motivo: 'Seu plano não permite downloads',
    };
  }

  return { permitido: true };
}

// ============================================
// FUNÇÕES DE ESTATÍSTICAS
// ============================================

export function calcularTaxaCrescimento(
  estatisticasAntigas: number,
  estatisticasNovas: number
): number {
  if (estatisticasAntigas === 0) return 0;
  return ((estatisticasNovas - estatisticasAntigas) / estatisticasAntigas) * 100;
}

export function obterTendencia(recurso: Livro | Software | Projeto): 'em_alta' | 'estavel' | 'em_baixa' {
  const { views, downloads } = recurso.estatisticas as EstatisticasLivro | EstatisticasSoftware | EstatisticasProjeto;
  
  const proporacao = downloads / (views || 1);
  
  if (proporacao > 0.3) return 'em_alta';
  if (proporacao > 0.1) return 'estavel';
  return 'em_baixa';
}

export function obterRecursosPopulares(
  recursosy: (Livro | Software | Projeto)[],
  limite: number = 10
): (Livro | Software | Projeto)[] {
  return recursosy
    .sort((a, b) => b.popularidade - a.popularidade)
    .slice(0, limite);
}

export function obterRecursosMaisVisualizados(
  recursos: (Livro | Software | Projeto)[],
  limite: number = 10
): (Livro | Software | Projeto)[] {
  return recursos
    .sort((a, b) => {
      const viewsA = (a.estatisticas as EstatisticasLivro | EstatisticasSoftware | EstatisticasProjeto).views;
      const viewsB = (b.estatisticas as EstatisticasLivro | EstatisticasSoftware | EstatisticasProjeto).views;
      return viewsB - viewsA;
    })
    .slice(0, limite);
}

// ============================================
// FUNÇÕES DE MANIPULAÇÃO
// ============================================

export function extrairTagsUnicas(
  recursos: (Livro | Software | Projeto)[]
): string[] {
  const tags = new Set<string>();
  recursos.forEach((recurso) => {
    recurso.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

export function agruparPorCategoria(
  livros: Livro[]
): Record<string, Livro[]> {
  return livros.reduce(
    (acc, livro) => {
      if (!acc[livro.categoria]) {
        acc[livro.categoria] = [];
      }
      acc[livro.categoria].push(livro);
      return acc;
    },
    {} as Record<string, Livro[]>
  );
}

export function obterAutorPrincipal(
  recurso: Livro | Software | Projeto
): string {
  const autorPrincipal = recurso.autores.find((c) => c.tipo === 'autor');
  return autorPrincipal?.autor.nome || 'Desconhecido';
}

// ============================================
// FUNÇÕES PARA CLOUDINARY
// ============================================

export function gerarURLCloudinary(
  publicId: string,
  opcoes?: {
    largura?: number;
    altura?: number;
    qualidade?: 'auto' | 'low' | 'medium' | 'high';
    formato?: 'auto' | 'webp' | 'jpg' | 'png';
  }
): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME || 'starb';
  let url = `https://res.cloudinary.com/${cloudName}/image/upload`;

  const transformacoes: string[] = [];

  if (opcoes?.largura) {
    transformacoes.push(`w_${opcoes.largura}`);
  }

  if (opcoes?.altura) {
    transformacoes.push(`h_${opcoes.altura}`);
  }

  if (opcoes?.qualidade) {
    transformacoes.push(`q_${opcoes.qualidade}`);
  }

  if (opcoes?.formato) {
    transformacoes.push(`f_${opcoes.formato}`);
  }

  if (transformacoes.length > 0) {
    url += `/${transformacoes.join(',')}/`;
  } else {
    url += '/';
  }

  return url + publicId;
}

export function obterURLCapaOtimizada(
  publicId: string,
  largura: number = 400,
  altura: number = 600
): string {
  return gerarURLCloudinary(publicId, {
    largura,
    altura,
    qualidade: 'high',
    formato: 'auto',
  });
}
