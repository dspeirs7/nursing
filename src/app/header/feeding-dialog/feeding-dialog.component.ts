import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NursingQuery } from 'src/app/state/nursing.query';
import { Observable } from 'rxjs';
import { Side } from 'src/app/state/nursing.model';
import { tap } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { NursingService } from 'src/app/state/nursing.service';
import * as moment from 'moment';

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
    private nursingQuery: NursingQuery,
    private nursingService: NursingService,
    private dialogRef: MatDialogRef<FeedingDialogComponent>
  ) {}

  ngOnInit(): void {
    this.lastSide$ = this.nursingQuery.lastSide$.pipe(
      tap(lastSide => {
        if (lastSide) {
          this.side.patchValue(lastSide === 'left' ? 'right' : 'left');
        }
      })
    );
  }

  submit() {
    switch (this.feedingType.value) {
      case 'breast':
        if (this.side.valid) {
          this.nursingService.startBreastFeeding(this.side.value);
          this.dialogRef.close();
        }
        break;
      case 'bottle':
        if (this.amount.valid) {
          this.nursingService.addBottleFeeding({
            time: moment(),
            amount: this.amount.value
          });
        }
        this.dialogRef.close();
        break;
    }
  }
}
