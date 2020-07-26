import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { BottleFeedingStore, BottleFeedingState } from './bottle-feeding.store';

@Injectable({ providedIn: 'root' })
export class BottleFeedingQuery extends QueryEntity<BottleFeedingState> {
  constructor(protected store: BottleFeedingStore) {
    super(store);
  }
}
