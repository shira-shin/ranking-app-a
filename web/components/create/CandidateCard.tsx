'use client';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { Draggable } from './Draggable';

export default function CandidateCard({ items, onChange, onReorder, setTitle }:{
  items:{id:string;name:string;description?:string}[];
  onChange:(v:any)=>void; onReorder:(activeId:string, overId:string)=>void;
  setTitle:(t:string)=>void;
}) {
  function add() { onChange([...items, { id:crypto.randomUUID(), name:'' }]); }
  function update(id:string, patch:any){ onChange(items.map(i=>i.id===id?{...i,...patch}:i)); }
  function remove(id:string){ onChange(items.filter(i=>i.id!==id)); }

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-md p-4">
      <input placeholder="タイトル（例: 東京ラーメン総合）"
        onChange={e=>setTitle(e.target.value)} className="w-full rounded-xl border px-3 py-2 mb-3"/>
      <h3 className="font-bold">比較候補</h3>
      <DndContext collisionDetection={closestCenter} onDragEnd={({active, over})=>{
        if(over && active.id!==over.id) onReorder(active.id as string, over.id as string);
      }}>
        <SortableContext items={items.map(i=>i.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3 mt-3">
            {items.map(i=>(
              <Draggable id={i.id} key={i.id}>
                <div className="rounded-xl border p-3 bg-slate-50">
                  <input className="w-full rounded-lg border px-3 py-2 mb-2" placeholder="候補名"
                    value={i.name} onChange={e=>update(i.id,{name:e.target.value})}/>
                  <textarea className="w-full rounded-lg border px-3 py-2 text-sm" rows={2}
                    placeholder="説明（任意）" value={i.description||''}
                    onChange={e=>update(i.id,{description:e.target.value})}/>
                  <div className="text-right mt-2">
                    <button onClick={()=>remove(i.id)} className="text-rose-500 text-sm">削除</button>
                  </div>
                </div>
              </Draggable>
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <button onClick={add} className="mt-3 text-indigo-600">+ 追加</button>
    </div>
  );
}
