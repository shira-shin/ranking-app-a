import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import type { Criterion } from '@/types/criteria';

const CandidateCard = dynamic(()=>import('@/components/create/CandidateCard'), { ssr:false });
const CriteriaCard  = dynamic(()=>import('@/components/create/CriteriaCard'),  { ssr:false });
const TemplateCard  = dynamic(()=>import('@/components/create/TemplateCard'),  { ssr:false });
const PreviewCard   = dynamic(()=>import('@/components/create/PreviewCard'),   { ssr:false });
const SampleSets    = dynamic(()=>import('@/components/create/SampleSets'),    { ssr:false });
const RecentDrafts  = dynamic(()=>import('@/components/create/RecentDrafts'),  { ssr:false });

export default function CreatePage() {
  const [title,setTitle]=useState('');
  const [items,setItems]=useState<{id:string;name:string;description?:string}[]>([
    { id:crypto.randomUUID(), name:'' }
  ]);
  const [criteria,setCriteria]=useState<Criterion[]>([
    { id:crypto.randomUUID(), name:'', type:'likert', weight:3, direction:'asc', scale:{min:1,max:5,step:1,labels:['1','2','3','4','5']} }
  ]);

  // （必要なら）ここでスコア計算
  const result = useMemo(()=>({}), [items,criteria]);

  async function handleSave(isPublic:boolean){
    const res = await fetch('/api/rankings',{
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ title: title || '無題のランキング', items, criteria, result, isPublic })
    });
    const json = await res.json();
    // 下書きを localStorage にも保存（フォールバック用）
    try{
      const arr = JSON.parse(localStorage.getItem('recent-rankings') || '[]');
      arr.unshift({ id: json.id, title: title || '無題のランキング', createdAt: new Date().toISOString() });
      localStorage.setItem('recent-rankings', JSON.stringify(arr.slice(0,6)));
    }catch{}
    location.href = `/r/${json.id}`;
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 左: 入力 */}
      <section className="space-y-6">
        <CandidateCard items={items} onChange={setItems} setTitle={setTitle}/>
        <CriteriaCard criteria={criteria} onChange={setCriteria}/>
        <TemplateCard onApply={setCriteria}/>
        <SampleSets applyItems={setItems} applyCriteria={setCriteria}/>
        <RecentDrafts/>
      </section>

      {/* 右: プレビュー */}
      <aside className="lg:sticky lg:top-6 h-fit">
        <PreviewCard title={title} items={items} criteria={criteria} onSave={handleSave}/>
      </aside>
    </main>
  );
}
