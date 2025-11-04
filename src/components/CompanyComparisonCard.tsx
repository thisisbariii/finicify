import { CompanyData } from '../types';
import StatsBox from './StatsBox';
import PerformanceChart from './PerformanceChart';

interface CompanyComparisonCardProps {
  company: CompanyData;
}

export default function CompanyComparisonCard({ company }: CompanyComparisonCardProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-gray-400 text-sm mb-2 block">Analiz Edileceği Şirket</label>
        <div className="bg-[#1a2332] border border-gray-700 rounded-lg px-4 py-3 text-white">
          {company.name}
        </div>
      </div>

      <div>
        <h3 className="text-white font-semibold text-lg mb-4">Şirket Analizi</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {company.stats.map((stat, index) => (
            <StatsBox key={index} data={stat} />
          ))}
        </div>
      </div>

      <PerformanceChart
        data={company.performanceData}
        title="Şirket İçi Performans Grafiği - En İyi 5 Fon"
      />
    </div>
  );
}
