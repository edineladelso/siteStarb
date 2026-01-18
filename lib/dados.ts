/**
 * Dados centralizados da plataforma Star B
 * Contém dados de exemplo para Livros, Softwares, Projetos, Usuários e Navegação
 */

import {
  Autor,
  ItemMenu,
  ItemNavegacao,
  LinkDocumentacao,
  Livro,
  NivelAcesso,
  OpcaoTema,
  PlanSubscricao,
  Projeto,
  Recurso,
  Software,
  StatusPublicacao,
  TipoConteudo,
  TipoMidia,
  Usuario,
} from "./tipos";

// ============================================
// DADOS DE AUTORES
// ============================================

export const autoresExemplo: Autor[] = [
  {
    id: "autor-001",
    nome: "Dr. João Silva",
    email: "joao.silva@example.com",
    urlPerfil: "https://example.com/perfil/joao",
    biografiaBreve: "Doutor em Engenharia Elétrica pela USP",
    dataRegistro: new Date("2024-01-01"),
    ativo: true,
  },
  {
    id: "autor-002",
    nome: "Profa. Maria Santos",
    email: "maria.santos@example.com",
    urlPerfil: "https://example.com/perfil/maria",
    biografiaBreve: "Mestra em Ciência da Computação",
    dataRegistro: new Date("2024-01-01"),
    ativo: true,
  },
];

// ============================================
// DADOS DE LIVROS
// ============================================

export const livrosExemplo: Livro[] = [
  {
    id: "livro-001",
    titulo: "Introdução à Engenharia de Controle",
    descricao:
      "Fundamentos de sistemas de controle para engenheiros e estudantes de engenharia.",
    descricaoCompleta:
      "Livro completo sobre teoria de controle clássico, design de controladores e aplicações práticas em sistemas reais.",
    autores: [
      {
        autorId: "autor-001",
        autor: autoresExemplo[0],
        tipo: "autor",
        dataContribuicao: new Date("2024-01-15"),
      },
    ],
    categoria: "Engenharia",
    subcategoria: "Controle Automático",
    tipo: TipoConteudo.PAGO,
    urls: {
      capa: {
        publicId: "starb/livros/controle-001-capa",
        url: "https://res.cloudinary.com/starb/image/upload/v1/livros/controle-001-capa",
        tipoMidia: TipoMidia.IMAGEM,
        tamanhoBytes: 2048576,
        dataUpload: new Date("2024-01-10"),
      },
      pdf: {
        publicId: "starb/livros/controle-001-pdf",
        url: "https://res.cloudinary.com/starb/raw/upload/v1/livros/controle-001.pdf",
        tipoMidia: TipoMidia.PDF,
        tamanhoBytes: 52428800,
        dataUpload: new Date("2024-01-10"),
      },
      sinopse:
        "Uma obra referencial no estudo de sistemas de controle moderno.",
    },
    isbn: "978-8535-9876-5",
    editora: "Editora Técnica Brasil",
    anoPublicacao: 2023,
    idioma: "pt-BR",
    paginas: 450,
    permissaoDownload: {
      permitido: true,
      mensagemPublicador:
        "Permitido download para uso pessoal. Proibido compartilhamento comercial.",
    },
    estatisticas: {
      views: 1250,
      downloads: 342,
      avaliacaoMedia: 4.7,
      totalAvaliacoes: 89,
      dataUltimaAtualizacao: new Date("2024-01-16"),
    },
    dataCriacao: new Date("2024-01-10"),
    dataPublicacao: new Date("2024-01-15"),
    eNovo: true,
    popularidade: 8.5,
    tags: ["controle", "automação", "engenharia", "sistemas"],
    status: StatusPublicacao.PUBLICADO,
  },
  {
    id: "livro-002",
    titulo: "Python Avançado para Engenharia",
    descricao: "Programação Python para aplicações de engenharia e ciência.",
    descricaoCompleta:
      "Guia completo sobre uso de Python em projetos de engenharia com numpy, scipy, matplotlib e muito mais.",
    autores: [
      {
        autorId: "autor-002",
        autor: autoresExemplo[1],
        tipo: "autor",
        dataContribuicao: new Date("2024-01-15"),
      },
    ],
    categoria: "Programação",
    tipo: TipoConteudo.LIVRE,
    urls: {
      capa: {
        publicId: "starb/livros/python-eng-capa",
        url: "https://res.cloudinary.com/starb/image/upload/v1/livros/python-eng-capa",
        tipoMidia: TipoMidia.IMAGEM,
        tamanhoBytes: 1536576,
        dataUpload: new Date("2024-01-10"),
      },
      epub: {
        publicId: "starb/livros/python-eng-epub",
        url: "https://res.cloudinary.com/starb/raw/upload/v1/livros/python-eng.epub",
        tipoMidia: TipoMidia.EPUB,
        tamanhoBytes: 35844096,
        dataUpload: new Date("2024-01-10"),
      },
      resumoIA:
        "Livro que abrange desde o básico de Python até aplicações avançadas em computação científica.",
    },
    isbn: "978-8535-4321-0",
    anoPublicacao: 2024,
    editora: "Editora 444 do Brazil",
    idioma: "pt-BR",
    paginas: 520,
    permissaoDownload: {
      permitido: true,
    },
    estatisticas: {
      views: 2100,
      downloads: 756,
      avaliacaoMedia: 4.9,
      totalAvaliacoes: 234,
      dataUltimaAtualizacao: new Date("2024-01-16"),
    },
    dataCriacao: new Date("2024-01-05"),
    dataPublicacao: new Date("2024-01-12"),
    eNovo: true,
    popularidade: 9.2,
    tags: ["python", "programação", "engenharia", "numpy"],
    status: StatusPublicacao.PUBLICADO,
  },
];

// ============================================
// DADOS DE SOFTWARES
// ============================================

export const softwaresExemplo: Software[] = [
  {
    id: "soft-001",
    nome: "MATLAB",
    descricao: "Plataforma de computação numérica e linguagem de programação.",
    descricaoCompleta:
      "MATLAB é uma plataforma poderosa para análise numérica, visualização e programação científica amplamente usada em engenharia.",
    autores: [
      {
        autorId: "autor-001",
        autor: autoresExemplo[0],
        tipo: "editor",
        dataContribuicao: new Date("2024-01-15"),
      },
    ],
    categoria: "Computação Científica",
    tipo: TipoConteudo.PAGO,
    urls: {
      capa: {
        publicId: "starb/softwares/matlab-logo",
        url: "https://res.cloudinary.com/starb/image/upload/v1/softwares/matlab-logo",
        tipoMidia: TipoMidia.SOFTWARE,
        tamanhoBytes: 512000,
        dataUpload: new Date("2024-01-10"),
      },
      sinopse:
        "Software líder em computação técnica e simulação para engenheiros.",
    },
    urlOficial: "https://www.mathworks.com/products/matlab.html",
    urlDownload: "https://www.mathworks.com/downloads/",
    versao: "2024a",
    licenca: "Comercial",
    especificacoes: {
      sO: ["Windows", "macOS", "Linux"],
      arquitetura: ["x86_64", "arm64"],
      memoriaMinima: "4 GB",
      discoMinimo: "4 GB",
      processador: "Intel Core i5 ou equivalente",
    },
    estatisticas: {
      downloads: 5000,
      versaoAtual: "2024a",
      views: 3400,
      avaliacaoMedia: 4.8,
      totalAvaliacoes: 450,
      dataUltimaAtualizacao: new Date("2024-01-16"),
    },
    dataCriacao: new Date("2024-01-10"),
    dataPublicacao: new Date("2024-01-15"),
    eNovo: false,
    popularidade: 9.5,
    tags: ["matlab", "simulação", "computação", "engenharia"],
    status: StatusPublicacao.PUBLICADO,
  },
  {
    id: "soft-002",
    nome: "QEMU",
    descricao: "Emulador e virtualizador de máquinas de código aberto.",
    descricaoCompleta:
      "QEMU é um emulador de software gratuito e virtualizador que permite executar código destinado a uma máquina em outra.",
    autores: [
      {
        autorId: "autor-002",
        autor: autoresExemplo[1],
        tipo: "revisor",
        dataContribuicao: new Date("2024-01-15"),
      },
    ],
    categoria: "Virtualização",
    tipo: TipoConteudo.LIVRE,
    urls: {
      capa: {
        publicId: "starb/softwares/qemu-logo",
        url: "https://res.cloudinary.com/starb/image/upload/v1/softwares/qemu-logo",
        tipoMidia: TipoMidia.SOFTWARE,
        tamanhoBytes: 256000,
        dataUpload: new Date("2024-01-10"),
      },
      resumoIA:
        "Solução de código aberto para virtualização com ampla compatibilidade de plataformas.",
    },
    urlOficial: "https://www.qemu.org/",
    versao: "8.2.0",
    licenca: "GPL v2",
    especificacoes: {
      sO: ["Linux", "Windows", "macOS"],
      arquitetura: ["x86_64", "arm", "ppc", "mips"],
      memoriaMinima: "512 MB",
      discoMinimo: "100 MB",
    },
    estatisticas: {
      downloads: 15000,
      versaoAtual: "8.2.0",
      views: 2800,
      avaliacaoMedia: 4.5,
      totalAvaliacoes: 280,
      dataUltimaAtualizacao: new Date("2024-01-16"),
    },
    dataCriacao: new Date("2024-01-05"),
    dataPublicacao: new Date("2024-01-12"),
    eNovo: false,
    popularidade: 8.9,
    tags: ["virtualização", "emulador", "código-aberto", "linux"],
    status: StatusPublicacao.PUBLICADO,
  },
];

// ============================================
// DADOS DE PROJETOS
// ============================================

export const projetosExemplo: Projeto[] = [
  {
    id: "proj-001",
    titulo: "Sistema de Controle de Robô Móvel com Visão Computacional",
    descricao:
      "Projeto de pesquisa sobre navegação autônoma e visão artificial em robôs.",
    descricaoCompleta:
      "Sistema completo integrando sensores, processamento de imagem e algoritmos de controle para robô móvel autônomo.",
    autores: [
      {
        autorId: "autor-001",
        autor: autoresExemplo[0],
        tipo: "autor",
        dataContribuicao: new Date("2024-01-10"),
      },
    ],
    categoria: "pesquisa",
    tipo: TipoConteudo.LIVRE,
    urls: {
      capa: {
        publicId: "starb/projetos/robo-capa",
        url: "https://res.cloudinary.com/starb/image/upload/v1/projetos/robo-capa",
        tipoMidia: TipoMidia.IMAGEM,
        tamanhoBytes: 1024000,
        dataUpload: new Date("2024-01-10"),
      },
      pdf: {
        publicId: "starb/projetos/robo-relatorio",
        url: "https://res.cloudinary.com/starb/raw/upload/v1/projetos/robo-relatorio.pdf",
        tipoMidia: TipoMidia.PDF,
        tamanhoBytes: 25165824,
        dataUpload: new Date("2024-01-10"),
      },
    },
    repositorio: "https://github.com/starb/robo-autonomo",
    urlDemo: "https://demo.starb.com/robo",
    objetivos: [
      "Desenvolver sistema de navegação autônoma",
      "Implementar visão computacional em tempo real",
      "Integrar algoritmos de controle robusto",
    ],
    etapas: [
      {
        numero: 1,
        titulo: "Pesquisa Bibliográfica",
        descricao:
          "Revisão de literatura sobre robótica e visão computacional.",
        duracao: "2 meses",
        resultado: "Relatório com 50+ artigos analisados",
        urls: {
          imagens: [
            {
              publicId: "starb/projetos/robo-etapa1-img1",
              url: "https://res.cloudinary.com/starb/image/upload/v1/projetos/robo-etapa1-img1",
              tipoMidia: TipoMidia.IMAGEM,
              tamanhoBytes: 512000,
              dataUpload: new Date("2024-01-10"),
            },
          ],
        },
      },
      {
        numero: 2,
        titulo: "Prototipagem",
        descricao: "Construção do robô móvel com placa Arduino e sensores.",
        duracao: "3 meses",
        resultado: "Robô funcional com sensores integrados",
      },
    ],
    tecnologias: [
      { nome: "Python", versao: "3.10" },
      { nome: "OpenCV", versao: "4.8" },
      { nome: "ROS", versao: "2" },
      { nome: "Arduino", url: "https://www.arduino.cc/" },
    ],
    resultados:
      "Robô autônomo capaz de navegar em ambiente semi-estruturado com reconhecimento de objetos.",
    conclusoes:
      "O sistema demonstrou eficiência de 87% em navegação autônoma com tempo real de processamento.",
    estatisticas: {
      views: 850,
      clones: 123,
      forks: 45,
      stars: 210,
      downloads: 95,
      avaliacaoMedia: 4.6,
      totalAvaliacoes: 67,
      dataUltimaAtualizacao: new Date("2024-01-16"),
    },
    dataCriacao: new Date("2024-01-01"),
    dataPublicacao: new Date("2024-01-15"),
    eNovo: true,
    popularidade: 8.7,
    tags: ["robótica", "visão-computacional", "arduino", "python"],
    status: StatusPublicacao.PUBLICADO,
  },
];

// ============================================
// DADOS DE PLANOS DE SUBSCRICÃO
// ============================================

export const planosSubscricao: PlanSubscricao[] = [
  {
    id: "plano-visitante",
    nome: "Visitante",
    descricao: "Acesso básico à plataforma",
    preco: 0,
    moeda: "BRL",
    nivelAcesso: NivelAcesso.VISITANTE,
    recursosDiarios: 5,
    acessoIA: false,
    acessoProjetos: false,
    acessoDownloads: false,
    ativo: true,
  },
  {
    id: "plano-basico",
    nome: "Usuário Básico",
    descricao: "Acesso a livros e softwares grátis",
    preco: 0,
    moeda: "BRL",
    nivelAcesso: NivelAcesso.USUARIO_BASICO,
    recursosDiarios: 20,
    acessoIA: false,
    acessoProjetos: false,
    acessoDownloads: true,
    ativo: true,
  },
  {
    id: "plano-premium",
    nome: "Usuário Premium",
    descricao: "Acesso total incluindo IA e projetos avançados",
    preco: 49.9,
    moeda: "BRL",
    nivelAcesso: NivelAcesso.USUARIO_PREMIUM,
    recursosDiarios: 100,
    recursosMensais: 2000,
    acessoIA: true,
    acessoProjetos: true,
    acessoDownloads: true,
    ativo: true,
  },
];

// ============================================
// DADOS DE USUÁRIO EXEMPLO
// ============================================

export const usuarioExemplo: Usuario = {
  id: "usuario-001",
  email: "usuarios@example.com",
  nomeCompleto: "João da Silva",
  fotoPerfil:
    "https://res.cloudinary.com/starb/image/upload/v1/usuarios/avatar-001",
  biografia:
    "Engenheiro de Controle apaixonado por robótica e inteligência artificial",
  profissao: "Engenheiro de Controle e Automação",
  pais: "Brasil",
  nivelAcesso: NivelAcesso.USUARIO_PREMIUM,
  subscricao: {
    planoId: "plano-premium",
    plano: planosSubscricao[2],
    dataInicio: new Date("2024-01-01"),
    dataExpiracao: new Date("2025-01-01"),
    ativa: true,
    metodoPagamento: "cartao_credito",
    ultimoPagamento: new Date("2024-01-01"),
  },
  ativo: true,
  dataCadastro: new Date("2024-01-01"),
  dataUltimoAcesso: new Date("2024-01-16"),
  preferences: {
    tema: "escuro",
    idioma: "pt-BR",
    notificacoesEmail: true,
    notificacoesPush: true,
    privacidadePublica: false,
  },
  atividade: {
    livrosLidos: ["livro-001", "livro-002"],
    softwaresVisualizados: ["soft-001", "soft-002"],
    projetosVisualizados: ["proj-001"],
    avaliacoesRealizadas: [
      { id: "livro-001", nota: 5, data: new Date("2024-01-16") },
    ],
    downloadRealizados: [
      {
        id: "livro-001",
        tipo: "pdf",
        data: new Date("2024-01-15"),
      },
    ],
  },
};

// ============================================
// DADOS DE NAVEGAÇÃO
// ============================================

export const categoriasLivros: ItemMenu[] = [
  {
    titulo: "Matemática",
    href: "/biblioteca/livros/matematica",
    descricao:
      "Livros e materiais sobre diversos ramos da matemática, desde álgebra até análise matemática.",
  },
  {
    titulo: "Física",
    href: "/biblioteca/livros/fisica",
    descricao:
      "Livros sobre física clássica, quântica e aplicada para engenharia.",
  },
  {
    titulo: "Programação",
    href: "/biblioteca/livros/programacao",
    descricao:
      "Livros sobre linguagens de programação e desenvolvimento de software.",
  },
  {
    titulo: "Engenharia",
    href: "/biblioteca/livros/engenharia",
    descricao:
      "Livros sobre diversos ramos da engenharia e aplicações profissionais.",
  },
  {
    titulo: "Automação e Controle",
    href: "/biblioteca/livros/automacao",
    descricao: "Livros sobre sistemas de controle automático e robótica.",
  },
];

export const categoriassoFtwares: ItemMenu[] = [
  {
    titulo: "Modelação e Simulaçõ",
    href: "/softwares/modelacao",
    descricao: "Ambientes de desenvolvimento para programadores.",
    badge: "Popular",
  },
  {
    titulo: "Computação Científica",
    href: "/softwares/cientifica",
    descricao: "Software para análise numérica e simulação.",
  },
  {
    titulo: "IDE e Editores de Código",
    href: "/softwares/ide",
    descricao: "Ambientes de desenvolvimento para programadores.",
    badge: "Popular",
  },
  {
    titulo: "Virtualização",
    href: "/softwares/virtualizacao",
    descricao: "Ferramentas para emulação e virtualização de máquinas.",
  },
  {
    titulo: "CAD e Design",
    href: "/softwares/cad",
    descricao: "Softwares para design 2D e 3D profissional.",
  },
];

export const menuPrincipal: ItemNavegacao[] = [
  {
    titulo: "Informações",
    href: "/sobre",
  },
  {
    titulo: "Contato",
    href: "/contato",
  },
  {
    titulo: "Blog",
    href: "/blog",
  },
];

export const menuRapido: ItemNavegacao[] = [
  {
    titulo: "Livros",
    href: "/biblioteca/livros",
  },
  {
    titulo: "Softwares",
    href: "/softwares",
  },
  {
    titulo: "Projetos",
    href: "/projetos",
  },
  {
    titulo: "Artigos",
    href: "/biblioteca/artigos",
  },
];

export const linksDocumentacao: LinkDocumentacao[] = [
  {
    titulo: "Python",
    href: "https://docs.python.org/pt-br/",
    descricao: "Documentação oficial de Python em português.",
  },
  {
    titulo: "JavaScript",
    href: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript",
    descricao: "Documentação de JavaScript pela Mozilla.",
  },
  {
    titulo: "React",
    href: "https://pt-br.react.dev/",
    descricao: "Documentação oficial de React em português.",
  },
];

export const opcosTema: OpcaoTema[] = [
  { nome: "Claro", icone: "circle" },
  { nome: "Escuro", icone: "circle-check" },
];

export const recursosHome: Recurso[] = [
  {
    titulo: "Livros Técnicos",
    descricao:
      "Coleções profundas por área com foco em compreensão real e aplicação prática.",
    href: "/biblioteca/livros",
  },
  {
    titulo: "Softwares de Engenharia",
    descricao:
      "Conteúdos sobre ferramentas profissionais e suas aplicações técnicas.",
    href: "/softwares",
    badge: "Novo",
  },
  {
    titulo: "Projetos Documentados",
    descricao:
      "Projetos reais com construção passo a passo e decisões técnicas.",
    href: "/projetos",
  },
  {
    titulo: "Inteligência Artificial",
    descricao: "Aprendizado estruturado de IA de nível avançado.",
    href: "/ia",
    badge: "Premium",
  },
];

export const itenssPremium: Recurso[] = [
  {
    titulo: "Projetos de Pesquisa",
    descricao: "Acesso a TCCs, dissertações e projetos acadêmicos",
    href: "/projetos/academico",
  },
  {
    titulo: "Projetos Reais Documentados",
    descricao: "Implementações profissionais com explicações detalhadas",
    href: "/projetos/reais",
  },
  {
    titulo: "IA Avançado",
    descricao: "Modelos, arquiteturas e integração profissional de IA",
    href: "/ia/avancado",
  },
];
