export interface BottleFeeding {
  id: number | string;
  date: string;
  time: string;
  amount: number;
}

export function createBottleFeeding(params: Partial<BottleFeeding>) {
  return {
    ...params
  } as BottleFeeding;
}
