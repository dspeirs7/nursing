import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottleFeedingsComponent } from './bottle-feedings.component';

describe('BottleFeedingsComponent', () => {
  let component: BottleFeedingsComponent;
  let fixture: ComponentFixture<BottleFeedingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottleFeedingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottleFeedingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
