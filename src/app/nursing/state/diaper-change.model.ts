export interface DiaperChange {
  id: number | string;
  date: string;
  time: string;
  pee: boolean;
  poo: boolean;
}

export function createDiaperChange(params: Partial<DiaperChange>) {
  return {
    ...params
  } as DiaperChange;
}
