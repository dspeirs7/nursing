import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaperChangeDialogComponent } from './diaper-change-dialog.component';

describe('DiaperChangeDialogComponent', () => {
  let component: DiaperChangeDialogComponent;
  let fixture: ComponentFixture<DiaperChangeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaperChangeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaperChangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
