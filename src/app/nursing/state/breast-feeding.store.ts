import { Injectable } from '@angular/core';
import { BreastFeeding } from './breast-feeding.model';
import {
  EntityState,
  ActiveState,
  EntityStore,
  StoreConfig
} from '@datorama/akita';
import { Side } from './breast-feeding.model';

export interface BreastFeedingState
  extends EntityState<BreastFeeding, string>,
    ActiveState<string> {
  ui: {
    lastSide: Side;
    breastFeeding: Partial<BreastFeeding>;
  };
}

const initialState: BreastFeedingState = {
  active: null,
  ui: {
    lastSide: null,
    breastFeeding: null
  }
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'breast-feeding' })
export class BreastFeedingStore extends EntityStore<BreastFeedingState> {
  constructor() {
    super(initialState);
  }
}
