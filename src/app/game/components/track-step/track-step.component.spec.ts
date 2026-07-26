import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackStepComponent } from './track-step.component';

describe('TrackStepComponent', () => {
  let component: TrackStepComponent;
  let fixture: ComponentFixture<TrackStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackStepComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
