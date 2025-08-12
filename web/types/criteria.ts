export type CriterionType = 'number' | 'likert' | 'boolean' | 'text';
export type Criterion = {
  id: string;
  name: string;
  description?: string;
  type: CriterionType;
  weight: number;          // 1..10
  direction: 'asc' | 'desc';
  scale?: { min: number; max: number; step?: number; labels?: string[] }; // likert等
};
