import { FC } from 'react';
import { RankingItem } from '../types';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface Props {
  results: RankingItem[];
  full?: boolean;
}

const CriteriaRadar: FC<Props> = ({ results, full }) => {
  if (!results || results.length === 0) return null;
  const criteria = Object.keys(results[0].reasons ?? {});
  if (criteria.length === 0) return <p>No criteria data</p>;

  const datasets = results.map((r, idx) => {
    const color = `hsla(${(idx * 60) % 360},70%,50%,0.5)`;
    return {
      label: r.name,
      data: criteria.map((c) => {
        const text = r.reasons?.[c] || '';
        return Math.min(text.length, 100);
      }),
      backgroundColor: color,
      borderColor: color.replace('0.5', '1'),
      borderWidth: 1,
    };
  });

  const data = { labels: criteria, datasets };

  return (
    <div className={full ? 'max-w-full mx-auto' : 'max-w-md mx-auto'}>
      <Radar data={data} />
    </div>
  );
};

export default CriteriaRadar;
