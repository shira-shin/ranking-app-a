'use client';
import { useEffect, useState } from 'react';
import type { Criterion } from '@/types/criteria';

export default function TemplateCard({ onApply }:{ onApply:(tpl:Criterion[])=>void }) {
  const [tpl, setTpl] = useState<Criterion[]|null>(null);
  useEffect(()=>{
    fetch('/api/me').then(r=>r.ok?r.json():null).then(me=>{
      if (me?.defaultCriteria) setTpl(me.defaultCriteria);
    });
  },[]);
  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-md p-4">
      <h3 className="font-bold mb-2">テンプレート</h3>
      <p className="text-sm text-slate-600">プロフィールに保存したデフォルト評価基準を適用できます。</p>
      <button disabled={!tpl} onClick={()=>tpl && onApply(tpl)} className="mt-3 rounded-2xl border px-4 py-2">
        {tpl ? 'デフォルト評価基準を読み込む' : 'デフォルト未設定'}
      </button>
    </div>
  );
}
