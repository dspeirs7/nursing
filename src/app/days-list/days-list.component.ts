import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NursingQuery } from '../state/nursing.query';

@Component({
  selector: 'app-days-list',
  templateUrl: './days-list.component.html',
  styleUrls: ['./days-list.component.scss']
})
export class DaysListComponent implements OnInit {
  days$: Observable<string[]>;

  constructor(private nursingQuery: NursingQuery) {}

  ngOnInit(): void {
    this.days$ = this.nursingQuery.days$;
  }
}
