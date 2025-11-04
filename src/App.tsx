import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CompanyComparison from './components/CompanyComparison';
import RiskMetricsHeatmap from './components/RiskMetricsHeatmap';
import SectorRiskAnalysis from './components/SectorRiskAnalysis';
import { riskMetricsData } from './data/riskMetricsData';
import { sectorRiskData } from './data/sectorData';

function App() {
  const [currentView, setCurrentView] = useState('company-comparison');

  return (
    <div className="flex min-h-screen bg-[#0a0e12]">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {currentView === 'overview' && (
              <div className="text-white">
                <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
                <p className="text-gray-400">Welcome to Finicify Analytics Platform</p>
              </div>
            )}

            {currentView === 'company-comparison' && <CompanyComparison />}

            {currentView === 'risk-metrics' && <RiskMetricsHeatmap data={riskMetricsData} />}

            {currentView === 'sector-risk' && <SectorRiskAnalysis data={sectorRiskData} />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
