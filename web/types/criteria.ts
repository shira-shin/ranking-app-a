export type CriterionType = 'number' | 'likert' | 'boolean' | 'text';

export type Criterion = {
  id: string;
  name: string;
  description?: string;
  type: CriterionType;
  weight: number;              // 1..10
  direction: 'asc' | 'desc';   // 高いほど良い / 低いほど良い
  scale?: {                    // likert/number 用
    min: number;
    max: number;
    step?: number;
    labels?: string[];         // ラベル（Likertなど）
  };
};
