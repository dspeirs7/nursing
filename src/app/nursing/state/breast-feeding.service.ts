import { Injectable } from '@angular/core';
import { BreastFeedingStore, BreastFeedingState } from './breast-feeding.store';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { Side, BreastFeeding } from './breast-feeding.model';
import * as moment from 'moment';
import { DATE_FORMAT } from 'src/app/utils/constants';
import { DateService } from './date.service';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'breast-feedings' })
export class BreastFeedingService extends CollectionService<
  BreastFeedingState
> {
  constructor(store: BreastFeedingStore, private dateService: DateService) {
    super(store);
  }

  onCreate(breastFeeding: BreastFeeding) {
    this.dateService.upsertDate(breastFeeding.date);
  }

  startBreastFeeding(side: Side) {
    const date = moment();
    this.store.update(state => ({
      ui: {
        ...state.ui,
        breastFeeding: {
          date: date.format(DATE_FORMAT),
          side,
          startTime: date.toISOString(),
          endTime: null
        }
      }
    }));
  }

  stopBreastFeeding() {
    const {
      ui: { breastFeeding }
    } = this.store.getValue();

    if (breastFeeding && breastFeeding.startTime) {
      const newFeeding: BreastFeeding = {
        ...breastFeeding,
        endTime: moment().toISOString()
      } as BreastFeeding;

      this.add(newFeeding);

      this.store.update(state => ({
        ui: { ...state.ui, breastFeeding: null }
      }));
    }
  }
}
