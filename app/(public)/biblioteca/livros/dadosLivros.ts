// Tipagem profissional
export type Livro = {
  id: string;
  titulo: string;
  autor: string;
  descricao: string;
  capa: string;
  categoria:
    | "IA"
    | "Programação"
    | "Eletrônica"
    | "Mecatrônica"
    | "Engenharia"
    | "Mecânica"
    | "Matemática";
  popular: boolean;
  novo: boolean;
  avaliacao: number;
  downloads: number;
};

// Mock profissional expandido
export const livros: Livro[] = [
  {
    id: "1",
    titulo: "Inteligência Artificial Aplicada",
    autor: "Star B",
    descricao:
      "Livro técnico aprofundado sobre fundamentos, modelos modernos de IA e aplicações reais em engenharia e sistemas inteligentes.",
    capa: "",
    categoria: "IA",
    popular: true,
    novo: true,
    avaliacao: 4.8,
    downloads: 2340,
  },
  {
    id: "2",
    titulo: "Engenharia de Software Moderna",
    autor: "Star B",
    descricao:
      "Arquitetura profissional de sistemas, padrões de projeto, escalabilidade e boas práticas reais de mercado.",
    capa: "",
    categoria: "Programação",
    popular: true,
    novo: false,
    avaliacao: 4.9,
    downloads: 3120,
  },
  {
    id: "3",
    titulo: "Mecatrônica Essencial",
    autor: "Star B",
    descricao:
      "Integração entre mecânica, eletrônica e programação aplicada a sistemas físicos inteligentes.",
    capa: "",
    categoria: "Mecatrônica",
    popular: true,
    novo: true,
    avaliacao: 4.7,
    downloads: 1890,
  },
  {
    id: "4",
    titulo: "Machine Learning Avançado",
    autor: "Star B",
    descricao:
      "Algoritmos de aprendizado profundo, redes neurais e aplicações práticas em projetos reais.",
    capa: "",
    categoria: "IA",
    popular: true,
    novo: false,
    avaliacao: 4.9,
    downloads: 2870,
  },
  {
    id: "5",
    titulo: "Eletrônica Digital",
    autor: "Star B",
    descricao:
      "Circuitos digitais, microcontroladores e design de sistemas embarcados profissionais.",
    capa: "",
    categoria: "Eletrônica",
    popular: false,
    novo: true,
    avaliacao: 4.6,
    downloads: 1560,
  },
  {
    id: "6",
    titulo: "Cálculo para Engenharia",
    autor: "Star B",
    descricao:
      "Matemática aplicada com foco em problemas reais de engenharia e computação.",
    capa: "",
    categoria: "Matemática",
    popular: false,
    novo: true,
    avaliacao: 4.8,
    downloads: 2100,
  },
  {
    id: "7",
    titulo: "Python para Ciência de Dados",
    autor: "Star B",
    descricao:
      "Análise de dados, visualização e machine learning usando Python moderno.",
    capa: "",
    categoria: "Programação",
    popular: false,
    novo: false,
    avaliacao: 4.7,
    downloads: 2450,
  },
  {
    id: "8",
    titulo: "Sistemas Embarcados",
    autor: "Star B",
    descricao:
      "Design e implementação de sistemas embarcados para IoT e automação industrial.",
    capa: "",
    categoria: "Eletrônica",
    popular: false,
    novo: false,
    avaliacao: 4.5,
    downloads: 1320,
  },
];

export const categorias = [
  { nome: "IA", icon: "🤖" },
  { nome: "Programação", icon: "💻" },
  { nome: "Eletrônica", icon: "⚡" },
  { nome: "Mecatrônica", icon: "⚙️" },
  { nome: "Engenharia", icon: "🏗️" },
  { nome: "Matemática", icon: "📐" },
];