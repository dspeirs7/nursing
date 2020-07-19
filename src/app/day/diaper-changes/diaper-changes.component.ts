import { Component, Input } from '@angular/core';
import { DiaperChange } from 'src/app/state/nursing.model';
import { NursingService } from 'src/app/state/nursing.service';

@Component({
  selector: 'app-diaper-changes',
  templateUrl: './diaper-changes.component.html',
  styleUrls: ['./diaper-changes.component.scss']
})
export class DiaperChangesComponent {
  @Input() date: string;
  @Input() diaperChanges: DiaperChange[];

  constructor(private nursingService: NursingService) {}

  removeDiaperChange(id: number) {
    this.nursingService.removeDiaperChange(this.date, id);
  }
}
