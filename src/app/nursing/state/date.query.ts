import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { DateStore, DateState } from './date.store';

@Injectable({ providedIn: 'root' })
export class DateQuery extends QueryEntity<DateState> {

  constructor(protected store: DateStore) {
    super(store);
  }

}
