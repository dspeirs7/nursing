import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreastFeedingService } from '../../state/breast-feeding.service';
import { BreastFeedingQuery } from '../../state/breast-feeding.query';
import { BreastFeeding } from '../../state/breast-feeding.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
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
    this.breastFeedingService
      .syncCollection(ref => ref.where('date', '==', this.date))
      .pipe(untilDestroyed(this))
      .subscribe();

    this.breastFeedings$ = this.breastFeedingQuery.selectAll();
  }

  removeBreastFeeding(id: string) {
    this.breastFeedingService.remove(id);
  }
}
