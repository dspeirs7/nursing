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

    this.add({
      date: date.format(DATE_FORMAT),
      side,
      startTime: date.toISOString(),
      endTime: null
    });
  }

  stopBreastFeeding(breastFeeding: BreastFeeding) {
    if (breastFeeding && breastFeeding.id) {
      this.update({ ...breastFeeding, endTime: moment().toISOString() });
    }
  }
}
