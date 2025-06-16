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
      <ul className="space-y-1 mt-2">
        {Object.entries(reasons ?? {}).map(([k, v]) => (
          <li
            key={k}
            className="text-sm bg-gray-50 rounded px-2 py-1 shadow"
          >
            <span className="font-semibold mr-1">{k}:</span>
            {v}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankCard;

