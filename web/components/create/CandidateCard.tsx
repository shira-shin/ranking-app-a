'use client';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import Draggable from './Draggable';

type Item = { id:string; name:string; description?:string };

export default function CandidateCard({
  items, onChange, setTitle,
}:{
  items: Item[];
  onChange: (v: Item[]) => void;
  setTitle: (t: string) => void;
}) {
  function add() { onChange([...items, { id: crypto.randomUUID(), name: '' }]); }
  function patch(id: string, p: Partial<Item>) { onChange(items.map(x => x.id===id? { ...x, ...p } : x)); }
  function remove(id: string) { onChange(items.filter(x => x.id !== id)); }
  function onDragEnd({active, over}: any){
    if(over && active.id!==over.id){
      const oldIndex=items.findIndex(i=>i.id===active.id);
      const newIndex=items.findIndex(i=>i.id===over.id);
      if(oldIndex>=0 && newIndex>=0) onChange(arrayMove(items, oldIndex, newIndex));
    }
  }

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-md p-4">
      <input className="w-full rounded-xl border px-3 py-2 mb-3" placeholder="タイトル（例：東京ラーメン総合）" onChange={e=>setTitle(e.target.value)} />
      <h3 className="font-bold">比較候補</h3>
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={items.map(i=>i.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3 mt-3">
            {items.map(i=>(
              <Draggable id={i.id} key={i.id}>
                <div className="rounded-xl border p-3 bg-slate-50">
                  <input className="w-full rounded-lg border px-3 py-2 mb-2" placeholder="候補名" value={i.name} onChange={e=>patch(i.id, { name: e.target.value })}/>
                  <textarea className="w-full rounded-lg border px-3 py-2 text-sm" rows={2} placeholder="説明（任意）" value={i.description||''} onChange={e=>patch(i.id, { description: e.target.value })}/>
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
