import { Injectable } from '@angular/core';
import { BottleFeeding } from './bottle-feeding.model';
import { EntityState, ActiveState, EntityStore, StoreConfig } from '@datorama/akita';

export interface BottleFeedingState extends EntityState<BottleFeeding, string>, ActiveState<string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'bottle-feeding' })
export class BottleFeedingStore extends EntityStore<BottleFeedingState> {

  constructor() {
    super();
  }

}

