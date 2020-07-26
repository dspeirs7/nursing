import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { MatDialogRef } from '@angular/material/dialog';
import { DiaperChangeService } from 'src/app/nursing/state/diaper-change.service';
import { DATE_FORMAT } from 'src/app/utils/constants';

@Component({
  selector: 'app-diaper-change-dialog',
  templateUrl: './diaper-change-dialog.component.html',
  styleUrls: ['./diaper-change-dialog.component.scss']
})
export class DiaperChangeDialogComponent implements OnInit {
  allComplete = false;
  diaperChangeForm = new FormGroup({
    pee: new FormControl(false),
    poo: new FormControl(false)
  });

  constructor(
    private diaperChangeService: DiaperChangeService,
    private dialogRef: MatDialogRef<DiaperChangeDialogComponent>
  ) {}

  ngOnInit(): void {}

  updateAllCompleted() {
    this.allComplete =
      this.diaperChangeForm.get('pee').value &&
      this.diaperChangeForm.get('poo').value;
  }

  someCompleted() {
    return (
      !this.allComplete &&
      (this.diaperChangeForm.get('pee').value ||
        this.diaperChangeForm.get('poo').value)
    );
  }

  setAll(checked: boolean) {
    this.allComplete = checked;

    this.diaperChangeForm.patchValue({
      pee: checked,
      poo: checked
    });
  }

  async submit() {
    const date = moment();

    await this.diaperChangeService.add({
      date: date.format(DATE_FORMAT),
      time: date.toISOString(),
      ...this.diaperChangeForm.value
    });

    this.dialogRef.close();
  }
}
