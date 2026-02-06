import { ContentBase } from "./content";

export interface Software extends ContentBase {
  tipo: "software";

  siteOficial: string;

  funcionalidades?: string;
  requisitos?: string;

  preco: string;

  plataformas: string[];

  screenshots: string[];

  tutorialUrl?: string;
}
