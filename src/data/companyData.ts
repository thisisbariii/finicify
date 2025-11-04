import { CompanyData } from '../types';

export const companyData: CompanyData = {
  name: 'NUROL PORTFÖY YÖNETİMİ A.Ş.',
  stats: [
    {
      label: 'Toplam Fon Sayısı',
      value: '75',
    },
    {
      label: 'Toplam Yönetilen Varlık Büyüklüğü',
      value: '75.7B TL',
    },
    {
      label: 'Ortalama Yıl Yıllık Getirisi (%)',
      value: '2.03%',
      change: 2.03,
      changeType: 'increase',
    },
    {
      label: 'Ortalama Yıl Getirisi (%)',
      value: '23.61%',
      change: 23.61,
      changeType: 'increase',
    },
  ],
  performanceData: [
    { period: 'Oca', value: 13.45 },
    { period: 'Şub', value: 14.23 },
    { period: 'Mar', value: 13.89 },
    { period: 'Nis', value: 14.56 },
    { period: 'May', value: 13.12 },
    { period: 'Haz', value: 14.78 },
    { period: 'Tem', value: 13.67 },
    { period: 'Ağu', value: 14.89 },
    { period: 'Eyl', value: 14.34 },
    { period: 'Eki', value: 15.23 },
    { period: 'Kas', value: 14.56 },
    { period: 'Ara', value: 15.67 },
  ],
};
