import { FC } from 'react';
import { RankingItem } from '../types';
import { Award } from 'lucide-react';
import { useTranslations } from 'next-intl';

type Props = RankingItem;

const medalClasses = ['bg-yellow-400', 'bg-slate-300', 'bg-amber-600'];

const RankCard: FC<Props> = ({ name, score, rank, reasons }) => {
  const t = useTranslations();
  const ribbon = rank <= 3 ? medalClasses[rank - 1] : 'bg-gray-200';
  const borderColor = rank <= 3 ? medalClasses[rank - 1] : 'gray';
  return (
    <div
      className="relative p-4 bg-white rounded-lg shadow hover:shadow-lg transition animate-fadeIn border-l-4"
      style={{ borderColor: borderColor }}
    >
      <div
        className={`absolute -top-2 -left-2 px-2 py-1 text-sm text-white rounded ${ribbon}`}
      >
        <div className="flex items-center gap-1">
          {rank <= 3 && <Award className="w-3 h-3" />}
          {t('rank')} {rank}
        </div>
      </div>
      <h2 className="text-xl font-bold mb-1">{name || 'N/A'}</h2>
      <p className="text-xl font-extrabold mb-2">{t('score')}: {score ?? '-'}</p>
      {reasons && Object.keys(reasons).length > 0 && (
        <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
          {Object.entries(reasons).map(([k, v]) => (
            <li key={k} className="bg-gray-50 rounded px-2 py-1 shadow">
              <span className="font-semibold mr-1">{k}:</span>
              {v}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RankCard;

