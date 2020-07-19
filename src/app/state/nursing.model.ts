import * as moment from 'moment';

export interface Nursing {
  id: string;
  breastFeedings: BreastFeeding[];
  bottleFeedings: BottleFeeding[];
  diaperChanges: DiaperChange[];
}

export interface BreastFeeding {
  id: number;
  side: Side;
  startTime: moment.Moment;
  endTime: moment.Moment;
}

export interface BottleFeeding {
  id: number;
  time: moment.Moment;
  amount: number;
}

export interface DiaperChange {
  id: number;
  time: moment.Moment;
  pee: boolean;
  poo: boolean;
}

export type Side = 'left' | 'right';

export function createNursing(params: Partial<Nursing>) {
  return {} as Nursing;
}
