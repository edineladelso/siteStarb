// 1. Importar o componente

import AnalyticsService from "@/components/admin/AnaliticsServices";
import AnalyticsComponent from "@/components/admin/AnalyticsComponents";


// 2. Usar na página admin/analytics
export default function AnalyticsPage() {
  return <AnalyticsComponent />;
}

// 3. Usar o serviço diretamente
const service = AnalyticsService.getInstance();
const data = await service.getAnalyticsData({
  period: 30,
  contentType: 'all'
});