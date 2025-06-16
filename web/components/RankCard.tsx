import { FC } from 'react';
import { RankingItem } from '../types';

type Props = RankingItem;

const medalClasses = ['bg-yellow-400', 'bg-slate-300', 'bg-amber-600'];

const RankCard: FC<Props> = ({ name, score, rank, reasons }) => {
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
        #{rank}
      </div>
      <h2 className="text-xl font-bold mb-1">{name}</h2>
      <p className="text-xl font-extrabold mb-2">{score} pt</p>
      <ul className="flex flex-wrap gap-2">
        {Object.entries(reasons ?? {}).map(([k, v]) => (
          <li
            key={k}
            className="text-sm bg-gray-100 rounded px-2 py-0.5"
          >
            +{v} pt {k}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankCard;

