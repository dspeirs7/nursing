import { Injectable } from '@angular/core';
import { QueryEntity, applyTransaction } from '@datorama/akita';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { map, switchMap, tap, first, take, filter, skip } from 'rxjs/operators';
import { TrackerStore, TrackerState } from './tracker.store';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth/auth.service';
import { Tracker } from './tracker.model';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TrackerQuery extends QueryEntity<TrackerState> {
  days$ = this.selectAll().pipe(map(state => state.map(n => n.id)));
  tracker$ = this.routerQuery
    .selectParams('id')
    .pipe(switchMap(id => this.selectEntity(id)));
  breastFeedings$ = this.tracker$.pipe(map(tracker => tracker.breastFeedings));
  feedingStarted$ = this.select(state => state.ui.breastFeeding).pipe(
    map(feeding => !!feeding)
  );
  bottleFeedings$ = this.tracker$.pipe(map(tracker => tracker.bottleFeedings));
  diaperChanges$ = this.tracker$.pipe(map(tracker => tracker.diaperChanges));
  lastSide$ = this.selectAll().pipe(
    map(state => {
      return state
        .filter(tracker => tracker.breastFeedings?.length)
        .sort((a, b) => b.id.localeCompare(a.id))?.[0]?.breastFeedings[0].side;
    })
  );

  constructor(
    protected store: TrackerStore,
    private routerQuery: RouterQuery,
    private authService: AuthService,
    private firestore: AngularFirestore
  ) {
    super(store);
    this.initializeData();
  }

  initializeData() {
    this.authService
      .getUser()
      .pipe(
        first(user => !!user),
        switchMap(_user => {
          if (!Object.keys(this.getValue().entities || {}).length) {
            return this.firestore
              .doc<{ trackers: Tracker[] }>('nursing/trackers')
              .snapshotChanges()
              .pipe(
                map(changes => {
                  return changes.payload.data().trackers;
                })
              );
          }

          return of(null);
        }),
        take(1)
      )
      .subscribe(trackers => {
        if (trackers) {
          applyTransaction(() => {
            for (const tracker of trackers) {
              this.store.add(tracker);
            }
          });
        }

        this.trackChanges();
      });
  }

  trackChanges() {
    this.selectAll()
      .pipe(skip(1))
      .subscribe(trackers => {
        if (this.authService.userId) {
          this.firestore.doc('nursing/trackers').set({ trackers });
        }
      });
  }
}
