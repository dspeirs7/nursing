import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { map, switchMap } from 'rxjs/operators';
import { NursingStore, NursingState } from './nursing.store';

@Injectable({ providedIn: 'root' })
export class NursingQuery extends QueryEntity<NursingState> {
  days$ = this.selectAll().pipe(map(state => state.map(n => n.id)));
  details$ = this.routerQuery
    .selectParams('id')
    .pipe(switchMap(id => this.selectEntity(id)));
  breastFeedings$ = this.details$.pipe(map(details => details.breastFeedings));
  feedingStarted$ = this.select(state => state.ui.breastFeeding).pipe(
    map(feeding => !!feeding)
  );
  bottleFeedings$ = this.details$.pipe(map(details => details.bottleFeedings));
  diaperChanges$ = this.details$.pipe(map(details => details.diaperChanges));
  lastSide$ = this.selectAll().pipe(
    map(state => {
      return state
        .filter(details => details.breastFeedings?.length)
        .sort((a, b) => b.id.localeCompare(a.id))?.[0]?.breastFeedings[0].side;
    })
  );

  constructor(protected store: NursingStore, private routerQuery: RouterQuery) {
    super(store);
  }
}
