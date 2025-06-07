import { Plus, X } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  candidates: string[];
  setCandidates: Dispatch<SetStateAction<string[]>>;
}

export default function CandidateInputs({ candidates, setCandidates }: Props) {
  const update = (value: string, idx: number) => {
    const list = [...candidates];
    list[idx] = value;
    setCandidates(list);
  };
  const add = () => setCandidates([...candidates, '']);
  const remove = (idx: number) =>
    setCandidates(candidates.filter((_, i) => i !== idx));

  return (
    <div className="space-y-2">
      {candidates.map((c, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            className="flex-1 p-2 border rounded"
            placeholder="Item"
            value={c}
            onChange={(e) => update(e.target.value, i)}
          />
          {candidates.length > 1 && (
            <button
              type="button"
              onClick={() => remove(i)}
              className="p-2 text-red-500"
            >
              <X size={18} />
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={add} className="flex items-center gap-1 text-sm text-blue-600">
        <Plus size={16} />
        Add
      </button>
    </div>
  );
}
