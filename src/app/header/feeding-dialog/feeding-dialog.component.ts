import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { TrackerQuery } from 'src/app/nursing/state/tracker.query';
import { TrackerService } from 'src/app/nursing/state/tracker.service';
import { Side } from 'src/app/nursing/state/tracker.model';

@Component({
  selector: 'app-feeding-dialog',
  templateUrl: './feeding-dialog.component.html',
  styleUrls: ['./feeding-dialog.component.scss']
})
export class FeedingDialogComponent implements OnInit {
  lastSide$: Observable<Side>;
  feedingType = new FormControl(null, Validators.required);
  side = new FormControl(null, Validators.required);
  amount = new FormControl(null, [Validators.required, Validators.min(1)]);

  constructor(
    private trackerQuery: TrackerQuery,
    private trackerService: TrackerService,
    private dialogRef: MatDialogRef<FeedingDialogComponent>
  ) {}

  ngOnInit(): void {
    this.lastSide$ = this.trackerQuery.lastSide$.pipe(
      tap(lastSide => {
        if (lastSide) {
          this.side.patchValue(lastSide === 'left' ? 'right' : 'left');
        }
      })
    );
  }

  async submit() {
    switch (this.feedingType.value) {
      case 'breast':
        if (this.side.valid) {
          this.trackerService.startBreastFeeding(this.side.value);
          this.dialogRef.close();
        }
        break;
      case 'bottle':
        if (this.amount.valid) {
          await this.trackerService.addBottleFeeding({
            time: moment().toISOString(),
            amount: this.amount.value
          });
        }
        this.dialogRef.close();
        break;
    }
  }
}
