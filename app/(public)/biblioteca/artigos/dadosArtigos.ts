import { createSlug } from "@/lib/utils/createSlug";

export type ArtigoBiblioteca = {
  id: string;
  slug: string;
  titulo: string;
  resumo: string;
  categoria: string;
  autores: string[];
  instituicao?: string;
  ano: number;
  tags: string[];
  capa: string;
  leituraMin: number;
  destaque?: boolean;
  updatedAt: string;
  pdfUrl?: string;
  visualizacoes: number;
  citacoes: number;
  html: string;
};

export const artigosBiblioteca: ArtigoBiblioteca[] = [
  {
    id: "artigo-solar",
    slug: "matriz-energetica-solar-distribuida",
    titulo: "Expansão da Energia Solar Distribuída no Brasil",
    resumo:
      "Mapeamento de micro e mini gerações fotovoltaicas, desempenho por região e impactos na estabilidade do SIN.",
    categoria: "Energia",
    autores: ["Laura Carvalho", "Dr. Felipe Nogueira"],
    instituicao: "UFPE • Laboratório de Sistemas Energéticos",
    ano: 2024,
    tags: ["energia", "fotovoltaica", "infraestrutura"],
    capa:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1600&q=80",
    leituraMin: 12,
    destaque: true,
    updatedAt: "2025-11-03",
    pdfUrl:
      "https://cdn.starb.example.com/artigos/matriz-energetica-solar-distribuida.pdf",
    visualizacoes: 18450,
    citacoes: 62,
    html: `
      <h2>Resumo Executivo</h2>
      <p>O crescimento das conexões de geração distribuída (GD) atingiu 25 GW instalados em setembro de 2025, com 78% provenientes de sistemas fotovoltaicos residenciais. Estados do Nordeste lideram em fator de capacidade, enquanto o Sudeste concentra maior número absoluto de instalações.</p>
      <h3>Metodologia</h3>
      <ul>
        <li>Levantamento de 2,3 milhões de unidades consumidoras no SING e SIN.</li>
        <li>Séries temporais horárias (2019-2025) para irradiância e carga.</li>
        <li>Simulações de fluxo de potência em 112 alimentadores representativos.</li>
      </ul>
      <h3>Resultados-chave</h3>
      <p>Identificamos redução média de 7,8% nas perdas técnicas em redes secundárias urbanas densas, porém aumento de 3,1% na ocorrência de sobretensão em alimentadores rurais longos quando a penetração excede 35% da carga local.</p>
      <blockquote>Programas de resposta à demanda atrelados a inversores inteligentes mitigam 60% das violações de tensão sem necessidade de reforço físico.</blockquote>
      <h3>Recomendações</h3>
      <p>Priorizar esquemas de compensação reativa automatizada, padronizar telemetria em tempo real para sistemas acima de 75 kW e incentivar consórcios regionais para compartilhamento de bancos de baterias comunitários.</p>
    `,
  },
  {
    id: "artigo-ia-saude",
    slug: "ia-clinica-interpretavel",
    titulo: "IA Clínica Interpretável para Triagem Hospitalar",
    resumo:
      "Pipeline de modelos explicáveis para priorização de pacientes em prontos-socorros com métricas auditáveis.",
    categoria: "Saúde Digital",
    autores: ["Dra. Patrícia Lima", "Renan Duarte"],
    instituicao: "Hospital Santa Augusta • Núcleo de Dados",
    ano: 2025,
    tags: ["ia", "saude", "governanca", "mlops"],
    capa:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1600&q=80",
    leituraMin: 15,
    updatedAt: "2025-10-18",
    visualizacoes: 14210,
    citacoes: 38,
    html: `
      <h2>Contexto</h2>
      <p>Filas de espera em emergências urbanas cresceram 22% em 2024. A triagem manual apresenta variabilidade entre profissionais e limita a rastreabilidade de decisões.</p>
      <h3>Arquitetura</h3>
      <p>Adotamos um ensemble de Gradient Boosting + Redes Neurais leves com SHAP integrado. Cada predição é acompanhada de um vetor de importância de variáveis e um score de confiabilidade.</p>
      <h3>Governança e Ética</h3>
      <ul>
        <li>Auditoria semanal de drift de dados com limites de ação automáticos.</li>
        <li>Explicações em linguagem natural entregues ao médico responsável.</li>
        <li>Registro criptografado de versões de modelo e dataset.</li>
      </ul>
      <h3>Impacto</h3>
      <p>Redução de 11 minutos no tempo médio até o primeiro atendimento e aumento de 6% na detecção precoce de casos críticos (classe raríssima). Nenhuma decisão é automática: o modelo auxilia a triagem e é supervisionado em tempo real.</p>
    `,
  },
  {
    id: "artigo-concreto",
    slug: "concreto-ultra-resistente-uhpc",
    titulo: "UHPC: Concreto Ultrarrresistente para Pontes Urbanas",
    resumo:
      "Estudo de durabilidade e custo total de ciclo de vida em aplicações de tráfego pesado com UHPC.",
    categoria: "Engenharia Civil",
    autores: ["Marcelo Souza", "Prof. Camila Freitas"],
    ano: 2023,
    tags: ["infraestrutura", "materiais", "durabilidade"],
    capa:
      "https://images.unsplash.com/photo-1529429617124-aee1f1650a5c?auto=format&fit=crop&w=1600&q=80",
    leituraMin: 10,
    updatedAt: "2024-12-09",
    visualizacoes: 9800,
    citacoes: 24,
    html: `
      <h2>Introdução</h2>
      <p>UHPC combina baixa relação a/c, fibras metálicas e adições pozolânicas para atingir resistências acima de 150 MPa, com permeabilidade extremamente reduzida.</p>
      <h3>Ensaios Realizados</h3>
      <p>Dois protótipos em escala 1:2 foram submetidos a 3 milhões de ciclos de fadiga. Medimos flechas, fissuração e perda de rigidez.</p>
      <h3>Custos</h3>
      <p>Apesar do CAPEX 22% superior, o OPEX projetado em 50 anos é 35% menor, principalmente por menor frequência de recuperação de juntas e selantes.</p>
      <h3>Conclusão</h3>
      <p>UHPC é competitivo em corredores urbanos com tráfego pesado e restrição de janelas de manutenção.</p>
    `,
  },
  {
    id: "artigo-xai",
    slug: "redes-neurais-explicaveis-industria",
    titulo: "Redes Neurais Explicáveis em Linhas de Produção",
    resumo:
      "Framework de interpretabilidade aplicado a detecção de falhas em tempo real em manufatura discreta.",
    categoria: "Indústria 4.0",
    autores: ["Jéssica Prado", "Otávio Klein"],
    ano: 2024,
    tags: ["visao-computacional", "xai", "manufatura"],
    capa:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80",
    leituraMin: 9,
    updatedAt: "2025-02-14",
    visualizacoes: 11240,
    citacoes: 19,
    html: `
      <h2>Desafio</h2>
      <p>Modelos de visão são frequentemente caixas-pretas, dificultando RCA rápido em paradas de linha.</p>
      <h3>Solução</h3>
      <p>Integramos Grad-CAM otimizado e LIME para salientar regiões de interesse em peças defeituosas, exibindo mapas térmicos em dashboards operacionais.</p>
      <h3>Resultados</h3>
      <p>Redução de 18% em falsos positivos e tempo médio de liberação de lote 12% menor.</p>
    `,
  },
  {
    id: "artigo-agro",
    slug: "agricultura-precisao-sensoriamento",
    titulo: "Sensoriamento Remoto para Agricultura de Precisão",
    resumo:
      "Uso combinado de NDVI, termografia e modelos de previsão hídrica para manejo fino de talhões.",
    categoria: "AgroTech",
    autores: ["Helena Ribeiro"],
    ano: 2025,
    tags: ["agricultura", "gis", "drones"],
    capa:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80",
    leituraMin: 11,
    updatedAt: "2025-09-22",
    visualizacoes: 8750,
    citacoes: 17,
    html: `
      <h2>Método</h2>
      <p>Integração de dados Sentinel-2, drones multiespectrais e sensores de solo para estimar estresse hídrico com resolução diária.</p>
      <h3>Aplicação</h3>
      <p>Alertas antecipados de déficit hídrico reduziram em 14% o consumo de água por hectare em três safras monitoradas.</p>
    `,
  },
  {
    id: "artigo-quantico",
    slug: "computacao-quantica-aplicada-logistica",
    titulo: "Computação Quântica Aplicada a Rotas Logísticas",
    resumo:
      "Benchmark de QAOA e algoritmos híbridos quântico-clássicos para problemas de roteamento.",
    categoria: "Computação",
    autores: ["Luiz Fernando Teles", "Marina Kato"],
    ano: 2024,
    tags: ["quantica", "otimizacao", "logistica"],
    capa:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
    leituraMin: 8,
    updatedAt: "2025-01-11",
    visualizacoes: 9650,
    citacoes: 21,
    html: `
      <h2>Setup Experimental</h2>
      <p>Usamos instâncias TSPLIB de 50 a 120 nós em simuladores de 24 qubits e hardware de 8 qubits para validação.</p>
      <h3>Resultados</h3>
      <p>Algoritmos híbridos entregaram gaps de 2,8% em média com 30% menos custo computacional que VQE puro.</p>
      <h3>Perspectivas</h3>
      <p>Escalonar para 256 nós depende de melhorias em ruído e scheduling, mas já se mostra promissor para rotas regionais.</p>
    `,
  },
];


export function getArtigoBySlug(slug: string) {
  const alvo = createSlug(slug);

  return artigosBiblioteca.find((artigo) => {
    const slugArtigo = createSlug(artigo.slug || artigo.id);
    const idNormalizado = createSlug(artigo.id);
    const tituloNormalizado = createSlug(artigo.titulo);

    return (
      slugArtigo === alvo ||
      idNormalizado === alvo ||
      tituloNormalizado === alvo
    );
  });
}
