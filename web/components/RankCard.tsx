import { FC } from 'react';
import { RankingItem } from '../types';

type Props = RankingItem;

const medalClasses = ['bg-yellow-400', 'bg-slate-300', 'bg-amber-600'];

const RankCard: FC<Props> = ({ name, score, rank, reasons }) => {
  const ribbon = rank <= 3 ? medalClasses[rank - 1] : 'bg-gray-200';
  return (
    <div className="relative p-4 bg-white rounded-lg shadow animate-fadeIn">
      <div className={`absolute -top-2 -left-2 px-2 py-1 text-sm text-white rounded ${ribbon}`}>#{rank}</div>
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p className="text-2xl font-extrabold mb-2">{score} pt</p>
      <ul className="space-y-1">
        {Object.entries(reasons).map(([k, v]) => (
          <li key={k} className="text-sm bg-gray-100 rounded px-2 py-0.5 inline-block mr-2 mb-1">+{v} pt {k}</li>
        ))}
      </ul>
    </div>
  );
};

export default RankCard;

