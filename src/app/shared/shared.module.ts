import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SidePipe } from './side.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [SidePipe],
  imports: [ReactiveFormsModule, FlexLayoutModule],
  exports: [SidePipe, ReactiveFormsModule, FlexLayoutModule]
})
export class SharedModule {}
