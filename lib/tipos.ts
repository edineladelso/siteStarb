/**
 * Tipos centralizados para toda a plataforma Star B
 * Inclui estruturas para Livros, Softwares, Projetos, Usuários e Configurações
 */

import type { StatusType } from "./drizzle/db";

// ============================================
// TIPOS DE ENUMERAÇÃO
// ============================================

export enum TipoConteudo {
  PAGO = 'pago',
  LIVRE = 'livre',
}

export enum NivelAcesso {
  VISITANTE = 'visitante',
  USUARIO_BASICO = 'usuario_basico',
  USUARIO_PREMIUM = 'usuario_premium',
  MODERADOR = 'moderador',
  ADMINISTRADOR = 'administrador',
}

export enum TipoMidia {
  PDF = 'pdf',
  EPUB = 'epub',
  IMAGEM = 'imagem',
  VIDEO = 'video',
  AUDIO = 'audio',
  DOCUMENTO = 'documento',
}
// ============================================
// TIPOS DE MÍDIA E CLOUDINARY
// ============================================

export interface ArmazenamentoCloudinary {
  publicId: string;
  url: string;
  tipoMidia: TipoMidia;
  tamanhoBytes: number;
  dataUpload: Date;
}

export interface URLsRecursos {
  capa?: ArmazenamentoCloudinary;
  pdf?: ArmazenamentoCloudinary;
  epub?: ArmazenamentoCloudinary;
  resumoIA?: string;
  sinopse?: string;
}

// ============================================
// TIPOS PARA LIVROS
// ============================================

export interface PermissaoDownload {
  permitido: boolean;
  mensagemPublicador?: string;
  dataExpiracao?: Date;
  restricoes?: string[];
}

export interface EstatisticasLivro {
  views: number;
  downloads: number;
  avaliacaoMedia: number;
  totalAvaliacoes: number;
  dataUltimaAtualizacao: Date;
}

export interface EspecificacoesSistema {
  sO: string[];
  arquitetura: string[];
  memoriaMinima: string;
  discoMinimo: string;
  processador?: string;
}

export interface EstatisticasSoftware {
  downloads: number;
  versaoAtual: string;
  views: number;
  avaliacaoMedia?: number;
  totalAvaliacoes?: number;
  dataUltimaAtualizacao?: Date;
}


// ============================================
// TIPOS PARA PROJETOS E PESQUISA
// ============================================

export interface EtapaProjeto {
  numero: number;
  titulo: string;
  descricao: string;
  duracao?: string;
  resultado: string;
  urls?: {
    codigo?: ArmazenamentoCloudinary;
    imagens: ArmazenamentoCloudinary[];
    videos?: ArmazenamentoCloudinary[];
  };
}

export interface Tecnologia {
  nome: string;
  versao?: string;
  url?: string;
}

export interface EstatisticasProjeto {
  views: number;
  clones?: number;
  forks?: number;
  stars?: number;
  downloads: number;
  avaliacaoMedia: number;
  totalAvaliacoes: number;
  dataUltimaAtualizacao: Date;
}
export interface PlanSubscricao {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  moeda: string;
  nivelAcesso: NivelAcesso;
  recursosDiarios?: number;
  recursosMensais?: number;
  acessoIA: boolean;
  acessoProjetos: boolean;
  acessoDownloads: boolean;
  ativo: boolean;
}

export interface Subscricao {
  planoId: string;
  plano: PlanSubscricao;
  dataInicio: Date;
  dataExpiracao?: Date;
  ativa: boolean;
  metodoPagamento?: string;
  ultimoPagamento?: Date;
}

export interface PreferencesUsuario {
  tema: 'claro' | 'escuro' | 'auto';
  idioma: string;
  notificacoesEmail: boolean;
  notificacoesPush: boolean;
  privacidadePublica: boolean;
}

export interface ActividadeUsuario {
  livrosLidos: string[];
  softwaresVisualizados: string[];
  projetosVisualizados: string[];
  avaliacoesRealizadas: { id: string; nota: number; data: Date }[];
  downloadRealizados: { id: string; tipo: string; data: Date }[];
}

export interface Usuario {
  id: string;
  email: string;
  nomeCompleto: string;
  fotoPerfil?: string;
  biografia?: string;
  profissao?: string;
  telefone?: string;
  pais?: string;
  dataNascimento?: Date;
  nivelAcesso: NivelAcesso;
  subscricao: Subscricao;
  ativo: boolean;
  dataCadastro: Date;
  dataUltimoAcesso: Date;
  preferences: PreferencesUsuario;
  atividade: ActividadeUsuario;
}

// ============================================
// TIPOS PARA NAVEGAÇÃO E UI
// ============================================

export interface ItemMenu {
  titulo: string;
  href: string;
  descricao: string;
  icone?: string;
  badge?: string;
}

export interface ItemNavegacao {
  titulo: string;
  href: string;
  icone?: string;
}

export interface LinkDocumentacao {
  titulo: string;
  href: string;
  descricao: string;
}

export interface OpcaoTema {
  nome: 'Claro' | 'Escuro';
  icone: 'circle' | 'circle-check';
}

export interface Recurso {
  titulo: string;
  descricao: string;
  href: string;
  badge?: string;
}

// ============================================
// TIPOS PARA BUSCA E FILTROS
// ============================================

export interface FiltrosPesquisa {
  categoria?: string;
  tipo?: TipoConteudo;
  idioma?: string;
  ordenacao?: 'relevancia' | 'recente' | 'populares' | 'avaliacao';
  apenasNovos?: boolean;
  nivelAcesso?: NivelAcesso;
}

export interface ResultadoPesquisa {
  id: string;
  titulo: string;
  descricao: string;
  tipo: 'livro' | 'software' | 'projeto' | 'artigo';
  capa?: string;
  popularidade: number;
  href: string;
}

// ============================================
// TIPOS PARA ARGUMENTOS EPublicacao TEXTOS
// ============================================

export interface SecaoTexto {
  id: string;
  titulo: string;
  conteudo: string;
  ordem: number;
  subSeco: SecaoTexto[];
}

// ============================================
// TIPOS PARA CONFIGURAÇÕES DO SISTEMA
// ============================================

export interface ConfiguracaoCloudinary {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  pastaUploads: string;
  precisaoCompressao: 'alta' | 'media' | 'baixa';
}

export interface ConfiguracaoBancoDados {
  provider: 'postgres' | 'mysql' | 'sqlite';
  connectionString: string;
  pool?: {
    min: number;
    max: number;
  };
}

export interface ConfiguracaoSistema {
  nomeApp: string;
  versao: string;
  ambiente: 'desenvolvimento' | 'producao' | 'teste';
  cloudinary: ConfiguracaoCloudinary;
  bancoDados: ConfiguracaoBancoDados;
  chaveSecreta: string;
  urlBase: string;
  paginasMaximas: number;
  limiteDownloadDiario: number;
}
