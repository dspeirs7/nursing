import { Component, Input } from '@angular/core';
import { TrackerService } from '../../state/tracker.service';
import { BreastFeeding } from '../../state/tracker.model';

@Component({
  selector: 'app-breast-feedings',
  templateUrl: './breast-feedings.component.html',
  styleUrls: ['./breast-feedings.component.scss']
})
export class BreastFeedingsComponent {
  @Input() date: string;
  @Input() breastFeedings: BreastFeeding[];

  constructor(private trackerService: TrackerService) {}

  async removeBreastFeeding(id: number) {
    await this.trackerService.removeBreastFeeding(this.date, id);
  }
}
