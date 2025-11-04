import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PerformanceDataPoint } from '../types';

interface PerformanceChartProps {
  data: PerformanceDataPoint[];
  title?: string;
}

export default function PerformanceChart({ data, title }: PerformanceChartProps) {
  return (
    <div className="bg-[#1a2332] rounded-lg p-6 border border-gray-800">
      {title && <h3 className="text-white font-semibold text-lg mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a3a4a" />
          <XAxis
            dataKey="period"
            stroke="#6b7280"
            tick={{ fill: '#9ca3af' }}
          />
          <YAxis
            stroke="#6b7280"
            tick={{ fill: '#9ca3af' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1a2332',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
          <Legend
            wrapperStyle={{ color: '#9ca3af' }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
