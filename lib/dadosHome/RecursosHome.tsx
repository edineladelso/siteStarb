import { AcademicIcon, AIIcon, BookIcon, CodeIcon } from "./IconesHome";

export const recursosHome = [
  {
    titulo: "Biblioteca Técnica",
    descricao:
      "Livros de engenharia, programação e ciências exatas organizados por área",
    href: "/biblioteca/livros",
    icon: <BookIcon />,
    badge: "500+ Livros",
  },
  {
    titulo: "Softwares Profissionais",
    descricao:
      "Tutoriais e documentação de ferramentas como AutoCAD, MATLAB, SolidWorks",
    href: "/softwares",
    icon: <CodeIcon />,
  },
  {
    titulo: "Artigos Científicos",
    descricao:
      "Papers, pesquisas e estudos técnicos comentados e organizados",
    href: "/artigos",
    icon: <AcademicIcon />,
  },
  {
    titulo: "IA & Machine Learning",
    descricao:
      "Formação estruturada em inteligência artificial e aprendizado de máquina",
    href: "/ia",
    icon: <AIIcon />,
    badge: "Novo",
  },
];

