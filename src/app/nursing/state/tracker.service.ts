import { Injectable } from '@angular/core';
import { arrayAdd, applyTransaction, arrayRemove } from '@datorama/akita';
import { TrackerStore } from './tracker.store';
import {
  Side,
  DiaperChange,
  BreastFeeding,
  BottleFeeding
} from './tracker.model';
import * as moment from 'moment';

export const dateFormat = 'YYYY-MM-DD';

@Injectable({ providedIn: 'root' })
export class TrackerService {
  constructor(private trackerStore: TrackerStore) {}

  addDiaperChange(diaperChange: Partial<DiaperChange>) {
    const date = moment(diaperChange.time).format(dateFormat);

    this.trackerStore.upsert(date, nursing => ({
      diaperChanges: arrayAdd(nursing.diaperChanges || [], {
        ...diaperChange,
        id: nursing.diaperChanges?.length || 0
      } as DiaperChange)
    }));
  }

  removeDiaperChange(date: string, id: number) {
    applyTransaction(() => {
      this.trackerStore.update(date, nursing => ({
        diaperChanges: arrayRemove(nursing.diaperChanges, id)
      }));

      this.checkValues(date);
    });
  }

  addBottleFeeding(bottleFeeding: Partial<BottleFeeding>) {
    const date = moment(bottleFeeding.time).format(dateFormat);

    this.trackerStore.upsert(date, nursing => ({
      bottleFeedings: arrayAdd(nursing.bottleFeedings || [], {
        ...bottleFeeding,
        id: nursing.bottleFeedings?.length || 0
      } as BottleFeeding)
    }));
  }

  removeBottleFeeding(date: string, id: number) {
    applyTransaction(() => {
      this.trackerStore.update(date, nursing => ({
        bottleFeedings: arrayRemove(nursing.bottleFeedings, id)
      }));

      this.checkValues(date);
    });
  }

  startBreastFeeding(side: Side) {
    this.trackerStore.updateBreastFeeding({
      side,
      startTime: moment().toISOString(),
      endTime: null
    });
  }

  stopBreastFeeding() {
    const {
      ui: { breastFeeding }
    } = this.trackerStore.getValue();

    applyTransaction(() => {
      if (breastFeeding && breastFeeding.startTime) {
        const newFeeding: BreastFeeding = {
          ...breastFeeding,
          id: 0,
          endTime: moment().toISOString()
        } as BreastFeeding;
        const date = moment(breastFeeding.startTime).format(dateFormat);

        this.trackerStore.upsert(date, nursing => ({
          breastFeedings: arrayAdd(nursing.breastFeedings || [], {
            ...newFeeding,
            id: nursing.breastFeedings?.length || 0
          })
        }));
      }

      this.trackerStore.updateBreastFeeding(null);
    });
  }

  removeBreastFeeding(date: string, id: number) {
    applyTransaction(() => {
      this.trackerStore.update(date, nursing => ({
        breastFeedings: arrayRemove(nursing.breastFeedings, id)
      }));

      this.checkValues(date);
    });
  }

  private checkValues(date: string) {
    const store = this.trackerStore.getValue();

    if (store.entities?.[date]) {
      const nursing = store.entities[date];

      if (
        !nursing.bottleFeedings?.length &&
        !nursing.breastFeedings?.length &&
        !nursing.diaperChanges?.length
      ) {
        this.trackerStore.remove(date);
      }
    }
  }
}
