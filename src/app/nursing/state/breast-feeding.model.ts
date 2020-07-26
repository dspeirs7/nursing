export interface BreastFeeding {
  id: number | string;
  date: string;
  side: Side;
  startTime: string;
  endTime: string;
}

export type Side = 'left' | 'right';

export function createBreastFeeding(params: Partial<BreastFeeding>) {
  return {
    ...params
  } as BreastFeeding;
}
