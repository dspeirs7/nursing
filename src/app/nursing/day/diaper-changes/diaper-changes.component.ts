import { Component, Input } from '@angular/core';
import { TrackerService } from '../../state/tracker.service';
import { DiaperChange } from '../../state/tracker.model';

@Component({
  selector: 'app-diaper-changes',
  templateUrl: './diaper-changes.component.html',
  styleUrls: ['./diaper-changes.component.scss']
})
export class DiaperChangesComponent {
  @Input() date: string;
  @Input() diaperChanges: DiaperChange[];

  constructor(private trackerService: TrackerService) {}

  async removeDiaperChange(id: number) {
    await this.trackerService.removeDiaperChange(this.date, id);
  }
}
