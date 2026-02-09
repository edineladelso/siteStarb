
import type { MacroAreaLivro } from "@/lib/domain";
import {
  MathIcon,
  PhysicsIcon,
  ChemistryIcon,
  MaterialsIcon,
  MechanicsIcon,
  ElectricIcon,
  ElectronicsIcon,
  AutomationIcon,
  ComputingIcon,
  CyberIcon,
  TelecomIcon,
  NetworksIcon,
  CivilIcon,
  AIIcon,
  ProgrammingIcon,
  MechatronicsIcon,
  EngineeringIcon,
} from "@/lib/localDadosHome/IconesHome";

export const ICONES_CATEGORIAS: Record<MacroAreaLivro, React.ReactNode> = {
  Matematica: <MathIcon />,
  Fisica: <PhysicsIcon />,
  Quimica: <ChemistryIcon />,
  Materiais: <MaterialsIcon />,
  Mecanica: <MechanicsIcon />,
  Eletrica: <ElectricIcon />,
  Eletronica: <ElectronicsIcon />,
  Controle_automacao: <AutomationIcon />,
  Computacao: <ComputingIcon />,
  Cyber_seguranca: <CyberIcon />,
  Telecom: <TelecomIcon />,
  Redes_de_computadores: <NetworksIcon />,
  Civil: <CivilIcon />,
  IA: <AIIcon />,
  Programacao: <ProgrammingIcon />,
  Mecatronica: <MechatronicsIcon />,
  Engenharia: <EngineeringIcon />,
};

import {
  Calculator,
  Atom,
  FlaskConical,
  Boxes,
  Cog,
  Zap,
  CircuitBoard,
  Gauge,
  Monitor,
  Shield,
  Radio,
  Network,
  Building,
  Brain,
  Code,
  Settings,
  HardHat,
} from "lucide-react";

// Type definition para informações de categoria
export interface CategoriaLivroInfo {
  id: MacroAreaLivro;
  nome: string;
  icon: React.ReactNode;
  descricao?: string;
}

// Labels formatados para cada categoria
export const LABELS_CATEGORIAS: Record<MacroAreaLivro, string> = {
  Matematica: "Matemática",
  Fisica: "Física",
  Quimica: "Química",
  Materiais: "Materiais",
  Mecanica: "Mecânica",
  Eletrica: "Elétrica",
  Eletronica: "Eletrônica",
  Controle_automacao: "Controle e Automação",
  Computacao: "Computação",
  Cyber_seguranca: "Cibersegurança",
  Telecom: "Telecomunicações",
  Redes_de_computadores: "Redes de Computadores",
  Civil: "Engenharia Civil",
  IA: "Inteligência Artificial",
  Programacao: "Programação",
  Mecatronica: "Mecatrônica",
  Engenharia: "Engenharia",
} as const;

// Ícones por categoria (usando lucide-react do shadcn/ui)
export const ICONES_CATEGORIASs: Record<MacroAreaLivro, React.ReactNode> = {
  Matematica: <Calculator className="h-5 w-5" aria-hidden="true" />,
  Fisica: <Atom className="h-5 w-5" aria-hidden="true" />,
  Quimica: <FlaskConical className="h-5 w-5" aria-hidden="true" />,
  Materiais: <Boxes className="h-5 w-5" aria-hidden="true" />,
  Mecanica: <Cog className="h-5 w-5" aria-hidden="true" />,
  Eletrica: <Zap className="h-5 w-5" aria-hidden="true" />,
  Eletronica: <CircuitBoard className="h-5 w-5" aria-hidden="true" />,
  Controle_automacao: <Gauge className="h-5 w-5" aria-hidden="true" />,
  Computacao: <Monitor className="h-5 w-5" aria-hidden="true" />,
  Cyber_seguranca: <Shield className="h-5 w-5" aria-hidden="true" />,
  Telecom: <Radio className="h-5 w-5" aria-hidden="true" />,
  Redes_de_computadores: <Network className="h-5 w-5" aria-hidden="true" />,
  Civil: <Building className="h-5 w-5" aria-hidden="true" />,
  IA: <Brain className="h-5 w-5" aria-hidden="true" />,
  Programacao: <Code className="h-5 w-5" aria-hidden="true" />,
  Mecatronica: <Settings className="h-5 w-5" aria-hidden="true" />,
  Engenharia: <HardHat className="h-5 w-5" aria-hidden="true" />,
} as const;

// Array de objetos com todas as informações (formato similar ao StatsData)
export const CATEGORIAS_LIVROS: CategoriaLivroInfo[] = [
  {
    id: "Matematica",
    nome: "Matemática",
    icon: <Calculator />,
  },
  {
    id: "Fisica",
    nome: "Física",
    icon: <Atom className="h-5 w-5" aria-hidden="true" />,
  },
  {
    id: "Quimica",
    nome: "Química",
    icon: <FlaskConical className="h-5 w-5" aria-hidden="true" />,
  },
  {
    id: "Materiais",
    nome: "Materiais",
    icon: <Boxes className="h-5 w-5" aria-hidden="true" />,
  },
  {
    id: "Mecanica",
    nome: "Mecânica",
    icon: <Cog className="h-5 w-5" aria-hidden="true" />,
  },
  {
    id: "Eletrica",
    nome: "Elétrica",
    icon: <Zap className="h-5 w-5" aria-hidden="true" />,
  },
  {
    id: "Eletronica",
    nome: "Eletrônica",
    icon: <CircuitBoard className="h-5 w-5" aria-hidden="true" />,
  },
  {
    id: "Controle_automacao",
    nome: "Controle e Automação",
    icon: <Gauge className="h-5 w-5" aria-hidden="true" />,
  },
  {
    id: "Computacao",
    nome: "Computação",
    icon: <Monitor className="h-5 w-5" aria-hidden="true" />,
  },
  {
    id: "Cyber_seguranca",
    nome: "Cibersegurança",
    icon: <Shield className="h-5 w-5" aria-hidden="true" />,
  },
  {
    id: "Telecom",
    nome: "Telecomunicações",
    icon: <Radio className="h-5 w-5" aria-hidden="true" />,
  },
  {
    id: "Redes_de_computadores",
    nome: "Redes de Computadores",
    icon: <Network className="h-5 w-5" aria-hidden="true" />,
  },
  {
    id: "Civil",
    nome: "Engenharia Civil",
    icon: <Building className="h-5 w-5" aria-hidden="true" />,
  },
  {
    id: "IA",
    nome: "Inteligência Artificial",
    icon: <Brain className="h-5 w-5" aria-hidden="true" />,
  },
  {
    id: "Programacao",
    nome: "Programação",
    icon: <Code className="h-5 w-5" aria-hidden="true" />,
  },
  {
    id: "Mecatronica",
    nome: "Mecatrônica",
    icon: <Settings className="h-5 w-5" aria-hidden="true" />,
  },
  {
    id: "Engenharia",
    nome: "Engenharia",
    icon: <HardHat className="h-5 w-5" aria-hidden="true" />},
] as const;

// Helper functions para buscar informações
export const getCategoriaInfo = (
  id: MacroAreaLivro
): CategoriaLivroInfo | undefined => {
  return CATEGORIAS_LIVROS.find((cat) => cat.id === id);
};

export const getCategoriaNome = (id: MacroAreaLivro): string => {
  return LABELS_CATEGORIAS[id];
};

export const getCategoriaIcon = (id: MacroAreaLivro): React.ReactNode => {
  return ICONES_CATEGORIAS[id];
};