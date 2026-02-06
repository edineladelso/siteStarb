import { FileTextIcon } from "lucide-react";
import { BookIcon, CodeIcon } from "./IconesHome";
import { ReactNode } from "react";

type StatsType = {
  stat: string;
  categoria: string;
  icon?: ReactNode;
};

export const StatsData: StatsType[] = [
  {
    stat: "500+",
    categoria: "Livros",
    icon: <BookIcon />,
  },
  {
    stat: "50+",
    categoria: "Softwares",
    icon: <CodeIcon />,
  },
  {
    stat: "1000+",
    categoria: "Artigos",
    icon: <FileTextIcon />,
  },
];

export const StatsCard: StatsType[] = [
  {
    
  }
]