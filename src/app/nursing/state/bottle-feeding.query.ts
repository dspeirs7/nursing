import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { BottleFeedingStore, BottleFeedingState } from './bottle-feeding.store';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BottleFeedingQuery extends QueryEntity<BottleFeedingState> {
  day$ = this.routerQuery.selectParams().pipe();

  constructor(
    protected store: BottleFeedingStore,
    private routerQuery: RouterQuery
  ) {
    super(store);
  }
}
