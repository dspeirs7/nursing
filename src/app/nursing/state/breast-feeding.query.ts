import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { BreastFeedingStore, BreastFeedingState } from './breast-feeding.store';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BreastFeedingQuery extends QueryEntity<BreastFeedingState> {
  feedingStarted$ = this.selectAll().pipe(
    map(breastFeedings =>
      breastFeedings.find(breastFeeding => breastFeeding.endTime === null)
    )
  );
  lastSide$ = this.selectAll().pipe(
    map(
      breastFeedings =>
        (breastFeedings || []).sort(
          (a, b) =>
            new Date(b.endTime).getTime() - new Date(a.endTime).getTime()
        )?.[0].side
    )
  );

  constructor(protected store: BreastFeedingStore) {
    super(store);
  }
}
