'use client';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { Draggable } from './Draggable';
import type { Criterion } from '@/types/criteria';

export default function CriteriaCard({ criteria, onChange, onReorder }:{
  criteria: Criterion[]; onChange:(v:Criterion[])=>void;
  onReorder:(activeId:string, overId:string)=>void;
}) {
  function add(){
    onChange([...criteria, {
      id: crypto.randomUUID(), name:'', description:'',
      type:'likert', weight:3, direction:'asc',
      scale:{min:1,max:5,step:1,labels:['1','2','3','4','5']}
    }]);
  }
  function update(id:string, patch:Partial<Criterion>){
    onChange(criteria.map(c=>c.id===id?{...c,...patch}:c));
  }
  function remove(id:string){ onChange(criteria.filter(c=>c.id!==id)); }

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-md p-4">
      <h3 className="font-bold">評価基準</h3>
      <DndContext collisionDetection={closestCenter} onDragEnd={({active, over})=>{
        if(over && active.id!==over.id) onReorder(active.id as string, over.id as string);
      }}>
        <SortableContext items={criteria.map(c=>c.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3 mt-3">
            {criteria.map(c=>(
              <Draggable id={c.id} key={c.id}>
                <details className="rounded-xl border p-3 bg-slate-50" open>
                  <summary className="font-medium cursor-pointer">{c.name || '（未入力）'}</summary>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    <input className="rounded-lg border px-3 py-2" placeholder="基準名"
                      value={c.name} onChange={e=>update(c.id,{name:e.target.value})}/>
                    <select className="rounded-lg border px-3 py-2"
                      value={c.type} onChange={e=>update(c.id,{type: e.target.value as any})}>
                      <option value="likert">Likert(1-5)</option>
                      <option value="number">数値</option>
                      <option value="boolean">Yes/No</option>
                      <option value="text">テキスト</option>
                    </select>
                    <textarea className="md:col-span-2 rounded-lg border px-3 py-2" rows={2}
                      placeholder="説明" value={c.description||''}
                      onChange={e=>update(c.id,{description:e.target.value})}/>
                    <div className="rounded-lg border p-2">
                      <label className="text-sm text-slate-600">重み</label>
                      <input type="range" min={1} max={10} value={c.weight}
                        onChange={e=>update(c.id,{weight:Number(e.target.value)})} className="w-full"/>
                      <div className="text-right text-sm">{c.weight}</div>
                    </div>
                    <div className="rounded-lg border p-2">
                      <label className="text-sm text-slate-600">方向</label>
                      <select value={c.direction}
                        onChange={e=>update(c.id,{direction:e.target.value as any})} className="w-full rounded px-2 py-1 border">
                        <option value="asc">高いほど良い</option>
                        <option value="desc">低いほど良い</option>
                      </select>
                    </div>
                    <div className="md:col-span-2 grid grid-cols-3 gap-2">
                      <input className="rounded border px-2 py-1" type="number" step="0.1"
                        value={c.scale?.min ?? 1} onChange={e=>update(c.id,{scale:{...c.scale, min:Number(e.target.value)}})} placeholder="最小"/>
                      <input className="rounded border px-2 py-1" type="number" step="0.1"
                        value={c.scale?.max ?? 5} onChange={e=>update(c.id,{scale:{...c.scale, max:Number(e.target.value)}})} placeholder="最大"/>
                      <input className="rounded border px-2 py-1" type="number" step="0.1"
                        value={c.scale?.step ?? 1} onChange={e=>update(c.id,{scale:{...c.scale, step:Number(e.target.value)}})} placeholder="刻み"/>
                    </div>
                    <input className="md:col-span-2 rounded border px-2 py-1" placeholder="ラベル（カンマ区切り）"
                      value={c.scale?.labels?.join(',') || ''} onChange={e=>update(c.id,{scale:{...c.scale, labels: e.target.value.split(',').map(s=>s.trim()).filter(Boolean)}})} />
                  </div>
                  <div className="text-right mt-3">
                    <button onClick={()=>remove(c.id)} className="text-rose-500 text-sm">削除</button>
                  </div>
                </details>
              </Draggable>
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <button onClick={add} className="mt-3 text-indigo-600">+ 追加</button>
    </div>
  );
}
