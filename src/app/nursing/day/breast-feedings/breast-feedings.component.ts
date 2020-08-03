import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreastFeedingService } from '../../state/breast-feeding.service';
import { BreastFeedingQuery } from '../../state/breast-feeding.query';
import { BreastFeeding } from '../../state/breast-feeding.model';

@Component({
  selector: 'app-breast-feedings',
  templateUrl: './breast-feedings.component.html',
  styleUrls: ['./breast-feedings.component.scss']
})
export class BreastFeedingsComponent implements OnInit {
  @Input() date: string;
  breastFeedings$: Observable<BreastFeeding[]>;

  constructor(
    private breastFeedingService: BreastFeedingService,
    private breastFeedingQuery: BreastFeedingQuery
  ) {}

  ngOnInit(): void {
    this.breastFeedings$ = this.breastFeedingQuery
      .selectAll()
      .pipe(
        map(breastFeedings =>
          breastFeedings
            .filter(breastFeeding => breastFeeding.date === this.date)
            .sort(
              (a, b) =>
                new Date(a.endTime).getTime() - new Date(b.endTime).getTime()
            )
        )
      );
  }

  removeBreastFeeding(id: string) {
    this.breastFeedingService.remove(id);
  }
}
