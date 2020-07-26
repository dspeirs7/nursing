import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  ValidationErrors
} from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { BottleFeedingService } from 'src/app/nursing/state/bottle-feeding.service';
import { BreastFeedingQuery } from 'src/app/nursing/state/breast-feeding.query';
import { BreastFeedingService } from 'src/app/nursing/state/breast-feeding.service';
import { BottleFeeding } from 'src/app/nursing/state/bottle-feeding.model';
import { DATE_FORMAT } from '../../utils/constants';
import { Side } from 'src/app/nursing/state/breast-feeding.model';

@Component({
  selector: 'app-feeding-dialog',
  templateUrl: './feeding-dialog.component.html',
  styleUrls: ['./feeding-dialog.component.scss']
})
export class FeedingDialogComponent implements OnInit {
  lastSide$: Observable<Side>;
  feedingType = new FormControl(null, Validators.required);
  side = new FormControl(null, Validators.required);
  amount = new FormGroup(
    {
      oz: new FormControl(null),
      ml: new FormControl(null)
    },
    this.atLeastOne('oz', 'ml')
  );

  constructor(
    private bottleFeedingService: BottleFeedingService,
    private breastFeedingQuery: BreastFeedingQuery,
    private breastFeedingService: BreastFeedingService,
    private dialogRef: MatDialogRef<FeedingDialogComponent>
  ) {}

  ngOnInit(): void {
    this.lastSide$ = this.breastFeedingQuery.lastSide$.pipe(
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
          this.breastFeedingService.startBreastFeeding(this.side.value);
          this.dialogRef.close();
        }
        break;
      case 'bottle':
        if (this.amount.valid) {
          const date = moment();
          await this.bottleFeedingService.add({
            date: date.format(DATE_FORMAT),
            time: date.toISOString(),
            amount: this.amount.value
          } as BottleFeeding);
        }
        this.dialogRef.close();
        break;
    }
  }

  atLeastOne(...fields: string[]) {
    return (formGroup: FormGroup): ValidationErrors | null => {
      return fields.some(field => {
        const value = formGroup.get(field).value;
        return value && value > 0;
      })
        ? null
        : { atLeastOne: 'At least one value must be provided.' };
    };
  }
}
