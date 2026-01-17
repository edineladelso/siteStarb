
import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  decimal,
  jsonb,
  index,
  foreignKey,
} from "drizzle-orm/pg-core";

// ============================================
// TABELA DE AUTORES
// ============================================

export const autores = pgTable(
  'autores',
  {
    id: serial('id').primaryKey(),
    nome: text('nome').notNull(),
    email: varchar('email', { length: 256 }).notNull().unique(),
    urlPerfil: text('url_perfil'),
    fotoPerfil: text('foto_perfil'),
    biografiaBreve: text('biografia_breve'),
    dataRegistro: timestamp('data_registro').defaultNow().notNull(),
    ativo: boolean('ativo').default(true).notNull(),
  },
  (table) => ({
    emailIdx: index('autores_email_idx').on(table.email),
  })
);

// ============================================
// TABELA DE USUÁRIOS E PLANOS
// ============================================

export const planosSubscricao = pgTable('planos_subscricao', {
  id: serial('id').primaryKey(),
  nome: varchar('nome', { length: 100 }).notNull(),
  descricao: text('descricao'),
  preco: decimal('preco', { precision: 10, scale: 2 }).notNull(),
  moeda: varchar('moeda', { length: 10 }).default('BRL').notNull(),
  nivelAcesso: varchar('nivel_acesso', {
    length: 50,
    enum: ['visitante', 'usuario_basico', 'usuario_premium', 'moderador', 'administrador'],
  }).notNull(),
  recursosDiarios: integer('recursos_diarios'),
  recursosMensais: integer('recursos_mensais'),
  acessoIA: boolean('acesso_ia').default(false),
  acessoProjetos: boolean('acesso_projetos').default(false),
  acessoDownloads: boolean('acesso_downloads').default(false),
  ativo: boolean('ativo').default(true),
});

export const usuarios = pgTable(
  'usuarios',
  {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 256 }).notNull().unique(),
    nomeCompleto: text('nome_completo').notNull(),
    fotoPerfil: text('foto_perfil'),
    biografia: text('biografia'),
    profissao: varchar('profissao', { length: 256 }),
    telefone: varchar('telefone', { length: 20 }),
    pais: varchar('pais', { length: 100 }),
    dataNascimento: timestamp('data_nascimento'),
    nivelAcesso: varchar('nivel_acesso', {
      length: 50,
      enum: ['visitante', 'usuario_basico', 'usuario_premium', 'moderador', 'administrador'],
    }).default('usuario_basico').notNull(),
    planoAtualId: integer('plano_atual_id'),
    ativo: boolean('ativo').default(true),
    dataCadastro: timestamp('data_cadastro').defaultNow().notNull(),
    dataUltimoAcesso: timestamp('data_ultimo_acesso'),
    preferences: jsonb('preferences'),
  },
  (table) => ({
    emailIdx: index('usuarios_email_idx').on(table.email),
    planoFk: foreignKey({
      columns: [table.planoAtualId],
      foreignColumns: [planosSubscricao.id],
    }),
  })
);

export const subscricoes = pgTable('subscricoes', {
  id: serial('id').primaryKey(),
  usuarioId: integer('usuario_id').notNull(),
  planoId: integer('plano_id').notNull(),
  dataInicio: timestamp('data_inicio').defaultNow().notNull(),
  dataExpiracao: timestamp('data_expiracao'),
  ativa: boolean('ativa').default(true),
  metodoPagamento: varchar('metodo_pagamento', { length: 50 }),
  ultimoPagamento: timestamp('ultimo_pagamento'),
  foreignKey(() => [subscricoes.usuarioId, usuarios.id]),
  foreignKey(() => [subscricoes.planoId, planosSubscricao.id]),
});

// ============================================
// TABELA DE LIVROS
// ============================================

export const livros = pgTable(
  'livros',
  {
    id: serial('id').primaryKey(),
    titulo: text('titulo').notNull(),
    descricao: text('descricao').notNull(),
    descricaoCompleta: text('descricao_completa'),
    categoria: varchar('categoria', { length: 100 }).notNull(),
    subcategoria: varchar('subcategoria', { length: 100 }),
    tipo: varchar('tipo', { length: 20, enum: ['pago', 'livre'] }).notNull(),
    isbn: varchar('isbn', { length: 20 }).unique(),
    issn: varchar('issn', { length: 20 }).unique(),
    editora: varchar('editora', { length: 256 }),
    anoPublicacao: integer('ano_publicacao'),
    idioma: varchar('idioma', { length: 20 }).default('pt-BR'),
    paginas: integer('paginas'),
    urlCapa: text('url_capa'),
    urlPdf: text('url_pdf'),
    urlEpub: text('url_epub'),
    resumoIA: text('resumo_ia'),
    sinopse: text('sinopse'),
    permissaoDonload: boolean('permissao_download').default(true),
    mensagemPublicador: text('mensagem_publicador'),
    views: integer('views').default(0),
    downloads: integer('downloads').default(0),
    avaliacaoMedia: decimal('avaliacao_media', { precision: 3, scale: 2 }).default('0'),
    totalAvaliacoes: integer('total_avaliacoes').default(0),
    popularidade: decimal('popularidade', { precision: 4, scale: 2 }).default('0'),
    eNovo: boolean('e_novo').default(false),
    tags: jsonb('tags'),
    status: varchar('status', {
      length: 20,
      enum: ['rascunho', 'publicado', 'arquivado'],
    }).default('publicado'),
    dataCriacao: timestamp('data_criacao').defaultNow(),
    dataPublicacao: timestamp('data_publicacao'),
    dataAtualizacao: timestamp('data_atualizacao').defaultNow(),
  },
  (table) => ({
    categoriaIdx: index('livros_categoria_idx').on(table.categoria),
    tipoIdx: index('livros_tipo_idx').on(table.tipo),
    isbnIdx: index('livros_isbn_idx').on(table.isbn),
  })
);

export const livrosAutores = pgTable(
  'livros_autores',
  {
    id: serial('id').primaryKey(),
    livroId: integer('livro_id').notNull(),
    autorId: integer('autor_id').notNull(),
    tipoContribuicao: varchar('tipo_contribuicao', {
      length: 50,
      enum: ['autor', 'editor', 'revisor', 'ilustrador', 'tradutor'],
    }).notNull(),
    dataContribuicao: timestamp('data_contribuicao').defaultNow(),
  },
  (table) => ({
    livroFk: foreignKey({
      columns: [table.livroId],
      foreignColumns: [livros.id],
    }),
    autorFk: foreignKey({
      columns: [table.autorId],
      foreignColumns: [autores.id],
    }),
  })
);

// ============================================
// TABELA DE SOFTWARES
// ============================================

export const softwares = pgTable(
  'softwares',
  {
    id: serial('id').primaryKey(),
    nome: text('nome').notNull(),
    descricao: text('descricao').notNull(),
    descricaoCompleta: text('descricao_completa'),
    categoria: varchar('categoria', { length: 100 }).notNull(),
    subcategoria: varchar('subcategoria', { length: 100 }),
    tipo: varchar('tipo', { length: 20, enum: ['pago', 'livre'] }).notNull(),
    urlCapa: text('url_capa'),
    resumoIA: text('resumo_ia'),
    sinopse: text('sinopse'),
    urlOficial: text('url_oficial').notNull(),
    urlDownload: text('url_download'),
    versao: varchar('versao', { length: 50 }).notNull(),
    licenca: varchar('licenca', { length: 100 }).notNull(),
    sO: jsonb('so').notNull(),
    arquitetura: jsonb('arquitetura'),
    memoriaMinima: varchar('memoria_minima', { length: 50 }),
    discoMinimo: varchar('disco_minimo', { length: 50 }),
    suportaPlugins: boolean('suporta_plugins').default(false),
    scriptable: boolean('scriptable').default(false),
    comunidadeSize: varchar('comunidade_size', {
      length: 20,
      enum: ['pequena', 'media', 'grande'],
    }),
    views: integer('views').default(0),
    downloads: integer('downloads').default(0),
    avaliacaoMedia: decimal('avaliacao_media', { precision: 3, scale: 2 }).default('0'),
    totalAvaliacoes: integer('total_avaliacoes').default(0),
    popularidade: decimal('popularidade', { precision: 4, scale: 2 }).default('0'),
    eNovo: boolean('e_novo').default(false),
    tags: jsonb('tags'),
    status: varchar('status', {
      length: 20,
      enum: ['rascunho', 'publicado', 'arquivado'],
    }).default('publicado'),
    dataCriacao: timestamp('data_criacao').defaultNow(),
    dataPublicacao: timestamp('data_publicacao'),
    dataAtualizacao: timestamp('data_atualizacao').defaultNow(),
  },
  (table) => ({
    categoriaIdx: index('softwares_categoria_idx').on(table.categoria),
    tipoIdx: index('softwares_tipo_idx').on(table.tipo),
  })
);

export const softwaresAutores = pgTable(
  'softwares_autores',
  {
    id: serial('id').primaryKey(),
    softwareId: integer('software_id').notNull(),
    autorId: integer('autor_id').notNull(),
    tipoContribuicao: varchar('tipo_contribuicao', {
      length: 50,
      enum: ['autor', 'editor', 'revisor', 'ilustrador', 'tradutor'],
    }).notNull(),
    dataContribuicao: timestamp('data_contribuicao').defaultNow(),
  },
  (table) => ({
    softwareFk: foreignKey({
      columns: [table.softwareId],
      foreignColumns: [softwares.id],
    }),
    autorFk: foreignKey({
      columns: [table.autorId],
      foreignColumns: [autores.id],
    }),
  })
);

// ============================================
// TABELA DE PROJETOS
// ============================================

export const projetos = pgTable(
  'projetos',
  {
    id: serial('id').primaryKey(),
    titulo: text('titulo').notNull(),
    descricao: text('descricao').notNull(),
    descricaoCompleta: text('descricao_completa'),
    categoria: varchar('categoria', {
      length: 50,
      enum: [
        'pesquisa',
        'tcc',
        'dissertacao',
        'artigo',
        'real_documentado',
        'embarcado',
        'ia',
        'software',
      ],
    }).notNull(),
    tipo: varchar('tipo', { length: 20, enum: ['pago', 'livre'] }).notNull(),
    urlCapa: text('url_capa'),
    urlPdf: text('url_pdf'),
    resumoIA: text('resumo_ia'),
    sinopse: text('sinopse'),
    repositorio: text('repositorio'),
    urlDemo: text('url_demo'),
    objetivos: jsonb('objetivos'),
    etapas: jsonb('etapas'),
    tecnologias: jsonb('tecnologias'),
    resultados: text('resultados'),
    conclusoes: text('conclusoes'),
    views: integer('views').default(0),
    downloads: integer('downloads').default(0),
    clones: integer('clones').default(0),
    stars: integer('stars').default(0),
    avaliacaoMedia: decimal('avaliacao_media', { precision: 3, scale: 2 }).default('0'),
    totalAvaliacoes: integer('total_avaliacoes').default(0),
    popularidade: decimal('popularidade', { precision: 4, scale: 2 }).default('0'),
    eNovo: boolean('e_novo').default(false),
    tags: jsonb('tags'),
    status: varchar('status', {
      length: 20,
      enum: ['rascunho', 'publicado', 'arquivado'],
    }).default('publicado'),
    dataCriacao: timestamp('data_criacao').defaultNow(),
    dataPublicacao: timestamp('data_publicacao'),
    dataAtualizacao: timestamp('data_atualizacao').defaultNow(),
  },
  (table) => ({
    categoriaIdx: index('projetos_categoria_idx').on(table.categoria),
    tipoIdx: index('projetos_tipo_idx').on(table.tipo),
  })
);

export const projetosAutores = pgTable(
  'projetos_autores',
  {
    id: serial('id').primaryKey(),
    projetoId: integer('projeto_id').notNull(),
    autorId: integer('autor_id').notNull(),
    tipoContribuicao: varchar('tipo_contribuicao', {
      length: 50,
      enum: ['autor', 'editor', 'revisor', 'ilustrador', 'tradutor'],
    }).notNull(),
    dataContribuicao: timestamp('data_contribuicao').defaultNow(),
  },
  (table) => ({
    projetoFk: foreignKey({
      columns: [table.projetoId],
      foreignColumns: [projetos.id],
    }),
    autorFk: foreignKey({
      columns: [table.autorId],
      foreignColumns: [autores.id],
    }),
  })
);

// ============================================
// TABELA DE ARGUMENTOS E TEXTOS
// ============================================

export const argumentos = pgTable(
  'argumentos',
  {
    id: serial('id').primaryKey(),
    titulo: text('titulo').notNull(),
    descricao: text('descricao'),
    conteudo: text('conteudo').notNull(),
    secoes: jsonb('secoes'),
    recursoRelacionadoId: integer('recurso_relacionado_id'),
    recursoRelacionadoTipo: varchar('recurso_relacionado_tipo', {
      length: 20,
      enum: ['livro', 'software', 'projeto'],
    }),
    autorId: integer('autor_id'),
    status: varchar('status', {
      length: 20,
      enum: ['rascunho', 'publicado', 'arquivado'],
    }).default('publicado'),
    dataCriacao: timestamp('data_criacao').defaultNow(),
    dataAtualizacao: timestamp('data_atualizacao').defaultNow(),
  },
  (table) => ({
    autorFk: foreignKey({
      columns: [table.autorId],
      foreignColumns: [autores.id],
    }),
  })
);

// ============================================
// TABELA DE ATIVIDADES DE USUÁRIOS
// ============================================

export const actividadesUsuario = pgTable(
  'atividades_usuario',
  {
    id: serial('id').primaryKey(),
    usuarioId: integer('usuario_id').notNull(),
    tipoAtividade: varchar('tipo_atividade', {
      length: 50,
      enum: ['visualizacao', 'download', 'avaliacao', 'comentario'],
    }).notNull(),
    recursoId: integer('recurso_id').notNull(),
    recursoTipo: varchar('recurso_tipo', {
      length: 20,
      enum: ['livro', 'software', 'projeto'],
    }).notNull(),
    valor?: integer('valor'),
    data: timestamp('data').defaultNow(),
  },
  (table) => ({
    usuarioFk: foreignKey({
      columns: [table.usuarioId],
      foreignColumns: [usuarios.id],
    }),
  })
);
        