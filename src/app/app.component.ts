import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private sanitzer: DomSanitizer,
    private iconRegistry: MatIconRegistry
  ) {}

  ngOnInit(): void {
    this.registerIcons();
  }

  registerIcons() {
    this.iconRegistry.addSvgIcon(
      'child',
      this.sanitzer.bypassSecurityTrustResourceUrl('assets/images/child.svg')
    );

    this.iconRegistry.addSvgIcon(
      'delete',
      this.sanitzer.bypassSecurityTrustResourceUrl('assets/images/delete.svg')
    );
  }
}
