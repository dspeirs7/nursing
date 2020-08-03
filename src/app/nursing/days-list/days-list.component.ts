import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DateService } from '../state/date.service';
import { DateQuery } from '../state/date.query';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Date } from '../state/date.model';
import { finalize, map } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-days-list',
  templateUrl: './days-list.component.html',
  styleUrls: ['./days-list.component.scss']
})
export class DaysListComponent implements OnInit {
  days$: Observable<Date[]>;

  constructor(private dateQuery: DateQuery, private dateService: DateService) {}

  ngOnInit(): void {
    this.dateService
      .syncCollection()
      .pipe(
        untilDestroyed(this),
        finalize(() => console.log('destroyed'))
      )
      .subscribe();
    this.days$ = this.dateQuery
      .selectAll()
      .pipe(
        map(days =>
          days.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
        )
      );
  }
}
