import { Injectable } from '@angular/core';
import { Tracker, BreastFeeding } from './tracker.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { AngularFirestore } from '@angular/fire/firestore';

export interface TrackerState extends EntityState<Tracker> {
  ui: {
    breastFeeding: Partial<BreastFeeding>;
  };
}

const initialState = {
  ui: { breastFeeding: null }
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'nursing' })
export class TrackerStore extends EntityStore<TrackerState> {
  constructor() {
    super(initialState);
  }

  updateBreastFeeding(breastFeeding: Partial<BreastFeeding>) {
    this.update({ ui: { breastFeeding } });
  }
}
