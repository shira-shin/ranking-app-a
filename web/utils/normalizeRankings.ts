import { RankingItem } from '../types';

export function normalizeRankings(data: any): RankingItem[] {
  let arr: any[] = [];
  if (Array.isArray(data)) {
    if (data.length === 1 && (data[0] as any)?.rankings) {
      arr = (data[0] as any).rankings;
    } else {
      arr = data;
    }
  } else if (Array.isArray(data?.results)) {
    arr = data.results;
  } else if (Array.isArray(data?.rankings)) {
    arr = data.rankings;
  } else if (data?.results || data?.rankings) {
    arr = [data.results ?? data.rankings];
  } else {
    arr = [data];
  }
  return (arr as RankingItem[]).sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0));
}
