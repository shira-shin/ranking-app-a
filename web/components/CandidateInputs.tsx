import { Plus, X } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { useTranslations } from 'next-intl';

interface Props {
  candidates: string[];
  setCandidates: Dispatch<SetStateAction<string[]>>;
}

export default function CandidateInputs({ candidates, setCandidates }: Props) {
  const t = useTranslations();

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
            className="flex-1 p-2 border rounded-md bg-gray-50"
            placeholder={t('itemPlaceholder')}
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
      <button
        type="button"
        onClick={add}
        className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
      >
        <Plus size={16} />
        {t('addItem')}
      </button>
    </div>
  );
}
