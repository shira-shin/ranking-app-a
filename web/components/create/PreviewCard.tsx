'use client';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function PreviewCard({
  title, items, criteria, onSave,
}:{
  title:string; items:any[]; criteria:any[]; onSave:(isPublic:boolean)=>void;
}) {
  const labels = criteria.map((c:any)=>c.name || '（未設定）');
  const data = {
    labels,
    datasets: [{ label: '重み', data: criteria.map((c:any)=>c.weight||0) }]
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-md p-4">
      <h3 className="font-bold mb-2">プレビュー / 保存</h3>
      <div className="text-sm text-slate-600 mb-3">{title || '無題のランキング'} / 候補{items.length}件・基準{criteria.length}件</div>
      <div className="rounded-xl border p-3 bg-slate-50 mb-3">
        <Bar data={data} options={{ responsive:true, plugins:{ legend:{ display:false } } }}/>
      </div>
      <label className="flex items-center gap-2 my-3">
        <input id="public" type="checkbox" defaultChecked />
        <span>公開する（共有リンクを有効化）</span>
      </label>
      <button onClick={()=>onSave((document.getElementById('public') as HTMLInputElement)?.checked ?? true)}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl py-3 shadow-lg">
        ランキングを生成・保存
      </button>
    </div>
  );
}
