import { Injectable } from '@angular/core';
import { BottleFeedingStore, BottleFeedingState } from './bottle-feeding.store';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { BottleFeeding } from './bottle-feeding.model';
import { DateService } from './date.service';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'bottle-feedings' })
export class BottleFeedingService extends CollectionService<
  BottleFeedingState
> {
  constructor(store: BottleFeedingStore, private dateService: DateService) {
    super(store);
  }

  onCreate(bottleFeeding: BottleFeeding) {
    this.dateService.upsertDate(bottleFeeding.date);
  }
}
