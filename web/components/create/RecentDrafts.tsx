'use client';
import { useEffect, useState } from 'react';

export default function RecentDrafts(){
  const [rows,setRows]=useState<any[]>([]);
  useEffect(()=>{
    (async ()=>{
      // もし /api/rankings?me=true が実装済みならそれを使用
      const r = await fetch('/api/rankings?me=true&limit=6');
      if(r.ok){ setRows(await r.json()); return; }
      // フォールバック：localStorage
      const raw = localStorage.getItem('recent-rankings');
      if(raw) setRows(JSON.parse(raw));
    })();
  },[]);
  if(!rows.length) return null;

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-md p-4">
      <h3 className="font-bold mb-2">最近の下書き</h3>
      <div className="grid md:grid-cols-2 gap-3">
        {rows.map((x:any)=>(
          <a key={x.id} href={`/r/${x.id}`} className="rounded-xl border p-3 bg-slate-50 hover:shadow">
            <div className="font-medium">{x.title}</div>
            <div className="text-xs text-slate-500 mt-1">{new Date(x.createdAt).toLocaleString()}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
