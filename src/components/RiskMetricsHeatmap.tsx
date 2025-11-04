import { useState } from 'react';
import { RiskMetricsData } from '../types';

interface RiskMetricsHeatmapProps {
  data: RiskMetricsData;
}

export default function RiskMetricsHeatmap({ data }: RiskMetricsHeatmapProps) {
  const [hoveredCell, setHoveredCell] = useState<{ fund: string; value: number } | null>(null);
  const [minValue, maxValue] = data.scale;

  const getColor = (value: number) => {
    const normalized = (value - minValue) / (maxValue - minValue);

    if (normalized < 0.33) {
      const intensity = Math.round(normalized / 0.33 * 255);
      return `rgb(${intensity}, ${200 + intensity / 5}, ${intensity})`;
    } else if (normalized < 0.66) {
      const intensity = Math.round((normalized - 0.33) / 0.33 * 255);
      return `rgb(${200 + intensity / 4}, ${255 - intensity / 2}, ${50})`;
    } else {
      const intensity = Math.round((normalized - 0.66) / 0.34 * 255);
      return `rgb(${255}, ${150 - intensity / 2}, ${50 - intensity / 5})`;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-white text-2xl font-bold mb-6">Yatırım Fonu Karşılaştırmalı Risk Analizi</h1>

        <div className="flex space-x-2 mb-6">
          <button className="px-6 py-2.5 rounded-lg font-medium bg-blue-500 text-white">
            Risk Matrisleri
          </button>
          <button className="px-6 py-2.5 rounded-lg font-medium bg-[#1a2332] text-gray-400 border border-gray-700">
            Korelasyon Analizi
          </button>
          <button className="px-6 py-2.5 rounded-lg font-medium bg-[#1a2332] text-gray-400 border border-gray-700">
            Performans Atribüsyonu
          </button>
        </div>
      </div>

      <div className="bg-[#1a2332] rounded-lg p-6 border border-gray-800">
        <h3 className="text-white font-semibold text-lg mb-6">Risk Metrikleri Karşılaştırması</h3>

        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            <div className="flex">
              <div className="w-64 flex-shrink-0">
                <div className="h-12 flex items-center px-4 text-gray-400 text-sm font-medium border-b border-gray-700">
                  Fon Adı
                </div>
                {data.metrics.map((metric, index) => (
                  <div
                    key={index}
                    className="h-12 flex items-center px-4 text-white text-sm border-b border-gray-700/50"
                  >
                    {metric.fund}
                  </div>
                ))}
              </div>

              <div className="flex-1 overflow-x-auto">
                <div className="flex">
                  {[...Array(data.metrics[0]?.values.length || 0)].map((_, colIndex) => (
                    <div key={colIndex} className="flex-1 min-w-[100px]">
                      <div className="h-12 flex items-center justify-center text-gray-400 text-sm font-medium border-b border-gray-700">
                        {colIndex + 1}
                      </div>
                      {data.metrics.map((metric, rowIndex) => (
                        <div
                          key={rowIndex}
                          className="h-12 flex items-center justify-center text-white text-sm border-b border-gray-700/50 relative group cursor-pointer transition-all"
                          style={{ backgroundColor: getColor(metric.values[colIndex]) }}
                          onMouseEnter={() => setHoveredCell({ fund: metric.fund, value: metric.values[colIndex] })}
                          onMouseLeave={() => setHoveredCell(null)}
                        >
                          {metric.values[colIndex].toFixed(2)}

                          {hoveredCell?.fund === metric.fund && hoveredCell?.value === metric.values[colIndex] && (
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 z-10 whitespace-nowrap">
                              <div className="text-xs text-gray-400">{metric.fund}</div>
                              <div className="text-sm font-semibold">{metric.values[colIndex].toFixed(2)}</div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center space-x-4">
          <span className="text-gray-400 text-sm">{minValue}</span>
          <div className="w-64 h-6 rounded-full" style={{
            background: `linear-gradient(to right, rgb(0, 200, 0), rgb(255, 255, 0), rgb(255, 100, 0))`
          }}></div>
          <span className="text-gray-400 text-sm">{maxValue}</span>
        </div>
      </div>
    </div>
  );
}
