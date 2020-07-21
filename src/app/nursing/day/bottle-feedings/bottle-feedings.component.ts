import { Component, Input } from '@angular/core';
import { BottleFeeding } from '../../state/tracker.model';
import { TrackerService } from '../../state/tracker.service';

@Component({
  selector: 'app-bottle-feedings',
  templateUrl: './bottle-feedings.component.html',
  styleUrls: ['./bottle-feedings.component.scss']
})
export class BottleFeedingsComponent {
  @Input() date: string;
  @Input() bottleFeedings: BottleFeeding[];

  constructor(private trackerService: TrackerService) {}

  async removeBottleFeeding(id: number) {
    await this.trackerService.removeBottleFeeding(this.date, id);
  }
}
