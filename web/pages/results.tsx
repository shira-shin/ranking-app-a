import LanguageSwitcher from '../components/LanguageSwitcher';
import ExportButtons from '../components/ExportButtons';
import SaveHistoryButton from '../components/SaveHistoryButton';
import { useTranslations } from 'next-intl';

export default function Results() {
  const t = useTranslations();
  const dummyResults = [
    { name: 'Item A', score: 95, rank: 1 },
    { name: 'Item B', score: 80, rank: 2 },
    { name: 'Item C', score: 70, rank: 3 }
  ];

  return (
    <div>
      <LanguageSwitcher />
      <h1>{t('title')}</h1>
      <ul>
        {dummyResults.map((item) => (
          <li key={item.rank}>{item.rank}. {item.name} ({item.score})</li>
        ))}
      </ul>
      <ExportButtons />
      <SaveHistoryButton data={dummyResults} />
    </div>
  );
}
