import { Injectable } from '@angular/core';
import { DateStore, DateState } from './date.store';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { Date } from './date.model';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'dates' })
export class DateService extends CollectionService<DateState> {
  constructor(store: DateStore) {
    super(store);
  }

  upsertDate(date: string) {
    this.db
      .collection(this.path.toString(), ref => ref.where('date', '==', date))
      .get()
      .subscribe(value => {
        if (value.empty) {
          this.add({ date } as Date);
        }
      });
  }
}
