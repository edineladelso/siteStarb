/**
 * Configurações centralizadas da plataforma Star B
 * Contém variáveis, constantes e configurações do sistema
 */

import {
  ConfiguracaoBancoDados,
  ConfiguracaoCloudinary,
  ConfiguracaoSistema,
} from "./tipos";

// ============================================
// CONFIGURAÇÕES DO CLOUDINARY
// ============================================

export const configuracaoCloudinary: ConfiguracaoCloudinary = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME || "starb",
  apiKey: process.env.CLOUDINARY_API_KEY || "",
  apiSecret: process.env.CLOUDINARY_API_SECRET || "",
  pastaUploads: "starb",
  precisaoCompressao: "media",
};

// ============================================
// CONFIGURAÇÕES DO BANCO DE DADOS
// ============================================

export const configuracaoBancoDados: ConfiguracaoBancoDados = {
  provider: "postgres",
  connectionString: process.env.DATABASE_URL || "",
  pool: {
    min: 1,
    max: 20,
  },
};

// ============================================
// CONFIGURAÇÕES DO SISTEMA
// ============================================

export const configuracaoSistema: ConfiguracaoSistema = {
  nomeApp: "Star B",
  versao: "1.0.0",
  ambiente: (process.env.NODE_ENV || "desenvolvimento") as
    | "desenvolvimento"
    | "producao"
    | "teste",
  cloudinary: configuracaoCloudinary,
  bancoDados: configuracaoBancoDados,
  chaveSecreta: process.env.SECRET_KEY || "development-secret-key",
  urlBase: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  paginasMaximas: 20,
  limiteDownloadDiario: 5,
};

// ============================================
// CONSTANTES DO SISTEMA
// ============================================

export const CATEGORIAS_LIVROS = [
  "Circuitos Eletricos",
  "Eletrônica",
  "Matemática",
  "Física",
  "Química",
  "Mecânica",
  "Engenharia",
  "Programação",
  "Eletrica",
  "Automação e Controle",
  "Inteligência Artificial",
  "Ciência de Dados",
  "Redes de Computadores",
  "Segurança da Informação",
  "Construção Civil",
];

export const CATEGORIAS_SOFTWARE = [
  "Análise e Simulação",
  "Computação Científica",
  "Virtualização",
  "CAD e Design",
  "IDE e Editores de Código",
  "Desenvolvimento Web",
  "Ferramentas DevOps",
];

export const CATEGORIAS_PROJETO = [
  "Pesquisa",
  "TCC",
  "Dissertação",
  "Artigo",
  "Projeto Real",
  "Embarcado",
  "IA",
  "Software",
];

export const IDIOMAS_SUPORTADOS = [
  { codigo: "pt-BR", nome: "Português (Brasil)" },
  { codigo: "pt-PT", nome: "Português (Portugal)" },
  { codigo: "en-US", nome: "Inglês (EUA)" },
  { codigo: "es-ES", nome: "Espanhol (Espanha)" },
  { codigo: "fr-FR", nome: "Francês (França)" },
];

export const LICENCAS_SOFTWARE = [
  "MIT",
  "GPL v2",
  "GPL v3",
  "Apache 2.0",
  "BSD",
  "Comercial",
  "Proprietária",
  "Código Aberto",
];

// ============================================
// LIMITES E COTAS
// ============================================

export const LIMITES_SISTEMA = {
  // Uploads
  tamanhoMaximoUpload: 500 * 1024 * 1024, // 500 MB
  tiposArquivosPermitidos: [
    "application/pdf",
    "application/epub+zip",
    "image/jpeg",
    "image/png",
    "image/webp",
    "video/mp4",
  ],

  // Busca e Paginação
  itensPorPagina: 20,
  maximoResultadosBusca: 100,

  // Conteúdo
  tamanhoMaximoDescricao: 5000,
  tamanhoMaximoConteudo: 100000,

  // Usuário
  tentativasLoginMaximas: 5,
  tempoExpirSessao: 24 * 60 * 60, // 24 horas em segundos
};

// ============================================
// CONFIGURAÇÕES DE BUSCA
// ============================================

export const CONFIGURACOES_BUSCA = {
  apenasPublicados: true,
  ordenacaoTempoReal: true,
  cache: true,
  tempoExpirCache: 1 * 60 * 60, // 1 hora em segundos
};

// ============================================
// CONFIGURAÇÕES DE EMAIL
// ============================================

export const CONFIGURACOES_EMAIL = {
  provedorSMTP: process.env.SMTP_PROVIDER || "sendgrid",
  emailFrom: process.env.EMAIL_FROM || "noreply@starb.com",
  nomeSistema: "Star B",
};

// ============================================
// CONFIGURAÇÕES DE SEGURANÇA
// ============================================

export const CONFIGURACOES_SEGURANCA = {
  habilitarRateLimiting: true,
  habilitarCSRF: true,
  habilitarCORS: true,
  origensPermitidas: [
    "http://localhost:3000",
    "http://localhost:3001",
    process.env.NEXT_PUBLIC_BASE_URL,
  ].filter(Boolean),
  duracaoTokenJWT: "7 dias",
};

// ============================================
// CONFIGURAÇÕES DE CLOUDINARY PARA UPLOADS
// ============================================

export const PRESETS_UPLOAD_CLOUDINARY = {
  livros: {
    pasta: "starb/livros",
    tamanhoMaximo: 200 * 1024 * 1024, // 200 MB
    tipos: ["pdf", "epub"],
  },
  capas: {
    pasta: "starb/capas",
    tamanhoMaximo: 5 * 1024 * 1024, // 5 MB
    tipos: ["avif", "png", "webp"],
    larguraFixa: 400,
    alturaFixa: 600,
  },
  softwares: {
    pasta: "starb/softwares",
    tamanhoMaximo: 500 * 1024 * 1024, // 500 MB
    tipos: ["zip", "tar", "gz"],
  },
  projetos: {
    pasta: "starb/projetos",
    tamanhoMaximo: 200 * 1024 * 1024, // 200 MB
    tipos: ["pdf", "zip", "code"],
  },
  usuarios: {
    pasta: "starb/usuarios",
    tamanhoMaximo: 2 * 1024 * 1024, // 2 MB
    tipos: ["jpg", "png", "webp"],
  },
};

// ============================================
// MENSAGENS DO SISTEMA
// ============================================

export const MENSAGENS_SISTEMA = {
  sucesso: {
    uploadCompleto: "Arquivo enviado com sucesso!",
    salvoComSucesso: "Salvo com sucesso!",
    deletadoComSucesso: "Deletado com sucesso!",
  },
  erro: {
    erroGenerico: "Ocorreu um erro. Tente novamente.",
    arquivoMuitoGrande: "O arquivo é muito grande. Tamanho máximo: {tamanho}",
    tipoArquivoInvalido: "Tipo de arquivo não permitido",
    semPermissao: "Você não tem permissão para realizar esta ação",
    recursoNaoEncontrado: "Recurso não encontrado",
    erroServidor: "Erro no servidor. Tente novamente mais tarde.",
  },
  aviso: {
    naoLogado: "Você precisa estar logado para acessar isto",
    acessoRestrito: "Este conteúdo requer acesso premium",
  },
};

// ============================================
// ROTAS E NAVEGAÇÃO
// ============================================

export const ROTAS = {
  home: "/",
  biblioteca: "/biblioteca",
  livros: "/biblioteca/livros",
  softwares: "/softwares",
  projetos: "/projetos",
  artigos: "/academico/artigos",
  ia: "/ia",
  premium: "/plano/premium",
  sobre: "/sobre",
  contato: "/contato",
  dashboard: "/dashboard",
  perfil: "/perfil",
  configuracoes: "/configuracoes",
  admin: "/admin",
  login: "/login",
  signup: "/signup",
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export function isProducao(): boolean {
  return configuracaoSistema.ambiente === "producao";
}

export function isDesenvolvimento(): boolean {
  return configuracaoSistema.ambiente === "desenvolvimento";
}

export function isTeste(): boolean {
  return configuracaoSistema.ambiente === "teste";
}
