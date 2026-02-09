// ==================== lib/types.ts ====================

// 1. Importação dos Tipos do Domínio (Enums)
import type { 
  Status as ContentStatus, 
  Dificuldade, 
  TipoConteudo as ContentType 
} from "@/lib/domain/enums";

// 2. Importação dos Tipos do Zod (Validations) - Fonte da Verdade
import type { 
  SelectArtigo as Artigo, 
  InsertArtigo as NewArtigo,

  SelectLivro as Livro, 
  InsertLivro as NewLivro, 

  SelectProjeto as Projeto, 
  InsertProjeto as NewProjeto, 

  SelectSoftware as Software, 
  InsertSoftware as NewSoftware 
} from "@/lib/drizzle/validations/index";
import { macroAreaLivroValues } from "./domain";

// Re-exportar para uso global
export type {
  Artigo, NewArtigo,
  Livro, NewLivro,
  Projeto, NewProjeto,
  Software, NewSoftware,
  ContentStatus,
  Dificuldade,
  ContentType
};

// ==================== Union type de todos os conteúdos ====================
// Útil para componentes que renderizam listas mistas (ex: Search Results)
export type Content = Livro | Software | Projeto | Artigo;

// ==================== Analytics Types ====================

export interface AnalyticsFilters {
  period?: 7 | 30 | 90;
  contentType?: ContentType | "all";
  category?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

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
  tipo: ContentType;
}

export interface ContentTypeMetrics {
  tipo: ContentType;
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

export interface AnalyticsData {
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

// ==================== Dashboard & API Types ====================

export interface DashboardStats {
  totalLivros: number;
  totalSoftwares: number;
  totalProjetos: number;
  totalArtigos: number;
  totalViews: number;
  totalDownloads: number;
  activeUsers: number;
  avgRating: number;
}

export interface ActionResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  // Opcional: para erros de validação de formulário (Zod)
  validationErrors?: Record<string, string[]>; 
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ==================== Filter & Search Types ====================

export interface ContentFilters {
  categoria?: string;
  status?: ContentStatus;
  tipo?: ContentType;
  search?: string;
  orderBy?: "createdAt" | "views" | "downloads" | "avaliacao";
  order?: "asc" | "desc";
}

export interface SearchResult {
  id: string | number;
  tipo: ContentType;
  titulo: string;
  descricao: string;
  categoria: string;
  thumbnail?: string;
  url: string;
}

// ==================== Cloudinary Types ====================

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
  format?: string;
  resourceType?: string;
}

// ==================== Utility Types ====================

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

// ==================== Constants ====================

export const CATEGORIAS = macroAreaLivroValues;

export type Categoria = (typeof CATEGORIAS)[number];

export const UPLOAD_CONSTRAINTS = {
  image: {
    maxSize: 3 * 1024 * 1024,
    acceptedFormats: [".webp", ".png", ".avif", "image/webp", "image/png", "image/avif"],
  },
  pdf: {
    maxSize: 400 * 1024 * 1024,
    acceptedFormats: [".pdf", "application/pdf"],
  },
} as const;