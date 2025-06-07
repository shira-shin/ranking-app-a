import { useTranslations } from 'next-intl';

export default function ExportButtons() {
  const t = useTranslations();
  const handleClick = (type: string) => {
    alert(`${type} export coming soon!`);
  };
  return (
    <div className="buttons">
      <button
        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => handleClick('PDF')}
      >
        {t('exportPdf')}
      </button>
      <button
        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={() => handleClick('CSV')}
      >
        {t('exportCsv')}
      </button>
    </div>
  );
}

