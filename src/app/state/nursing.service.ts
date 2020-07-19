import { Injectable } from '@angular/core';
import { arrayAdd, applyTransaction, arrayRemove } from '@datorama/akita';
import { NursingStore } from './nursing.store';
import {
  Side,
  DiaperChange,
  BreastFeeding,
  BottleFeeding
} from './nursing.model';
import * as moment from 'moment';

export const dateFormat = 'YYYY-MM-DD';

@Injectable({ providedIn: 'root' })
export class NursingService {
  constructor(private nursingStore: NursingStore) {}

  addDiaperChange(diaperChange: Partial<DiaperChange>) {
    const date = moment(diaperChange.time).format(dateFormat);

    this.nursingStore.upsert(date, nursing => ({
      diaperChanges: arrayAdd(nursing.diaperChanges || [], {
        ...diaperChange,
        id: nursing.diaperChanges?.length || 0
      } as DiaperChange)
    }));
  }

  removeDiaperChange(date: string, id: number) {
    this.nursingStore.update(date, nursing => ({
      diaperChanges: arrayRemove(nursing.diaperChanges, id)
    }));

    this.checkValues(date);
  }

  addBottleFeeding(bottleFeeding: Partial<BottleFeeding>) {
    const date = moment(bottleFeeding.time).format(dateFormat);

    this.nursingStore.upsert(date, nursing => ({
      bottleFeedings: arrayAdd(nursing.bottleFeedings || [], {
        ...bottleFeeding,
        id: nursing.bottleFeedings?.length || 0
      } as BottleFeeding)
    }));
  }

  removeBottleFeeding(date: string, id: number) {
    this.nursingStore.update(date, nursing => ({
      bottleFeedings: arrayRemove(nursing.bottleFeedings, id)
    }));

    this.checkValues(date);
  }

  startBreastFeeding(side: Side) {
    this.nursingStore.updateBreastFeeding({
      side,
      startTime: moment(),
      endTime: null
    });
  }

  stopBreastFeeding() {
    const {
      ui: { breastFeeding }
    } = this.nursingStore.getValue();

    applyTransaction(() => {
      if (breastFeeding && breastFeeding.startTime) {
        const newFeeding: BreastFeeding = {
          ...breastFeeding,
          id: 0,
          endTime: moment()
        } as BreastFeeding;
        const date = moment(breastFeeding.startTime).format(dateFormat);

        this.nursingStore.upsert(date, nursing => ({
          breastFeedings: arrayAdd(nursing.breastFeedings || [], {
            ...newFeeding,
            id: nursing.breastFeedings?.length || 0
          })
        }));
      }

      this.nursingStore.updateBreastFeeding(null);
    });
  }

  removeBreastFeeding(date: string, id: number) {
    this.nursingStore.update(date, nursing => ({
      breastFeedings: arrayRemove(nursing.breastFeedings, id)
    }));

    this.checkValues(date);
  }

  private checkValues(date: string) {
    const store = this.nursingStore.getValue();

    if (store.entities?.[date]) {
      const nursing = store.entities[date];

      if (
        !nursing.bottleFeedings?.length &&
        !nursing.breastFeedings?.length &&
        !nursing.diaperChanges?.length
      ) {
        this.nursingStore.remove(date);
      }
    }
  }
}
