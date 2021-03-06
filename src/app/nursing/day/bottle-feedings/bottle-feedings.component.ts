import { Component, Input, OnInit } from '@angular/core';
import { BottleFeedingService } from '../../state/bottle-feeding.service';
import { BottleFeedingQuery } from '../../state/bottle-feeding.query';
import { Observable } from 'rxjs';
import { BottleFeeding } from '../../state/bottle-feeding.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-bottle-feedings',
  templateUrl: './bottle-feedings.component.html',
  styleUrls: ['./bottle-feedings.component.scss']
})
export class BottleFeedingsComponent implements OnInit {
  @Input() date: string;
  bottleFeedings$: Observable<BottleFeeding[]>;

  constructor(
    private bottleFeedingService: BottleFeedingService,
    private bottleFeedingQuery: BottleFeedingQuery
  ) {}

  ngOnInit(): void {
    this.bottleFeedingService
      .syncCollection(ref => ref.where('date', '==', this.date))
      .pipe(untilDestroyed(this))
      .subscribe();
    this.bottleFeedings$ = this.bottleFeedingQuery
      .selectAll()
      .pipe(
        map(bottleFeedings =>
          bottleFeedings
            .filter(bottleFeeding => bottleFeeding.date === this.date)
            .sort(
              (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
            )
        )
      );
  }

  removeBottleFeeding(id: string) {
    this.bottleFeedingService.remove(id);
  }
}
