// ============================================
// NAVIGATION & MENU DATA
// ============================================

export interface MenuItem {
  title: string;
  href: string;
  description: string;
}

export interface NavItem {
  title: string;
  href: string;
}

export interface ThemeOption {
  name: "Light" | "Dark";
  icon: "circle" | "circle-check";
}

export const booksCategories: MenuItem[] = [
  {
    title: "Matematica",
    href: "/livros/matematica",
    description:
      "Livros e materiais sobre diversos ramos da matemática, desde álgebra, cálculo avançado até analise matemática.",
  },
  {
    title: "Física",
    href: "/livros/fisica",
    description:
      "Livros e materiais sobre diversos ramos da física, desde mecânica clássica até física quântica.",
  },
  {
    title: "Mecanica",
    href: "/livros/mecanica",
    description:
      "Livros e materiais sobre diversos ramos da mecânica, desde estática até dinâmica.",
  },
  {
    title: "Eletrotécnica",
    href: "/livros/eletrotecnica",
    description: "Livros e materiais sobre diversos ramos da eletrotécnica.",
  },
  {
    title: "Automação e controle",
    href: "/livros/automacaoecontrole",
    description:
      "Livros e materiais sobre diversos ramos da automação e controle.",
  },
  {
    title: "Programação",
    href: "/livros/programacao",
    description: "Livros e materiais sobre diversos ramos da programação.",
  },
  {
    title: "Engenharia",
    href: "/livros/engenharia",
    description: "Livros e materiais sobre diversos ramos da engenharia.",
  },
];

export const softwareCategories: MenuItem[] = [
  {
    title: "IDE e Editores de Código",
    href: "/softwares/ide-e-editores-de-codigo",
    description:
      "Ambientes de desenvolvimento integrados (IDEs) e editores de código populares para programadores.",
  },
  {
    title: "Modelação e Simulação",
    href: "/softwares/modelacao-e-simulacao",
    description:
      "Plataformas para criação de modelos matemáticos e simulações de sistemas complexos.",
  },
  {
    title: "Simulação de Circuitos Elétricos",
    href: "/softwares/engenharia-eletrica/circuitos",
    description:
      "Ferramentas de análise de circuitos (SPICE), design de PCBs e prototipagem eletrônica.",
  },
  {
    title: "Dinâmica de Fluidos Computacional (CFD)",
    href: "/softwares/simulacao-de-fluidos",
    description:
      "Software para análise de escoamento de fluidos, transferência de calor e forças aerodinâmicas.",
  },
  {
    title: "Engenharia Mecatrônica e Robótica",
    href: "/softwares/mecatronica",
    description:
      "Sistemas para integração de mecânica, eletrônica e controle, incluindo simulação de robôs.",
  },
  {
    title: "Cálculo Estrutural e Civil (BIM)",
    href: "/softwares/engenharia-civil",
    description:
      "Modelagem de Informação da Construção (BIM) e análise de resistência de estruturas.",
  },
  {
    title: "Softwares de Apoio à Medicina",
    href: "/softwares/tecnologia-medica",
    description:
      "Sistemas de diagnóstico por imagem, telemedicina e gestão de dados clínicos de pacientes.",
  },
  {
    title: "Bioinformática e Engenharia Biomédica",
    href: "/softwares/bioinformatica",
    description:
      "Análise de sequenciamento genético e modelagem de próteses e tecidos biológicos.",
  },
  {
    title: "Manufatura Auxiliada por Computador (CAM)",
    href: "/softwares/cam",
    description:
      "Programação de máquinas CNC e processos de fabricação automatizados.",
  },
];

export const homeMenuItems: NavItem[] = [
  {
    title: "Sobre nós",
    href: "/sobre",
  },
  {
    title: "Contato",
    href: "/contato",
  },
];

export const quickMenuItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Livros",
    href: "/biblioteca/livros",
  },
  {
    title: "Softwares",
    href: "/softwares",
  },
  {
    title: "Artigos",
    href: "/biblioteca/artigos",
  },
  {
    title: "Cursos",
    href: "/academico/cursos",
  },
  {
    title: "Documentação",
    href: "/academico/documentacao",
  },
];

export interface DocLink {
  title: string;
  href: string;
  description: string;
}

export const documentationLinks: DocLink[] = [
  {
    title: "Python",
    href: "https://docs.python.org/pt-br/3/",
    description: "Documentação oficial do Python em portugues do brazil.",
  },
  {
    title: "C++",
    href: "https://learn.microsoft.com/pt-pt/cpp/cpp/?view=msvc-170",
    description: "Documentação de c++ em portugues de portugal pela microsoft.",
  },
  {
    title: "Javascript",
    href: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript",
    description:
      "Documentação oficial do Javascript em portugues do brazil, pela Mozilla.",
  },
  {
    title: "ESP32",
    href: "https://docs.espressif.com/projects/esp-idf/en/latest/esp32/index.html",
    description:
      "Documentação oficial do ESP32 em portugues do brazil, pela Espressif.",
  },
  {
    title: "CSS",
    href: "https://developer.mozilla.org/pt-BR/docs/Web/CSS",
    description:
      "Documentação oficial do CSS em portugues do brazil, pela Mozilla.",
  },
];

export const themeOptions: ThemeOption[] = [
  {
    name: "Light",
    icon: "circle",
  },
  {
    name: "Dark",
    icon: "circle-check",
  },
];

// ============================================
// HOME PAGE DATA
// ============================================

export interface Feature {
  title: string;
  description: string;
  href: string;
  badge?: string;
}

export const homeFeatures: Feature[] = [
  {
    title: "Livros Técnicos",
    description:
      "Coleções profundas por área (engenharia, programação, IA, eletrónica) com foco em compreensão real e aplicação prática.",
    href: "biblioteca/livros",
  },
  {
    title: "Softwares de Engenharia",
    description:
      "Conteúdos sobre ferramentas profissionais: para que servem, como usar, quando aplicar e boas práticas técnicas.",
    href: "/softwares",
  },
  {
    title: "Artigos Técnicos e Científicos",
    description:
      "Leitura orientada, interpretação de papers, artigos comentados e produção académica estruturada.",
    href: "/biblioteca/artigos",
  },
  {
    title: "Aprender Inteligência Artificial",
    description:
      "Fundamentos sólidos, aplicações reais e construção de modelos com visão de engenharia.",
    href: "/ia",
    badge: "Avançado (Premium)",
  },
];

export interface PremiumItem {
  title: string;
  description: string;
  href: string;
}

export const premiumItems: PremiumItem[] = [
  {
    title: "Projetos de Pesquisa, TCC e Dissertações",
    description:
      "Acesso completo a projetos de pesquisa, de conclusao de curso e muito mais",
    href: "/academico/tcc",
  },
  {
    title: "Projetos Reais Documentados",
    description:
      "Acesso completo a projetos com construção passo a passo, decisões técnicas e guias profissionais.",
    href: "/projetos",
  },
  {
    title: "IA em Nível Avançado",
    description:
      "Modelos, arquiteturas, integração em sistemas reais e uso profissional de inteligência artificial.",
    href: "/ia/avancado",
  },
];

// ============================================
// ABOUT PAGE DATA
// ============================================

export interface ResourceLink {
  title: string;
  href: string;
  description?: string;
}

export const libraryLinks: ResourceLink[] = [
  {
    title: "Livros Técnicos",
    href: "biblioteca/livros",
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

export const academicLinks: ResourceLink[] = [
  { title: "TCC e Monografias", href: "/academico/tcc" },
  { title: "Dissertações", href: "/academico/dissertacoes" },
  { title: "Artigos Científicos", href: "/academico/artigos" },
];

export const projectLinks: ResourceLink[] = [
  {
    title: "Projetos com Microcontroladores",
    href: "/projetos/embarcados",
  },
  {
    title: "Plataformas com IA",
    href: "/projetos/inteligencia-artificial",
  },
  {
    title: "Backends e Frontends Profissionais",
    href: "/projetos/software",
  },
  {
    title: "Automação e Sistemas Inteligentes",
    href: "/projetos/automacao",
  },
];

export const philosophyPrinciples = [
  "Clareza absoluta",
  "Profundidade técnica",
  "Aplicação prática direta",
];
