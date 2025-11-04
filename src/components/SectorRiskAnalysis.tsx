import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Search, ArrowUpDown } from 'lucide-react';
import { SectorRiskData } from '../types';

interface SectorRiskAnalysisProps {
  data: SectorRiskData;
}

const COLORS = ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

export default function SectorRiskAnalysis({ data }: SectorRiskAnalysisProps) {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedFunds = [...data.topFunds].sort((a, b) => {
    if (!sortConfig) return 0;

    const aValue = a[sortConfig.key as keyof typeof a];
    const bValue = b[sortConfig.key as keyof typeof b];

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredFunds = sortedFunds.filter(fund =>
    fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fund.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRiskBadgeColor = (risk: string) => {
    const riskLower = risk.toLowerCase();
    if (riskLower.includes('very low') || riskLower.includes('en düşük')) return 'bg-green-500/20 text-green-400';
    if (riskLower.includes('low') || riskLower.includes('düşük')) return 'bg-cyan-500/20 text-cyan-400';
    if (riskLower.includes('medium') || riskLower.includes('orta')) return 'bg-yellow-500/20 text-yellow-400';
    if (riskLower.includes('high') || riskLower.includes('yüksek')) return 'bg-orange-500/20 text-orange-400';
    return 'bg-red-500/20 text-red-400';
  };

  return (
    <div className="space-y-6">
      <h1 className="text-white text-2xl font-bold">Sektör Risk Analizi</h1>

      <div className="bg-[#1a2332] rounded-lg p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-semibold text-lg">Sektör Fonları Risk Analizi</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-400">%3 Toplam</span>
            </div>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
              <ArrowUpDown className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.sectors}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.sectors.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a2332',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4 content-center">
            {data.sectors.map((sector, index) => (
              <div
                key={index}
                className="bg-[#0f1419] rounded-lg p-4 border border-gray-700"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-gray-400 text-sm">{sector.label}</span>
                </div>
                <div className="text-white text-2xl font-bold">%{sector.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#1a2332] rounded-lg p-6 border border-gray-800">
        <h3 className="text-white font-semibold text-lg mb-4">Sektörde En İyi Performans Gösteren Fonlar</h3>

        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Fon adı, firma adına göre ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0f1419] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 text-sm font-medium px-4 py-3">
                  <button onClick={() => handleSort('name')} className="flex items-center space-x-1 hover:text-white">
                    <span>Fon Adı</span>
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="text-left text-gray-400 text-sm font-medium px-4 py-3">
                  <button onClick={() => handleSort('company')} className="flex items-center space-x-1 hover:text-white">
                    <span>Kurucu</span>
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="text-left text-gray-400 text-sm font-medium px-4 py-3">
                  <button onClick={() => handleSort('category')} className="flex items-center space-x-1 hover:text-white">
                    <span>Kategori</span>
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="text-left text-gray-400 text-sm font-medium px-4 py-3">
                  <button onClick={() => handleSort('oneYearReturn')} className="flex items-center space-x-1 hover:text-white">
                    <span>1 Yıl (%)r</span>
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="text-left text-gray-400 text-sm font-medium px-4 py-3">
                  <button onClick={() => handleSort('threeYearReturn')} className="flex items-center space-x-1 hover:text-white">
                    <span>3 Yıl (%)</span>
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="text-left text-gray-400 text-sm font-medium px-4 py-3">
                  <button onClick={() => handleSort('risk')} className="flex items-center space-x-1 hover:text-white">
                    <span>Risk Seviyesi</span>
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredFunds.map((fund, index) => (
                <tr key={index} className="border-b border-gray-700/50 hover:bg-[#0f1419] transition-colors">
                  <td className="px-4 py-4 text-white text-sm">{fund.name}</td>
                  <td className="px-4 py-4 text-gray-400 text-sm">{fund.company}</td>
                  <td className="px-4 py-4 text-gray-400 text-sm">{fund.category}</td>
                  <td className="px-4 py-4 text-white text-sm font-medium">{fund.oneYearReturn.toFixed(4)}</td>
                  <td className="px-4 py-4 text-white text-sm font-medium">{fund.threeYearReturn.toFixed(2)}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getRiskBadgeColor(fund.risk)}`}>
                      {fund.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
