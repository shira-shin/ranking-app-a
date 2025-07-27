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
  id?: string;
}

const ScoreChart: FC<Props> = ({ results, id }) => {
  if (!results || results.length === 0) return null;

  const data = {
    labels: results.map((r) => r.name),
    datasets: [
      {
        label: 'Score',
        data: results.map((r) => r.score),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div id={id} className="max-w-md mx-auto">
      <Radar data={data} />
    </div>
  );
};

export default ScoreChart;
