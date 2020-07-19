import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NursingQuery } from '../state/nursing.query';
import { Nursing } from '../state/nursing.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {
  date: string;
  details$: Observable<Nursing>;

  constructor(
    private nursingQuery: NursingQuery,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.details$ = this.nursingQuery.details$;

    this.route.paramMap.subscribe(params => {
      this.date = params.get('id');
    });
  }
}
