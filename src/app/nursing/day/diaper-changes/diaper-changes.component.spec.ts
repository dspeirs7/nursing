import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaperChangesComponent } from './diaper-changes.component';

describe('DiaperChangesComponent', () => {
  let component: DiaperChangesComponent;
  let fixture: ComponentFixture<DiaperChangesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaperChangesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaperChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
