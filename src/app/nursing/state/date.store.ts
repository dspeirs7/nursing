import { Injectable } from '@angular/core';
import { Date } from './date.model';
import { EntityState, ActiveState, EntityStore, StoreConfig } from '@datorama/akita';

export interface DateState extends EntityState<Date, string>, ActiveState<string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'date' })
export class DateStore extends EntityStore<DateState> {

  constructor() {
    super();
  }

}

