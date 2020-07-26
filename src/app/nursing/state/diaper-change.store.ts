import { Injectable } from '@angular/core';
import { DiaperChange } from './diaper-change.model';
import { EntityState, ActiveState, EntityStore, StoreConfig } from '@datorama/akita';

export interface DiaperChangeState extends EntityState<DiaperChange, string>, ActiveState<string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'diaper-change' })
export class DiaperChangeStore extends EntityStore<DiaperChangeState> {

  constructor() {
    super();
  }

}

