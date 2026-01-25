// ==================== lib/types.ts ====================

export type ContentType = "livro" | "software" | "projeto" | "artigo";

export type ContentStatus = "ativo" | "rascunho" | "arquivado" | "pendente" | "publicado";

export interface BaseContent {
  id: string;
  tipo: ContentType;
  titulo: string;
  categoria: string;
  descricao: string;
  status: ContentStatus;
  views: number;
  downloads: number;
  avaliacao: number;
  dataCriacao: string;
  dataAtualizacao?: string;
  thumbnail?: string;
}

export interface Livro extends BaseContent {
  tipo: "livro";
  autor: string;
  isbn?: string;
  anoPublicacao?: number;
  editora?: string;
  idioma: string;
  numeroPaginas?: number;
  capaUrl: string;
  pdfUrl: string;
  tags: string[];
}

export interface Software extends BaseContent {
  tipo: "software";
  siteOficial: string;
  funcionalidades: string;
  requisitos: string;
  preco: string;
  plataformas: string[];
  screenshots: string[];
}

export interface Projeto extends BaseContent {
  tipo: "projeto";
  autor: string;
  problemaResolvido: string;
  tecnologias: string;
  repositorioGithub?: string;
  documentacaoUrl?: string;
  imagensUrl: string[];
  dificuldade: "Iniciante" | "Intermediário" | "Avançado";
  duracao?: string;
}

export interface Artigo extends BaseContent {
  tipo: "artigo";
  autores: string;
  resumo: string;
  palavrasChave: string;
  anoPublicacao?: number;
  instituicao?: string;
  pdfUrl: string;
}

export type Content = Livro | Software | Projeto | Artigo;

export interface AnalyticsData {
  views: { label: string; value: number }[];
  downloads: { label: string; value: number }[];
  categories: { name: string; count: number; percentage: number }[];
  topContent: { title: string; views: number; downloads: number; tipo: string }[];
  growth: { metric: string; value: number; change: number; trend: "up" | "down" }[];
}


import { 
  TrendingUp, TrendingDown, Users, Eye, Download, 
  BookOpen, Code, Wrench, FileText, Calendar, 
  RefreshCw, Filter, ChevronDown, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

// ============================================================================
// TYPES - Conformidade com lib/types.ts
// ============================================================================

export interface AnalyticsOverview {
  totalViews: number;
  totalDownloads: number;
  totalContent: number;
  activeUsers: number;
  avgRating: number;
  conversionRate: number;
}

export interface GrowthMetric {
  metric: string;
  value: number;
  change: number;
  trend: "up" | "down";
}

export interface ViewsDownloadsData {
  label: string;
  value: number;
}

export interface CategoryData {
  name: string;
  count: number;
  percentage: number;
}

export interface TopContentItem {
  title: string;
  views: number;
  downloads: number;
  tipo: string;
}

export interface ContentTypeMetrics {
  tipo: string;
  total: number;
  views: number;
  downloads: number;
  avgRating: number;
}

export interface TimeSeriesData {
  date: string;
  views: number;
  downloads: number;
  usuarios: number;
}

export interface AnalyticsDatas {
  overview: AnalyticsOverview;
  growth: GrowthMetric[];
  views: ViewsDownloadsData[];
  downloads: ViewsDownloadsData[];
  categories: CategoryData[];
  topContent: TopContentItem[];
  contentTypeMetrics: ContentTypeMetrics[];
  timeSeries: TimeSeriesData[];
  lastUpdated: string;
}

export interface AnalyticsFilters {
  period: 7 | 30 | 90;
  contentType?: "livro" | "software" | "projeto" | "artigo" | "all";
  category?: string;
}
