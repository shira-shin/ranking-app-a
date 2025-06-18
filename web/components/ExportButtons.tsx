import { useTranslations } from 'next-intl';
import { RankingItem } from '../types';

interface Props {
  data: RankingItem[];
}

export default function ExportButtons({ data }: Props) {
  const t = useTranslations();

  const exportCsv = () => {
    const headers = ['Rank', 'Name', 'Score', 'Reasons'];
    const rows = data.map((r) => {
      const reasons = Object.entries(r.reasons ?? {})
        .map(([k, v]) => `${k}:${v}`)
        .join('; ');
      return [r.rank, r.name, r.score, reasons];
    });
    const csv = [headers, ...rows]
      .map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ranking.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportPdf = () => {
    alert(`${t('comingSoon')}: PDF`);
  };
  return (
    <div className="buttons">
      <button
        className="px-3 py-1 bg-blue-400 text-white rounded cursor-not-allowed opacity-60"
        onClick={exportPdf}
        disabled
      >
        {t('exportPdf')}
      </button>
      <button
        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={exportCsv}
      >
        {t('exportCsv')}
      </button>
    </div>
  );
}

