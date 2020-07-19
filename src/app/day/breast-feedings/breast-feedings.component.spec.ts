import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreastFeedingsComponent } from './breast-feedings.component';

describe('BreastFeedingsComponent', () => {
  let component: BreastFeedingsComponent;
  let fixture: ComponentFixture<BreastFeedingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreastFeedingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreastFeedingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
