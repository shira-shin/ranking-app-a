'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Criterion } from '@/types/criteria';
import CandidateCard from '@/components/create/CandidateCard';
import CriteriaCard from '@/components/create/CriteriaCard';
import PreviewCard from '@/components/create/PreviewCard';
import TemplateCard from '@/components/create/TemplateCard';

export default function CreatePage() {
  const [title, setTitle] = useState('');
  const [items, setItems] = useState<{id:string;name:string;description?:string}[]>([{id:crypto.randomUUID(),name:''}]);
  const [criteria, setCriteria] = useState<Criterion[]>([{
    id: crypto.randomUUID(), name: '', type:'likert', weight:3, direction:'asc',
    scale:{min:1,max:5,step:1,labels:['1','2','3','4','5']}
  }]);

  function onReorder(kind:'items'|'criteria', activeId:string, overId:string) {
    const list = kind==='items'?items:criteria;
    const idxA = list.findIndex(x=>x.id===activeId);
    const idxB = list.findIndex(x=>x.id===overId);
    if (idxA<0 || idxB<0) return;
    const moved = [...list];
    const [removed] = moved.splice(idxA,1);
    moved.splice(idxB,0,removed);
    kind==='items'? setItems(moved as any) : setCriteria(moved as any);
  }

  const result = useMemo(()=>({}), [items, criteria]);

  async function handleSave(isPublic:boolean) {
    const res = await fetch('/api/rankings', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ title: title || '無題のランキング', items, criteria, result, isPublic })
    });
    const { id } = await res.json();
    location.href = `/r/${id}`;
  }

  return (
    <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 py-6">
      <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="space-y-6">
        <CandidateCard items={items} onChange={setItems} onReorder={(a,b)=>onReorder('items',a,b)} setTitle={setTitle} />
        <CriteriaCard criteria={criteria} onChange={setCriteria} onReorder={(a,b)=>onReorder('criteria',a,b)} />
        <TemplateCard onApply={(tpl)=>setCriteria(tpl)} />
      </motion.div>

      <motion.aside initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="lg:sticky lg:top-6 h-fit">
        <PreviewCard title={title} items={items} criteria={criteria} onSave={handleSave} />
      </motion.aside>
    </div>
  );
}
