import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { MatDialogRef } from '@angular/material/dialog';
import { TrackerService } from 'src/app/nursing/state/tracker.service';

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
    private trackerService: TrackerService,
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
    await this.trackerService.addDiaperChange({
      time: moment().toISOString(),
      ...this.diaperChangeForm.value
    });

    this.dialogRef.close();
  }
}
