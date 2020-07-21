import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DiaperChangeDialogComponent } from './diaper-change-dialog/diaper-change-dialog.component';
import { FeedingDialogComponent } from './feeding-dialog/feeding-dialog.component';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { TrackerQuery } from '../nursing/state/tracker.query';
import { TrackerService } from '../nursing/state/tracker.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user$: Observable<firebase.User>;
  feedingStarted$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private trackerQuery: TrackerQuery,
    private trackerService: TrackerService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.getUser();
    this.feedingStarted$ = this.trackerQuery.feedingStarted$;
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

  async stopBreastFeeding() {
    await this.trackerService.stopBreastFeeding();
  }

  signinWithGoogle() {
    this.authService.signinWithGoogle();
  }

  logout() {
    this.authService.logout();
  }
}
