import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { BreastFeedingStore, BreastFeedingState } from './breast-feeding.store';

@Injectable({ providedIn: 'root' })
export class BreastFeedingQuery extends QueryEntity<BreastFeedingState> {
  feedingStarted$ = this.select(state => !!state.ui.breastFeeding);
  lastSide$ = this.select(state => state.ui.lastSide);

  constructor(protected store: BreastFeedingStore) {
    super(store);
  }
}
