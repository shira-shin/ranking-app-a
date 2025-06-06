import { useTranslations } from 'next-intl';

export default function ExportButtons() {
  const t = useTranslations();
  const handleClick = (type: string) => {
    alert(`${type} export coming soon!`);
  };
  return (
    <div className="buttons">
      <button onClick={() => handleClick('PDF')}>{t('exportPdf')}</button>
      <button onClick={() => handleClick('CSV')}>{t('exportCsv')}</button>
    </div>
  );
}
