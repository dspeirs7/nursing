export interface BottleFeeding {
  id: number | string;
  date: string;
  time: string;
  amount: {
    oz: number;
    ml: number;
  };
}

export function createBottleFeeding(params: Partial<BottleFeeding>) {
  return {
    ...params
  } as BottleFeeding;
}
