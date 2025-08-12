'use client';
import { useEffect, useState } from 'react';
import { Criterion } from '@/types/criteria';
import CriteriaCard from '@/components/create/CriteriaCard';

export default function ProfilePage(){
  const [me,setMe]=useState<any>(null);
  const [criteria,setCriteria]=useState<Criterion[]>([]);

  useEffect(()=>{ (async ()=>{
    const r=await fetch('/api/me'); if(!r.ok) return;
    const data=await r.json(); setMe(data);
    if(data?.defaultCriteria) setCriteria(data.defaultCriteria);
  })(); },[]);

  async function save(){
    await fetch('/api/me',{ method:'PUT', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ ...me, defaultCriteria: criteria })
    });
    alert('保存しました');
  }

  if(!me) return null;
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 space-y-6">
      <div className="rounded-2xl bg-white border border-slate-200 shadow-md p-4">
        <h3 className="font-bold mb-3">プロフィール</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <input className="rounded border px-3 py-2" placeholder="名前" value={me.name||''} onChange={e=>setMe({...me,name:e.target.value})}/>
          <input className="rounded border px-3 py-2" placeholder="ハンドル(@)" value={me.handle||''} onChange={e=>setMe({...me,handle:e.target.value})}/>
          <input className="md:col-span-2 rounded border px-3 py-2" placeholder="画像URL" value={me.image||''} onChange={e=>setMe({...me,image:e.target.value})}/>
          <textarea className="md:col-span-2 rounded border px-3 py-2" rows={3} placeholder="自己紹介" value={me.bio||''} onChange={e=>setMe({...me,bio:e.target.value})}/>
        </div>
      </div>

      <CriteriaCard criteria={criteria} onChange={setCriteria} onReorder={()=>{}} />

      <div className="text-right">
        <button onClick={save} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl px-6 py-3 shadow-lg">保存</button>
      </div>
    </div>
  );
}
