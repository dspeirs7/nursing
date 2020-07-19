import { Component, Input } from '@angular/core';
import { BottleFeeding } from 'src/app/state/nursing.model';
import { NursingService } from 'src/app/state/nursing.service';

@Component({
  selector: 'app-bottle-feedings',
  templateUrl: './bottle-feedings.component.html',
  styleUrls: ['./bottle-feedings.component.scss']
})
export class BottleFeedingsComponent {
  @Input() date: string;
  @Input() bottleFeedings: BottleFeeding[];

  constructor(private nursingService: NursingService) {}

  removeBottleFeeding(id: number) {
    this.nursingService.removeBottleFeeding(this.date, id);
  }
}
