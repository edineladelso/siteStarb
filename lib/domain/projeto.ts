import { ContentBase } from "./content";
import { Dificuldade } from "./enums";
// ainda por pensar
export interface Projeto extends ContentBase {
  tipo: "projeto";

  autor: string;

  problemaResolvido: string;

  tecnologias: string;

  repositorioGithub?: string;
  documentacaoUrl?: string;

  imagensUrl: string[];

  dificuldade: Dificuldade;

  duracao?: string;
}
