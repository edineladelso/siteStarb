export type AreaLivro =
  | "matematica"
  | "algebra"
  | "calculo"
  | "geometria_analitica"
  | "estatistica"
  | "probabilidade"
  | "fisica"
  | "mecanica_classica"
  | "termodinamica"
  | "eletromagnetismo"
  | "optica"
  | "fisica_moderna"
  | "quimica"
  | "quimica_geral"
  | "quimica_organica"
  | "quimica_analitica"
  | "materiais"
  | "ciencia_dos_materiais"
  | "resistencia_dos_materiais"
  | "mecanica_dos_solidos"
  | "mecanica_dos_fluidos"
  | "transferencia_de_calor"
  | "processos_de_fabricacao"
  | "metrologia"
  | "desenho_tecnico"
  | "projeto_mecanico"
  | "maquinas_termicas"
  | "eletricidade"
  | "eletronica"
  | "eletronica_analogica"
  | "eletronica_digital"
  | "circuitos_eletricos"
  | "sistemas_de_potencia"
  | "maquinas_eletricas"
  | "instalacoes_eletricas"
  | "modelacao_simulacao"
  | "controle_automatico"
  | "sistemas_de_controle"
  | "instrumentacao"
  | "automacao"
  | "robotica"
  | "sistemas_embarcados"
  | "microcontroladores"
  | "telecomunicacoes"
  | "sinais_e_sistemas"
  | "processamento_de_sinais"
  | "computacao"
  | "algoritmos"
  | "estruturas_de_dados"
  | "programacao"
  | "web"
  | "nativa"
  | "engenharia_de_software"
  | "banco_de_dados"
  | "sistemas_operacionais"
  | "redes_de_computadores"
  | "arquitetura_de_computadores"
  | "seguranca_da_informacao"
  | "inteligencia_artificial"
  | "aprendizado_de_maquina"
  | "engenharia_civil"
  | "mecanica_dos_solos"
  | "geotecnia"
  | "hidraulica"
  | "hidrologia"
  | "saneamento"
  | "transportes"
  | "estruturas"
  | "concreto_armado"
  | "estruturas_metalicas"
  | "topografia"
  | "geologia_de_engenharia";

export const areaLivroValues = [
  "matematica",
  "algebra",
  "calculo",
  "geometria_analitica",
  "estatistica",
  "probabilidade",
  "fisica",
  "mecanica_classica",
  "termodinamica",
  "eletromagnetismo",
  "optica",
  "fisica_moderna",
  "quimica",
  "quimica_geral",
  "quimica_organica",
  "quimica_analitica",
  "materiais",
  "ciencia_dos_materiais",
  "resistencia_dos_materiais",
  "mecanica_dos_solidos",
  "mecanica_dos_fluidos",
  "transferencia_de_calor",
  "processos_de_fabricacao",
  "metrologia",
  "desenho_tecnico",
  "projeto_mecanico",
  "maquinas_termicas",
  "eletricidade",
  "eletronica",
  "eletronica_analogica",
  "eletronica_digital",
  "circuitos_eletricos",
  "sistemas_de_potencia",
  "maquinas_eletricas",
  "instalacoes_eletricas",
  "modelacao_simulacao",
  "controle_automatico",
  "sistemas_de_controle",
  "instrumentacao",
  "automacao",
  "robotica",
  "sistemas_embarcados",
  "microcontroladores",
  "telecomunicacoes",
  "sinais_e_sistemas",
  "processamento_de_sinais",
  "computacao",
  "algoritmos",
  "estruturas_de_dados",
  "programacao",
  "web",
  "nativa",
  "engenharia_de_software",
  "banco_de_dados",
  "sistemas_operacionais",
  "redes_de_computadores",
  "arquitetura_de_computadores",
  "seguranca_da_informacao",
  "inteligencia_artificial",
  "aprendizado_de_maquina",
  "engenharia_civil",
  "mecanica_dos_solos",
  "geotecnia",
  "hidraulica",
  "hidrologia",
  "saneamento",
  "transportes",
  "estruturas",
  "concreto_armado",
  "estruturas_metalicas",
  "topografia",
  "geologia_de_engenharia",
] as const;

export type MacroAreaLivro =
  | "Matematica"
  | "Fisica"
  | "Quimica"
  | "Materiais"
  | "Mecanica"
  | "Eletrica"
  | "Eletronica"
  | "Controle_automacao"
  | "Computacao"
  | "Cyber_seguranca"
  | "Telecom"
  | "Redes_de_computadores"
  | "Civil"
  | "IA"
  | "Programacao"
  | "Mecatronica"
  | "Engenharia";

export const macroAreaLivroValues = [
  "Matematica",
  "Fisica",
  "Quimica",
  "Materiais",
  "Mecanica",
  "Eletrica",
  "Eletronica",
  "Controle_automacao",
  "Computacao",
  "Cyber_seguranca",
  "Telecom",
  "Redes_de_computadores",
  "Civil",
  "IA",
  "Programacao",
  "Mecatronica",
  "Engenharia",
] as const;

export const AreaLivroParaMacroArea: Record<AreaLivro, MacroAreaLivro> = {
  matematica: "Matematica",
  algebra: "Matematica",
  calculo: "Matematica",
  geometria_analitica: "Matematica",
  estatistica: "Matematica",
  probabilidade: "Matematica",
  fisica: "Fisica",
  mecanica_classica: "Fisica",
  termodinamica: "Fisica",
  eletromagnetismo: "Fisica",
  optica: "Fisica",
  fisica_moderna: "Fisica",
  quimica: "Quimica",
  quimica_geral: "Quimica",
  quimica_organica: "Quimica",
  quimica_analitica: "Quimica",
  materiais: "Materiais",
  ciencia_dos_materiais: "Materiais",
  resistencia_dos_materiais: "Materiais",
  mecanica_dos_solidos: "Materiais",
  mecanica_dos_fluidos: "Mecanica",
  transferencia_de_calor: "Mecanica",
  processos_de_fabricacao: "Mecanica",
  metrologia: "Mecanica",
  desenho_tecnico: "Mecanica",
  projeto_mecanico: "Mecanica",
  maquinas_termicas: "Mecanica",
  eletricidade: "Eletrica",
  circuitos_eletricos: "Eletrica",
  sistemas_de_potencia: "Eletrica",
  maquinas_eletricas: "Eletrica",
  instalacoes_eletricas: "Eletrica",
  eletronica: "Eletronica",
  eletronica_analogica: "Eletronica",
  eletronica_digital: "Eletronica",
  modelacao_simulacao: "Controle_automacao",
  controle_automatico: "Controle_automacao",
  sistemas_de_controle: "Controle_automacao",
  instrumentacao: "Controle_automacao",
  automacao: "Controle_automacao",
  robotica: "Controle_automacao",
  sistemas_embarcados: "Controle_automacao",
  microcontroladores: "Controle_automacao",
  telecomunicacoes: "Telecom",
  sinais_e_sistemas: "Telecom",
  processamento_de_sinais: "Telecom",
  computacao: "Computacao",
  algoritmos: "Computacao",
  estruturas_de_dados: "Computacao",
  web: "Programacao",
  nativa: "Programacao",
  programacao: "Computacao",
  engenharia_de_software: "Computacao",
  banco_de_dados: "Computacao",
  sistemas_operacionais: "Computacao",
  redes_de_computadores: "Redes_de_computadores",
  arquitetura_de_computadores: "Computacao",
  seguranca_da_informacao: "Cyber_seguranca",
  inteligencia_artificial: "IA",
  aprendizado_de_maquina: "IA",
  engenharia_civil: "Civil",
  mecanica_dos_solos: "Civil",
  geotecnia: "Civil",
  hidraulica: "Civil",
  hidrologia: "Civil",
  saneamento: "Civil",
  transportes: "Civil",
  estruturas: "Civil",
  concreto_armado: "Civil",
  estruturas_metalicas: "Civil",
  topografia: "Civil",
  geologia_de_engenharia: "Civil",
};

export const toMacroAreas = (areas: AreaLivro[]): MacroAreaLivro[] => {
  const macros = new Set<MacroAreaLivro>();
  for (const area of areas) {
    macros.add(AreaLivroParaMacroArea[area]);
  }
  return Array.from(macros);
};
