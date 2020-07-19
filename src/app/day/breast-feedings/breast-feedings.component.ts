import { Component, Input } from '@angular/core';
import { BreastFeeding } from 'src/app/state/nursing.model';
import { NursingService } from 'src/app/state/nursing.service';

@Component({
  selector: 'app-breast-feedings',
  templateUrl: './breast-feedings.component.html',
  styleUrls: ['./breast-feedings.component.scss']
})
export class BreastFeedingsComponent {
  @Input() date: string;
  @Input() breastFeedings: BreastFeeding[];

  constructor(private nursingService: NursingService) {}

  removeBreastFeeding(id: number) {
    this.nursingService.removeBreastFeeding(this.date, id);
  }
}
