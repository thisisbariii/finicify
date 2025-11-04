export interface StatBoxData {
  label: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease';
}

export interface PerformanceDataPoint {
  period: string;
  value: number;
}

export interface CompanyData {
  name: string;
  stats: StatBoxData[];
  performanceData: PerformanceDataPoint[];
}

export interface RiskMetric {
  fund: string;
  values: number[];
}

export interface RiskMetricsData {
  metrics: RiskMetric[];
  scale: [number, number];
}

export interface SectorRisk {
  label: string;
  value: number;
}

export interface TopFund {
  name: string;
  company: string;
  category: string;
  oneYearReturn: number;
  threeYearReturn: number;
  risk: string;
}

export interface SectorRiskData {
  sectors: SectorRisk[];
  topFunds: TopFund[];
}
