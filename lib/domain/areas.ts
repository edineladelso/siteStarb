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
  | "matematica"
  | "fisica"
  | "quimica"
  | "materiais"
  | "mecanica"
  | "eletrica"
  | "eletronica"
  | "controle_automacao"
  | "computacao"
  | "telecom"
  | "civil";

export const macroAreaLivroValues = [
  "matematica",
  "fisica",
  "quimica",
  "materiais",
  "mecanica",
  "eletrica",
  "eletronica",
  "controle_automacao",
  "computacao",
  "telecom",
  "civil",
] as const;

export const AreaLivroParaMacroArea: Record<AreaLivro, MacroAreaLivro> = {
  matematica: "matematica",
  algebra: "matematica",
  calculo: "matematica",
  geometria_analitica: "matematica",
  estatistica: "matematica",
  probabilidade: "matematica",
  fisica: "fisica",
  mecanica_classica: "fisica",
  termodinamica: "fisica",
  eletromagnetismo: "fisica",
  optica: "fisica",
  fisica_moderna: "fisica",
  quimica: "quimica",
  quimica_geral: "quimica",
  quimica_organica: "quimica",
  quimica_analitica: "quimica",
  materiais: "materiais",
  ciencia_dos_materiais: "materiais",
  resistencia_dos_materiais: "materiais",
  mecanica_dos_solidos: "materiais",
  mecanica_dos_fluidos: "mecanica",
  transferencia_de_calor: "mecanica",
  processos_de_fabricacao: "mecanica",
  metrologia: "mecanica",
  desenho_tecnico: "mecanica",
  projeto_mecanico: "mecanica",
  maquinas_termicas: "mecanica",
  eletricidade: "eletrica",
  circuitos_eletricos: "eletrica",
  sistemas_de_potencia: "eletrica",
  maquinas_eletricas: "eletrica",
  instalacoes_eletricas: "eletrica",
  eletronica: "eletronica",
  eletronica_analogica: "eletronica",
  eletronica_digital: "eletronica",
  controle_automatico: "controle_automacao",
  sistemas_de_controle: "controle_automacao",
  instrumentacao: "controle_automacao",
  automacao: "controle_automacao",
  robotica: "controle_automacao",
  sistemas_embarcados: "controle_automacao",
  microcontroladores: "controle_automacao",
  telecomunicacoes: "telecom",
  sinais_e_sistemas: "telecom",
  processamento_de_sinais: "telecom",
  computacao: "computacao",
  algoritmos: "computacao",
  estruturas_de_dados: "computacao",
  programacao: "computacao",
  engenharia_de_software: "computacao",
  banco_de_dados: "computacao",
  sistemas_operacionais: "computacao",
  redes_de_computadores: "computacao",
  arquitetura_de_computadores: "computacao",
  seguranca_da_informacao: "computacao",
  inteligencia_artificial: "computacao",
  aprendizado_de_maquina: "computacao",
  engenharia_civil: "civil",
  mecanica_dos_solos: "civil",
  geotecnia: "civil",
  hidraulica: "civil",
  hidrologia: "civil",
  saneamento: "civil",
  transportes: "civil",
  estruturas: "civil",
  concreto_armado: "civil",
  estruturas_metalicas: "civil",
  topografia: "civil",
  geologia_de_engenharia: "civil",
};

export const toMacroAreas = (areas: AreaLivro[]): MacroAreaLivro[] => {
  const macros = new Set<MacroAreaLivro>();
  for (const area of areas) {
    macros.add(AreaLivroParaMacroArea[area]);
  }
  return Array.from(macros);
};
