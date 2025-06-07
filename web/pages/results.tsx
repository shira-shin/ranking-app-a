import LanguageSwitcher from '../components/LanguageSwitcher';
import ExportButtons from '../components/ExportButtons';
import SaveHistoryButton from '../components/SaveHistoryButton';
import RankCard from '../components/RankCard';
import { useTranslations } from 'next-intl';

export default function Results() {
  const t = useTranslations();
  const dummyResults = [
    { name: 'Item A', score: 95, rank: 1, reasons: { quality: 40, design: 30, popularity: 25 } },
    { name: 'Item B', score: 80, rank: 2, reasons: { quality: 35, design: 25, popularity: 20 } },
    { name: 'Item C', score: 70, rank: 3, reasons: { quality: 30, design: 20, popularity: 20 } },
    { name: 'Item D', score: 60, rank: 4, reasons: { quality: 25, design: 20, popularity: 15 } }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <LanguageSwitcher />
      <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
      <div className="space-y-4">
        {dummyResults.map((item) => (
          <RankCard key={item.rank} {...item} />
        ))}
      </div>
      <div className="mt-6 flex gap-2">
        <ExportButtons />
        <SaveHistoryButton data={dummyResults} />
      </div>
    </div>
  );
}

