import { FC } from 'react';
import { RankingItem } from '../types';

interface Props {
  results: RankingItem[];
}

const ScoreChart: FC<Props> = ({ results }) => {
  if (!results || results.length === 0) return null;
  const max = Math.max(...results.map((r) => r.score ?? 0));
  if (max <= 0) return null;
  return (
    <div className="space-y-4">
      {results.map((r) => (
        <div key={r.rank} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>{r.name}</span>
            <span>{r.score}</span>
          </div>
          <div className="bg-gray-200 h-2 rounded">
            <div
              className="bg-blue-500 h-2 rounded"
              style={{ width: `${(r.score / max) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScoreChart;
