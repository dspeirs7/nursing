import { Component, Input, OnInit } from '@angular/core';
import { DiaperChangeService } from '../../state/diaper-change.service';
import { DiaperChangeQuery } from '../../state/diaper-change.query';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DiaperChange } from '../../state/diaper-change.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-diaper-changes',
  templateUrl: './diaper-changes.component.html',
  styleUrls: ['./diaper-changes.component.scss']
})
export class DiaperChangesComponent implements OnInit {
  @Input() date: string;
  diaperChanges$: Observable<DiaperChange[]>;

  constructor(
    private diaperChangeService: DiaperChangeService,
    private diaperChangeQuery: DiaperChangeQuery
  ) {}

  ngOnInit(): void {
    this.diaperChangeService
      .syncCollection(ref => ref.where('date', '==', this.date))
      .pipe(untilDestroyed(this))
      .subscribe();

    this.diaperChanges$ = this.diaperChangeQuery
      .selectAll()
      .pipe(
        map(diaperChanges =>
          diaperChanges.filter(diaperChange => diaperChange.date === this.date)
        )
      );
  }

  removeDiaperChange(id: string) {
    this.diaperChangeService.remove(id);
  }
}
