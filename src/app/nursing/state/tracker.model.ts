export interface Tracker {
  id: string;
  breastFeedings: BreastFeeding[];
  bottleFeedings: BottleFeeding[];
  diaperChanges: DiaperChange[];
}

export interface BreastFeeding {
  id: number;
  side: Side;
  startTime: string;
  endTime: string;
}

export interface BottleFeeding {
  id: number;
  time: string;
  amount: number;
}

export interface DiaperChange {
  id: number;
  time: string;
  pee: boolean;
  poo: boolean;
}

export type Side = 'left' | 'right';

export function createTracker(params: Partial<Tracker>) {
  return {
    id: params.id,
    bottleFeedings: params.bottleFeedings || [],
    breastFeedings: params.breastFeedings || [],
    diaperChanges: params.diaperChanges || []
  } as Tracker;
}
