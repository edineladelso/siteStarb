import type { Artigo } from "@/lib/types";
import type { AreaLivro, MacroAreaLivro } from "@/lib/domain/areas";

const baseDatas = {
  createdAt: new Date("2025-01-15"),
  updatedAt: new Date("2025-11-03"),
} as const;

function makeMidia(html: string) {
  // Usamos htmlUrl somente para satisfazer o schema; o conteúdo é entregue pelo campo extra `html`.
  return { tipo: "plataforma" as const, htmlUrl: "https://example.com/artigo" };
}

function palavrasChaveDe(tags: string[]) {
  return tags.join(", ");
}

function macroAreasDe(areas: AreaLivro[]): MacroAreaLivro[] {
  // simplificação: usa mapeamento manual mínimo
  const map: Partial<Record<AreaLivro, MacroAreaLivro>> = {
    sistemas_de_potencia: "Eletrica",
    eletricidade: "Eletrica",
    redes_de_computadores: "Redes_de_computadores",
    inteligencia_artificial: "IA",
    aprendizado_de_maquina: "IA",
    computacao: "Computacao",
    algoritmos: "Computacao",
    estruturas: "Civil",
    concreto_armado: "Civil",
    ciencia_dos_materiais: "Materiais",
    materiais: "Materiais",
    robotica: "Mecatronica",
    controle_automatico: "Controle_automacao",
    sinais_e_sistemas: "Controle_automacao",
    telecomunicacoes: "Telecom",
  };

  return Array.from(
    new Set(
      areas.map((a) => map[a]).filter((m): m is MacroAreaLivro => Boolean(m)),
    ),
  );
}

export const artigosBiblioteca: Artigo[] = [
  {
    id: 1,
    slug: "matriz-energetica-solar-distribuida",
    titulo: "Expansão da Energia Solar Distribuída no Brasil",
    descricao:
      "Impactos da geração distribuída fotovoltaica no SIN e estratégias para estabilidade de rede.",
    categoria: "Energia",
    status: "publicado",
    capa: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1600&q=80",
    views: 18450,
    downloads: 4200,
    avaliacao: "4.6",
    autores: ["Laura Carvalho", "Dr. Felipe Nogueira"],
    resumo:
      "Mapeamento de micro e mini gerações fotovoltaicas, desempenho regional e impactos na estabilidade do SIN.",
    palavrasChave: "energia, fotovoltaica, infraestrutura",
    anoPublicacao: 2024,
    instituicao: "UFPE • Laboratório de Sistemas Energéticos",
    areas: ["sistemas_de_potencia", "eletricidade"] as AreaLivro[],
    macroAreas: macroAreasDe([
      "sistemas_de_potencia",
      "eletricidade",
    ] as AreaLivro[]),
    midia: makeMidia(""),
    leituraMin: 12,
    destaque: true,
    tags: ["energia", "fotovoltaica", "infraestrutura"],
    citacoes: 62,
    html: `
      <h2>Resumo Executivo</h2>
      <p>O crescimento das conexões de geração distribuída (GD) atingiu 25 GW instalados em setembro de 2025, com 78% provenientes de sistemas fotovoltaicos residenciais.</p>
      <h3>Metodologia</h3>
      <ul>
        <li>Levantamento de 2,3 milhões de unidades consumidoras.</li>
        <li>Séries temporais horárias (2019-2025) para irradiância e carga.</li>
        <li>Simulações de fluxo de potência em 112 alimentadores.</li>
      </ul>
      <h3>Resultados-chave</h3>
      <p>Redução média de 7,8% nas perdas técnicas em redes urbanas; aumento de 3,1% em sobretensão em alimentadores rurais com penetração acima de 35%.</p>
    `,
    createdAt: baseDatas.createdAt,
    updatedAt: baseDatas.updatedAt,
  },
  {
    id: 2,
    slug: "ia-clinica-interpretavel",
    titulo: "IA Clínica Interpretável para Triagem Hospitalar",
    descricao:
      "Pipeline explicável para priorização de pacientes em prontos-socorros com métricas auditáveis.",
    categoria: "Saúde Digital",
    status: "publicado",
    capa: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1600&q=80",
    views: 14210,
    downloads: 3100,
    avaliacao: "4.5",
    autores: ["Dra. Patrícia Lima", "Renan Duarte"],
    resumo:
      "Modelos explicáveis auxiliam triagem hospitalar com transparência e governança.",
    palavrasChave: palavrasChaveDe(["ia", "saude", "mlops"]),
    anoPublicacao: 2025,
    instituicao: "Hospital Santa Augusta • Núcleo de Dados",
    areas: ["inteligencia_artificial", "aprendizado_de_maquina"] as AreaLivro[],
    macroAreas: macroAreasDe([
      "inteligencia_artificial",
      "aprendizado_de_maquina",
    ] as AreaLivro[]),
    midia: makeMidia(""),
    leituraMin: 15,
    destaque: false,
    tags: ["ia", "saude", "governanca", "mlops"],
    citacoes: 38,
    html: `
      <h2>Contexto</h2>
      <p>Filas de emergência cresceram 22% em 2024; a triagem manual é variável e pouco rastreável.</p>
      <h3>Arquitetura</h3>
      <p>Ensemble com SHAP integrado, cada predição acompanha vetor de importância e score de confiança.</p>
      <h3>Impacto</h3>
      <p>Redução de 11 minutos até primeiro atendimento e +6% de detecção precoce de casos críticos.</p>
    `,
    createdAt: baseDatas.createdAt,
    updatedAt: new Date("2025-10-18"),
  },
  {
    id: 3,
    slug: "concreto-ultra-resistente-uhpc",
    titulo: "UHPC: Concreto Ultrarrresistente para Pontes Urbanas",
    descricao:
      "Durabilidade e custo de ciclo de vida do UHPC em tráfego pesado urbano.",
    categoria: "Engenharia Civil",
    status: "publicado",
    capa: "https://images.unsplash.com/photo-1529429617124-aee1f1650a5c?auto=format&fit=crop&w=1600&q=80",
    views: 9800,
    downloads: 2100,
    avaliacao: "4.4",
    autores: ["Marcelo Souza", "Prof. Camila Freitas"],
    resumo:
      "UHPC com fibras metálicas e baixa permeabilidade aplicado a pontes urbanas.",
    palavrasChave: palavrasChaveDe([
      "infraestrutura",
      "materiais",
      "durabilidade",
    ]),
    anoPublicacao: 2023,
    instituicao: null,
    areas: ["estruturas", "concreto_armado"] as AreaLivro[],
    macroAreas: macroAreasDe(["estruturas", "concreto_armado"] as AreaLivro[]),
    midia: makeMidia(""),
    leituraMin: 10,
    destaque: false,
    tags: ["infraestrutura", "materiais", "durabilidade"],
    citacoes: 24,
    html: `
      <h2>Introdução</h2>
      <p>UHPC atinge resistências acima de 150 MPa com permeabilidade muito baixa.</p>
      <h3>Ensaios</h3>
      <p>Protótipos 1:2 submetidos a 3 milhões de ciclos; medição de flechas e fissuração.</p>
    `,
    createdAt: baseDatas.createdAt,
    updatedAt: new Date("2024-12-09"),
  },
  {
    id: 4,
    slug: "redes-neurais-explicaveis-industria",
    titulo: "Redes Neurais Explicáveis em Linhas de Produção",
    descricao:
      "Framework de interpretabilidade aplicado a detecção de falhas em tempo real.",
    categoria: "Indústria 4.0",
    status: "publicado",
    capa: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80",
    views: 11240,
    downloads: 1800,
    avaliacao: "4.3",
    autores: ["Jéssica Prado", "Otávio Klein"],
    resumo:
      "Grad-CAM otimizado e LIME para visão computacional em manufatura discreta.",
    palavrasChave: palavrasChaveDe([
      "visao-computacional",
      "xai",
      "manufatura",
    ]),
    anoPublicacao: 2024,
    instituicao: null,
    areas: ["processamento_de_sinais", "controle_automatico"] as AreaLivro[],
    macroAreas: macroAreasDe([
      "processamento_de_sinais",
      "controle_automatico",
    ] as AreaLivro[]),
    midia: makeMidia(""),
    leituraMin: 9,
    destaque: false,
    tags: ["visao-computacional", "xai", "manufatura"],
    citacoes: 19,
    html: `
      <h2>Desafio</h2>
      <p>Modelos de visão como caixas-pretas dificultam RCA em paradas de linha.</p>
      <h3>Solução</h3>
      <p>Grad-CAM e LIME geram mapas térmicos exibidos em dashboards operacionais.</p>
    `,
    createdAt: baseDatas.createdAt,
    updatedAt: new Date("2025-02-14"),
  },
  {
    id: 5,
    slug: "agricultura-precisao-sensoriamento",
    titulo: "Sensoriamento Remoto para Agricultura de Precisão",
    descricao:
      "NDVI, termografia e previsão hídrica para manejo fino de talhões.",
    categoria: "AgroTech",
    status: "publicado",
    capa: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80",
    views: 8750,
    downloads: 1500,
    avaliacao: "4.2",
    autores: ["Helena Ribeiro"],
    resumo:
      "Integração de dados multiespectrais e sensores de solo para monitoramento diário.",
    palavrasChave: palavrasChaveDe(["agricultura", "gis", "drones"]),
    anoPublicacao: 2025,
    instituicao: null,
    areas: ["telecomunicacoes", "processamento_de_sinais"] as AreaLivro[],
    macroAreas: macroAreasDe([
      "telecomunicacoes",
      "processamento_de_sinais",
    ] as AreaLivro[]),
    midia: makeMidia(""),
    leituraMin: 11,
    destaque: false,
    tags: ["agricultura", "gis", "drones"],
    citacoes: 17,
    html: `
      <h2>Método</h2>
      <p>Dados Sentinel-2 e drones multiespectrais combinados para estimar estresse hídrico diário.</p>
    `,
    createdAt: baseDatas.createdAt,
    updatedAt: new Date("2025-09-22"),
  },
  {
    id: 6,
    slug: "computacao-quantica-aplicada-logistica",
    titulo: "Computação Quântica Aplicada a Rotas Logísticas",
    descricao:
      "Benchmark de QAOA e algoritmos híbridos quântico-clássicos em roteamento.",
    categoria: "Computação",
    status: "publicado",
    capa: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
    views: 9650,
    downloads: 1700,
    avaliacao: "4.1",
    autores: ["Luiz Fernando Teles", "Marina Kato"],
    resumo:
      "Híbridos quântico-clássicos entregam gaps reduzidos com menor custo computacional.",
    palavrasChave: palavrasChaveDe(["quantica", "otimizacao", "logistica"]),
    anoPublicacao: 2024,
    instituicao: null,
    areas: ["algoritmos", "computacao"] as AreaLivro[],
    macroAreas: macroAreasDe(["algoritmos", "computacao"] as AreaLivro[]),
    midia: makeMidia(""),
    leituraMin: 8,
    destaque: false,
    tags: ["quantica", "otimizacao", "logistica"],
    citacoes: 21,
    html: `
      <h2>Setup Experimental</h2>
      <p>Instâncias TSPLIB de 50 a 120 nós em simuladores de 24 qubits e hardware de 8 qubits.</p>
    `,
    createdAt: baseDatas.createdAt,
    updatedAt: new Date("2025-01-11"),
  },
];
