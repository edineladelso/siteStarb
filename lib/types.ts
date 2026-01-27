// ==================== lib/types.ts ====================

// ==================== Re-exportar tipos do Drizzle Schema ====================
export type {
  Livro,
  NewLivro,
  Software,
  NewSoftware,
  Projeto,
  NewProjeto,
  Artigo,
  NewArtigo,
  StatusType,
  DificuldadeType,
  TipoContentType,
} from "@/lib/drizzle/db/schema";

// ==================== Union type de todos os conteúdos ====================
import type { Livro, Software, Projeto, Artigo } from "@/lib/drizzle/db/schema";

export type Content = Livro | Software | Projeto | Artigo;
export type ContentType = "livro" | "software" | "projeto" | "artigo";
export type ContentStatus =
  | "ativo"
  | "rascunho"
  | "arquivado"
  | "pendente"
  | "publicado";
export type Dificuldade = "Iniciante" | "Intermediário" | "Avançado";

// ==================== Analytics Types (para AnalyticsService) ====================

// Filtros para Analytics
export interface AnalyticsFilters {
  period?: 7 | 30 | 90;
  contentType?: ContentType | "all";
  category?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

// Overview/Resumo de Analytics
export interface AnalyticsOverview {
  totalViews: number;
  totalDownloads: number;
  totalContent: number;
  activeUsers: number;
  avgRating: number;
  conversionRate: number;
}

// Métricas de crescimento
export interface GrowthMetric {
  metric: string;
  value: number;
  change: number;
  trend: "up" | "down";
}

// Dados de views/downloads ao longo do tempo
export interface ViewsDownloadsData {
  label: string;
  value: number;
}

// Dados de categorias
export interface CategoryData {
  name: string;
  count: number;
  percentage: number;
}

// Top conteúdo mais popular
export interface TopContentItem {
  title: string;
  views: number;
  downloads: number;
  tipo: string;
}

// Métricas por tipo de conteúdo
export interface ContentTypeMetrics {
  tipo: string;
  total: number;
  views: number;
  downloads: number;
  avgRating: number;
}

// Dados de séries temporais
export interface TimeSeriesData {
  date: string;
  views: number;
  downloads: number;
  usuarios: number;
}

// Estrutura completa de dados de Analytics
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

// ==================== Dashboard Types ====================

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

// ==================== Cloudinary Types ====================

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
  format?: string;
  resourceType?: string;
}

export interface UploadOptions {
  folder?: string;
  maxFileSize?: number;
  acceptedFormats?: string[];
  resourceType?: "image" | "video" | "raw" | "auto";
}

export interface FileUploadState {
  file: File | null;
  progress: number;
  uploading: boolean;
  error: string | null;
  result: CloudinaryUploadResult | null;
}

// ==================== API Response Types ====================

export interface ActionResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ==================== Filter Types ====================

export interface ContentFilters {
  categoria?: string;
  status?: ContentStatus;
  tipo?: ContentType;
  search?: string;
  orderBy?: "dataCriacao" | "views" | "downloads" | "avaliacao";
  order?: "asc" | "desc";
}

// ==================== Table Types (para DataTable) ====================

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
}

// ==================== Auth Types ====================

export interface User {
  id: string;
  email: string;
  role: "admin" | "user";
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// ==================== Navigation Types ====================

export interface NavItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  children?: NavItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// ==================== Notification Types ====================

export type NotificationType = "success" | "error" | "warning" | "info";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// ==================== Search Types ====================

export interface SearchResult {
  id: string;
  tipo: ContentType;
  titulo: string;
  descricao: string;
  categoria: string;
  thumbnail?: string;
  url: string;
}

export interface SearchFilters {
  query: string;
  tipo?: ContentType[];
  categoria?: string[];
}

// ==================== Validation Types ====================

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isValid: boolean;
}

// ==================== Form Types ====================

export interface FormProps<T> {
  initialData?: Partial<T>;
  onSubmit: (data: T) => Promise<void> | void;
  onCancel?: () => void;
}

// ==================== Loading & Error States ====================

export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

export interface ErrorState {
  hasError: boolean;
  message?: string;
  code?: string;
}

// ==================== Metadata Types ====================

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

// ==================== Utility Types ====================

// Tornar todos os campos opcionais (para updates parciais)
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Tornar campos específicos required
export type RequiredBy<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

// Tipo seguro para keys de objetos
export type KeysOf<T> = keyof T;

// Tipo para valores de um objeto
export type ValuesOf<T> = T[keyof T];

// ==================== Constants ====================

export const CONTENT_TYPES: ContentType[] = [
  "livro",
  "software",
  "projeto",
  "artigo",
];

export const CONTENT_STATUS: ContentStatus[] = [
  "ativo",
  "rascunho",
  "arquivado",
  "pendente",
  "publicado",
];

export const CATEGORIAS = [
  "IA",
  "Programação",
  "Eletrônica",
  "Mecatrônica",
  "Engenharia",
  "Matemática",
  "Física",
  "Química",
  "Robótica",
  "IoT",
] as const;

export type Categoria = (typeof CATEGORIAS)[number];

// ==================== Helper Types para validação ====================

export const UPLOAD_CONSTRAINTS = {
  image: {
    maxSize: 3 * 1024 * 1024, // 3MB
    acceptedFormats: [
      ".webp",
      ".png",
      ".avif",
      "image/webp",
      "image/png",
      "image/avif",
    ],
  },
  pdf: {
    maxSize: 400 * 1024 * 1024, // 400MB
    acceptedFormats: [".pdf", "application/pdf"],
  },
  document: {
    maxSize: 50 * 1024 * 1024, // 50MB
    acceptedFormats: [".pdf", ".doc", ".docx", "application/pdf"],
  },
} as const;
