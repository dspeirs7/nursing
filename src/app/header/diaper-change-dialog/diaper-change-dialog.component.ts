import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NursingService } from 'src/app/state/nursing.service';
import * as moment from 'moment';
import { MatDialogRef } from '@angular/material/dialog';

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
    private nursingService: NursingService,
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

  submit() {
    this.nursingService.addDiaperChange({
      time: moment(),
      ...this.diaperChangeForm.value
    });

    this.dialogRef.close();
  }
}
