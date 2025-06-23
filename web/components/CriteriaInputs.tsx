import { Plus, X } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { useTranslations } from 'next-intl';

export interface Criterion {
  name: string;
  weight: number;
}

interface Props {
  criteria: Criterion[];
  setCriteria: Dispatch<SetStateAction<Criterion[]>>;
}

export default function CriteriaInputs({ criteria, setCriteria }: Props) {
  const t = useTranslations();

  const update = (idx: number, field: keyof Criterion, value: string | number) => {
    const list = [...criteria];
    (list[idx] as any)[field] = field === 'weight' ? Number(value) : value;
    setCriteria(list);
  };
  const add = () => setCriteria([...criteria, { name: '', weight: 3 }]);
  const remove = (idx: number) => setCriteria(criteria.filter((_, i) => i !== idx));

  return (
    <div className="space-y-2">
      {criteria.map((c, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            className="flex-1 p-2 border rounded-md bg-gray-50"
            placeholder={t('criterionPlaceholder')}
            value={c.name}
            onChange={(e) => update(i, 'name', e.target.value)}
          />
          <div className="flex items-center gap-1">
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              value={c.weight}
              onChange={(e) => update(i, 'weight', e.target.value)}
            />
            <span className="text-sm w-5 text-center">{c.weight}</span>
          </div>
          {criteria.length > 1 && (
            <button type="button" onClick={() => remove(i)} className="p-2 text-red-500">
              <X size={18} />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
      >
        <Plus size={16} />
        {t('addCriterion')}
      </button>
    </div>
  );
}
