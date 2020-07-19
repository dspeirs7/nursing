import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DiaperChangeDialogComponent } from './diaper-change-dialog/diaper-change-dialog.component';
import { FeedingDialogComponent } from './feeding-dialog/feeding-dialog.component';
import { NursingQuery } from '../state/nursing.query';
import { Observable } from 'rxjs';
import { NursingService } from '../state/nursing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  feedingStarted$: Observable<boolean>;

  constructor(
    private nursingQuery: NursingQuery,
    private nursingService: NursingService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.feedingStarted$ = this.nursingQuery.feedingStarted$;
  }

  handleDiaperChange() {
    this.dialog.open(DiaperChangeDialogComponent);
  }

  handleFeeding() {
    this.dialog.open(FeedingDialogComponent, {
      height: '500px',
      width: '500px',
      panelClass: 'dialog'
    });
  }

  stopBreastFeeding() {
    this.nursingService.stopBreastFeeding();
  }
}
