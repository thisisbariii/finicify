import { BarChart3, TrendingUp, PieChart, Settings, HelpCircle, FileText } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'overview', label: 'Anasayfa', icon: BarChart3 },
    { id: 'company-comparison', label: 'Şirket İçi Karşılaştırma', icon: TrendingUp },
    { id: 'risk-metrics', label: 'Risk Metrikleri', icon: FileText },
    { id: 'sector-risk', label: 'Sektör Risk Analizi', icon: PieChart },
  ];

  const bottomItems = [
    { id: 'crypto', label: 'Kripto', icon: BarChart3 },
    { id: 'stocks', label: 'Emtia', icon: TrendingUp },
    { id: 'analysis', label: 'Tahvil', icon: FileText },
    { id: 'forex', label: 'Forex', icon: PieChart },
    { id: 'finicify-ai', label: 'Finicify AI', icon: Settings },
    { id: 'help', label: 'Hesap Makinesi', icon: HelpCircle },
    { id: 'reports', label: 'Raporlama', icon: FileText },
    { id: 'settings', label: 'Ayarlar', icon: Settings },
  ];

  return (
    <div className="w-64 bg-[#0f1419] min-h-screen flex flex-col border-r border-gray-800">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-semibold text-lg">finicify</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                currentView === item.id
                  ? 'bg-blue-500/10 text-blue-400'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="px-3 pb-4 space-y-1 border-t border-gray-800 pt-4">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                currentView === item.id
                  ? 'bg-blue-500/10 text-blue-400'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
