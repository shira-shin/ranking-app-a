export interface RankingItem {
  name: string;
  score: number;
  rank: number;
  reasons?: Record<string, string>;
}
