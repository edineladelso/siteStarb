// ============================================================================
// ANALYTICS SERVICE - Singleton Pattern
// ============================================================================

import type { AnalyticsData, AnalyticsFilters, AnalyticsOverview, CategoryData, ContentTypeMetrics, GrowthMetric, TimeSeriesData, TopContentItem, ViewsDownloadsData } from '@/lib/types';

class AnalyticsService {
  private static instance: AnalyticsService;
  private cache: Map<string, { data: AnalyticsData; timestamp: number }> = new Map();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutos

  private constructor() {}

  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  /**
   * Método principal para obter dados de analytics
   * Implementa cache para otimização de performance
   */
  async getAnalyticsData(filters: AnalyticsFilters = { period: 30 }): Promise<AnalyticsData> {
    const cacheKey = JSON.stringify(filters);
    const cached = this.cache.get(cacheKey);

    // Retornar cache se válido
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data;
    }

    // Simular delay de API
    await this.delay(500);

    const data = this.generateAnalyticsData(filters);
    
    // Armazenar em cache
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });

    return data;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private generateAnalyticsData(filters: AnalyticsFilters): AnalyticsData {
    const { period, contentType } = filters;

    return {
      overview: this.generateOverview(contentType),
      growth: this.generateGrowthMetrics(),
      views: this.generateViewsData(period!),
      downloads: this.generateDownloadsData(period!),
      categories: this.generateCategoriesData(),
      topContent: this.generateTopContent(contentType),
      contentTypeMetrics: this.generateContentTypeMetrics(),
      timeSeries: this.generateTimeSeriesData(period!),
      lastUpdated: new Date().toISOString()
    };
  }

  private generateOverview(contentType?: string): AnalyticsOverview {
    const base = {
      totalViews: 45678,
      totalDownloads: 12453,
      totalContent: 88,
      activeUsers: 3421,
      avgRating: 4.6,
      conversionRate: 27.3
    };

    if (contentType && contentType !== "all") {
      return {
        ...base,
        totalViews: Math.floor(base.totalViews * 0.3),
        totalDownloads: Math.floor(base.totalDownloads * 0.3),
        totalContent: Math.floor(base.totalContent * 0.3)
      };
    }

    return base;
  }

  private generateGrowthMetrics(): GrowthMetric[] {
    return [
      { metric: "Views", value: 45678, change: 12.5, trend: "up" },
      { metric: "Downloads", value: 12453, change: 8.3, trend: "up" },
      { metric: "Usuários", value: 3421, change: 15.7, trend: "up" },
      { metric: "Avaliação", value: 4.6, change: -2.1, trend: "down" }
    ];
  }

  private generateViewsData(days: number): ViewsDownloadsData[] {
    const labels = this.generateDateLabels(days);
    return labels.map((label, i) => ({
      label,
      value: Math.floor(Math.random() * 800 + 400 + i * 10)
    }));
  }

  private generateDownloadsData(days: number): ViewsDownloadsData[] {
    const labels = this.generateDateLabels(days);
    return labels.map((label, i) => ({
      label,
      value: Math.floor(Math.random() * 200 + 100 + i * 5)
    }));
  }

  private generateCategoriesData(): CategoryData[] {
    const categories = [
      { name: "IA", count: 25, percentage: 28.4 },
      { name: "Programação", count: 20, percentage: 22.7 },
      { name: "Eletrônica", count: 15, percentage: 17.0 },
      { name: "Mecatrônica", count: 12, percentage: 13.6 },
      { name: "Engenharia", count: 10, percentage: 11.4 },
      { name: "Matemática", count: 6, percentage: 6.8 }
    ];
    return categories;
  }

  private generateTopContent(contentType?: string): TopContentItem[] {
    const allContent = [
      { title: "Introdução ao Machine Learning", views: 3456, downloads: 892, tipo: "livro" },
      { title: "AutoCAD 2024 Professional", views: 2987, downloads: 654, tipo: "software" },
      { title: "Sistema IoT com Arduino", views: 2654, downloads: 543, tipo: "projeto" },
      { title: "Redes Neurais Convolucionais", views: 2341, downloads: 498, tipo: "artigo" },
      { title: "Python para Data Science", views: 2198, downloads: 467, tipo: "livro" },
      { title: "SolidWorks 2024", views: 1987, downloads: 432, tipo: "software" },
      { title: "Robô Autônomo com ROS", views: 1876, downloads: 398, tipo: "projeto" },
      { title: "Deep Learning Applications", views: 1654, downloads: 367, tipo: "artigo" }
    ];

    if (contentType && contentType !== "all") {
      return allContent.filter(item => item.tipo === contentType).slice(0, 5);
    }

    return allContent.slice(0, 8);
  }

  private generateContentTypeMetrics(): ContentTypeMetrics[] {
    return [
      { tipo: "livro", total: 45, views: 18456, downloads: 5234, avgRating: 4.7 },
      { tipo: "software", total: 12, views: 9876, downloads: 2987, avgRating: 4.5 },
      { tipo: "projeto", total: 8, views: 6543, downloads: 1876, avgRating: 4.6 },
      { tipo: "artigo", total: 23, views: 10803, downloads: 2356, avgRating: 4.4 }
    ];
  }

  private generateTimeSeriesData(days: number): TimeSeriesData[] {
    const labels = this.generateDateLabels(days);
    return labels.map((date, i) => ({
      date,
      views: Math.floor(Math.random() * 800 + 400 + i * 10),
      downloads: Math.floor(Math.random() * 200 + 100 + i * 5),
      usuarios: Math.floor(Math.random() * 150 + 50 + i * 3)
    }));
  }

  private generateDateLabels(days: number): string[] {
    const labels: string[] = [];
    const now = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      if (days <= 7) {
        labels.push(date.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' }));
      } else {
        labels.push(date.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' }));
      }
    }

    return labels;
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export default AnalyticsService