import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkoutSchedulePage } from './workout-schedule.page';

const routes: Routes = [
  {
    path: '',
    component: WorkoutSchedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutSchedulePageRoutingModule {}
