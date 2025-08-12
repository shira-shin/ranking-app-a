'use client';
import { useState } from 'react';

export default function PreviewCard({ title, items, criteria, onSave }:{
  title:string; items:any[]; criteria:any[]; onSave:(isPublic:boolean)=>void;
}) {
  const [isPublic, setIsPublic] = useState(true);

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-md p-4">
      <h3 className="font-bold mb-2">プレビュー / 保存</h3>
      <div className="text-sm text-slate-600 mb-3">候補 {items.length} 件・基準 {criteria.length} 件</div>
      {/* TODO: チャート/表  */}
      <label className="flex items-center gap-2 mb-4">
        <input type="checkbox" checked={isPublic} onChange={e=>setIsPublic(e.target.checked)} />
        <span>公開する（共有可能）</span>
      </label>
      <button onClick={()=>onSave(isPublic)} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl py-3 shadow-lg">
        ランキングを生成・保存
      </button>
    </div>
  );
}
