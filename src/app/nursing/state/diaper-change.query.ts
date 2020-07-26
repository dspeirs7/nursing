import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { DiaperChangeStore, DiaperChangeState } from './diaper-change.store';

@Injectable({ providedIn: 'root' })
export class DiaperChangeQuery extends QueryEntity<DiaperChangeState> {

  constructor(protected store: DiaperChangeStore) {
    super(store);
  }

}
