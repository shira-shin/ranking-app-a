'use client';
import type { Criterion } from '@/types/criteria';

export default function SampleSets({
  applyItems, applyCriteria,
}:{ applyItems:(v:any[])=>void; applyCriteria:(v:Criterion[])=>void }) {
  function fillRamen(){
    applyItems([
      { id:crypto.randomUUID(), name:'ラーメン屋A', description:'魚介系・駅近' },
      { id:crypto.randomUUID(), name:'ラーメン屋B', description:'豚骨・深夜営業' },
      { id:crypto.randomUUID(), name:'ラーメン屋C', description:'醤油・老舗' },
    ]);
    applyCriteria([
      { id:crypto.randomUUID(), name:'味', description:'総合的な味の良さ', type:'likert', weight:5, direction:'asc', scale:{min:1,max:5,step:1,labels:['1','2','3','4','5']} },
      { id:crypto.randomUUID(), name:'価格', description:'コスパの良さ', type:'likert', weight:3, direction:'desc', scale:{min:1,max:5,step:1,labels:['高','やや高','普通','やや安','安']} },
      { id:crypto.randomUUID(), name:'アクセス', description:'通いやすさ', type:'likert', weight:2, direction:'asc', scale:{min:1,max:5,step:1} },
    ] as any);
  }
  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-md p-4">
      <h3 className="font-bold mb-2">サンプルを入れる</h3>
      <p className="text-sm text-slate-600">デモに便利。クリックで候補と評価基準を自動入力します。</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button onClick={fillRamen} className="rounded-2xl border px-4 py-2">ラーメンの例を入れる</button>
      </div>
    </div>
  );
}
