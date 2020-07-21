import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Tracker } from '../state/tracker.model';
import { TrackerQuery } from '../state/tracker.query';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {
  date: string;
  tracker$: Observable<Tracker>;

  constructor(private query: TrackerQuery, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.tracker$ = this.query.tracker$;

    this.route.paramMap.subscribe(params => {
      this.date = params.get('id');
    });
  }
}
