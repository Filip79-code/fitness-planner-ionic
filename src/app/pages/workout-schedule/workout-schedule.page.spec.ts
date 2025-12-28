import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutSchedulePage } from './workout-schedule.page';

describe('WorkoutSchedulePage', () => {
  let component: WorkoutSchedulePage;
  let fixture: ComponentFixture<WorkoutSchedulePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutSchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
