'use client';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function Draggable({ id, children }:{id:string; children:any}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style:any = { transform: CSS.Transform.toString(transform), transition };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}
export default Draggable;
