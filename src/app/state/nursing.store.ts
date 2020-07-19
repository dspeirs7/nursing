import { Injectable } from '@angular/core';
import { Nursing, BreastFeeding } from './nursing.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface NursingState extends EntityState<Nursing> {
  ui: {
    breastFeeding: Partial<BreastFeeding>;
  };
}

const initialState = {
  ui: { breastFeeding: null }
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'nursing' })
export class NursingStore extends EntityStore<NursingState> {
  constructor() {
    super(initialState);
  }

  updateBreastFeeding(breastFeeding: Partial<BreastFeeding>) {
    this.update({ ui: { breastFeeding } });
  }
}
