import { useState } from 'react';
import CompanyComparisonCard from './CompanyComparisonCard';
import { companyData } from '../data/companyData';
import PerformanceChart from './PerformanceChart';

export default function CompanyComparison() {
  const [comparisonMode, setComparisonMode] = useState<'sector' | 'company'>('sector');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-white text-2xl font-bold mb-6">Şirket İçi Karşılaştırma</h1>

        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setComparisonMode('sector')}
            className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
              comparisonMode === 'sector'
                ? 'bg-blue-500 text-white'
                : 'bg-[#1a2332] text-gray-400 border border-gray-700 hover:border-gray-600'
            }`}
          >
            Şirket Sektörü ile Karşılaştırma
          </button>
          <button
            onClick={() => setComparisonMode('company')}
            className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
              comparisonMode === 'company'
                ? 'bg-cyan-400 text-white'
                : 'bg-[#1a2332] text-gray-400 border border-gray-700 hover:border-gray-600'
            }`}
          >
            Şirketin Fonları İçinde Karşılaştırma
          </button>
        </div>

        <div className="bg-cyan-400/10 border border-cyan-400/20 rounded-lg px-4 py-3 mb-6">
          <p className="text-cyan-400 text-sm">
            Şirket Seçimi ile Karşılaştırma: Seçilen şirketin portföy yönetimi işleminin fonlarını detaylı olarak analiz edin.
          </p>
        </div>
      </div>

      <CompanyComparisonCard company={companyData} />

      <div className="bg-[#1a2332] rounded-lg border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0f1419] border-b border-gray-800">
                <th className="text-left text-gray-400 text-sm font-medium px-4 py-3">Fon Adı</th>
                <th className="text-left text-gray-400 text-sm font-medium px-4 py-3">Kategori</th>
                <th className="text-left text-gray-400 text-sm font-medium px-4 py-3">Toplam Maliyet (TL)</th>
                <th className="text-left text-gray-400 text-sm font-medium px-4 py-3">Günlük IV (Gate) (%)</th>
                <th className="text-left text-gray-400 text-sm font-medium px-4 py-3">Günlük Uzunl (%)</th>
                <th className="text-left text-gray-400 text-sm font-medium px-4 py-3">Ortalama Volatilite (%)</th>
              </tr>
            </thead>
            <tbody>
              {Array(8).fill(0).map((_, i) => (
                <tr key={i} className="border-b border-gray-800 hover:bg-[#0f1419] transition-colors">
                  <td className="px-4 py-3 text-white text-sm">Yapı Kredi Portföy Yönetimi A.Ş.</td>
                  <td className="px-4 py-3 text-gray-400 text-sm">12</td>
                  <td className="px-4 py-3 text-white text-sm">34.53</td>
                  <td className="px-4 py-3 text-white text-sm">23.53</td>
                  <td className="px-4 py-3 text-white text-sm">23.24</td>
                  <td className="px-4 py-3 text-white text-sm">23.54</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <PerformanceChart
        data={companyData.performanceData}
        title="Şirket İçi Performans Grafiği - En İyi 5 Fon"
      />
    </div>
  );
}
