import { FC } from 'react';
import { RankingItem } from '../types';
import { Award } from 'lucide-react';
import { useTranslations } from 'next-intl';

type Props = RankingItem;

const medalClasses = ['bg-yellow-400', 'bg-slate-300', 'bg-amber-600'];
const medalEmoji = ['🥇', '🥈', '🥉'];

const RankCard: FC<Props> = ({ name, score, rank, reasons }) => {
  const t = useTranslations();
  const ribbon = rank <= 3 ? medalClasses[rank - 1] : 'bg-gray-200';
  const borderColor = rank <= 3 ? medalClasses[rank - 1] : 'gray';
  return (
    <div
      className={`relative card flex hover:shadow-lg transition animate-fadeIn border-l-4 ${rank <= 3 ? 'scale-[1.03]' : ''}`}
      style={{ borderColor: borderColor }}
    >
      <div
        className={`absolute -top-2 -left-2 px-2 py-2 text-sm text-white rounded ${ribbon}`}
      >
        <div className="flex items-center gap-2">
          {rank <= 3 && <span>{medalEmoji[rank - 1]}</span>}
          {rank <= 3 && <Award className="w-3 h-3" />}
          {t('rank')} {rank}
        </div>
      </div>
      <div className="w-1/3 pr-4 border-r">
        <h2 className="text-2xl font-bold mb-2">{name || 'N/A'}</h2>
        <p className="text-xl font-extrabold">{t('score')}: {score ?? '-'}</p>
      </div>
      <div className="w-2/3 pl-4">
        {reasons && Object.keys(reasons).length > 0 && (
          <ul className="list-disc list-inside space-y-2 text-sm">
            {Object.entries(reasons).map(([k, v]) => (
              <li key={k} className="bg-gray-50 rounded px-2 py-2 shadow">
                <span className="font-semibold mr-2">{k}:</span>
                {v}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RankCard;

