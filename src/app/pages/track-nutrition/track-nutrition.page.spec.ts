import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackNutritionPage } from './track-nutrition.page';

describe('TrackNutritionPage', () => {
  let component: TrackNutritionPage;
  let fixture: ComponentFixture<TrackNutritionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackNutritionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
