import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DaysListComponent } from './days-list/days-list.component';
import { DayComponent } from './day/day.component';
import { MaterialModule } from './material/material.module';
import { SidePipe } from './side.pipe';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { environment } from '../environments/environment';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DiaperChangeDialogComponent } from './header/diaper-change-dialog/diaper-change-dialog.component';
import { FeedingDialogComponent } from './header/feeding-dialog/feeding-dialog.component';
import { BottleFeedingsComponent } from './day/bottle-feedings/bottle-feedings.component';
import { BreastFeedingsComponent } from './day/breast-feedings/breast-feedings.component';
import { DiaperChangesComponent } from './day/diaper-changes/diaper-changes.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    DaysListComponent,
    DayComponent,
    SidePipe,
    HeaderComponent,
    DiaperChangeDialogComponent,
    FeedingDialogComponent,
    BottleFeedingsComponent,
    BreastFeedingsComponent,
    DiaperChangesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AkitaNgRouterStoreModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
