export const isPlaceholder = (value?: string): boolean =>
  typeof value === 'string' && /^(your_|prod_)/.test(value);
