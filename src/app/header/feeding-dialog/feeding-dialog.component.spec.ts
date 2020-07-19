import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedingDialogComponent } from './feeding-dialog.component';

describe('FeedingDialogComponent', () => {
  let component: FeedingDialogComponent;
  let fixture: ComponentFixture<FeedingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
