import { Injectable } from '@angular/core';
import { DiaperChangeStore, DiaperChangeState } from './diaper-change.store';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { DiaperChange } from './diaper-change.model';
import { DateService } from './date.service';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'diaper-changes' })
export class DiaperChangeService extends CollectionService<DiaperChangeState> {
  constructor(store: DiaperChangeStore, private dateService: DateService) {
    super(store);
  }

  onCreate(diaperChange: DiaperChange) {
    this.dateService.upsertDate(diaperChange.date);
  }
}
