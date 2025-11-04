import { TrendingUp, TrendingDown } from 'lucide-react';
import { StatBoxData } from '../types';

interface StatsBoxProps {
  data: StatBoxData;
}

export default function StatsBox({ data }: StatsBoxProps) {
  const hasChange = data.change !== undefined;
  const isPositive = data.changeType === 'increase';

  return (
    <div className="bg-[#1a2332] rounded-lg p-5 border border-gray-800">
      <div className="text-gray-400 text-sm mb-2">{data.label}</div>
      <div className="flex items-end justify-between">
        <div className="text-white text-3xl font-bold">{data.value}</div>
        {hasChange && (
          <div className={`flex items-center space-x-1 text-sm font-medium ${
            isPositive ? 'text-green-400' : 'text-red-400'
          }`}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{Math.abs(data.change!).toFixed(2)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
