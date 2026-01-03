import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DailyGoalsPage } from './daily-goals.page';

describe('DailyGoalsPage', () => {
  let component: DailyGoalsPage;
  let fixture: ComponentFixture<DailyGoalsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyGoalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
