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

  const exportPdf = async () => {
    const jsPDFModule = await import('jspdf');
    const html2canvas = (await import('html2canvas')).default;
    const doc = new jsPDFModule.jsPDF();
    doc.setFontSize(16);
    doc.text(t('title'), 10, 10);
    doc.setFontSize(12);
    let y = 20;
    data.forEach((r) => {
      const header = `${r.rank}. ${r.name} (${r.score})`;
      doc.text(header, 10, y);
      y += 7;
      const reasons = Object.entries(r.reasons ?? {})
        .map(([k, v]) => `${k}: ${v}`)
        .join('; ');
      if (reasons) {
        const lines = doc.splitTextToSize(reasons, 180);
        doc.text(lines, 10, y);
        y += lines.length * 7;
      }
      y += 5;
      if (y > 280) {
        doc.addPage();
        y = 10;
      }
    });
    const scoreEl = document.getElementById('score-chart');
    const radarEl = document.getElementById('criteria-radar');
    if (scoreEl || radarEl) {
      doc.addPage();
      let imgY = 10;
      if (scoreEl) {
        const canvas = await html2canvas(scoreEl as HTMLElement);
        const img = canvas.toDataURL('image/png');
        doc.addImage(img, 'PNG', 10, imgY, 180, 100);
        imgY += 110;
      }
      if (radarEl) {
        const canvas = await html2canvas(radarEl as HTMLElement);
        const img = canvas.toDataURL('image/png');
        doc.addImage(img, 'PNG', 10, imgY, 180, 100);
      }
    }
    doc.save('ranking.pdf');
  };
  return (
    <div className="buttons">
      <button
        className="btn btn-primary"
        onClick={exportPdf}
      >
        {t('exportPdf')}
      </button>
      <button
        className="btn btn-accent"
        onClick={exportCsv}
      >
        {t('exportCsv')}
      </button>
    </div>
  );
}

