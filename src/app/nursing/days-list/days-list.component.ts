import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrackerQuery } from '../state/tracker.query';

@Component({
  selector: 'app-days-list',
  templateUrl: './days-list.component.html',
  styleUrls: ['./days-list.component.scss']
})
export class DaysListComponent implements OnInit {
  days$: Observable<string[]>;

  constructor(private query: TrackerQuery) {}

  ngOnInit(): void {
    this.days$ = this.query.days$;
  }
}
