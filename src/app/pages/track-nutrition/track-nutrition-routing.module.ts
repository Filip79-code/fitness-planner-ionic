import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackNutritionPage } from './track-nutrition.page';

const routes: Routes = [
  {
    path: '',
    component: TrackNutritionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackNutritionPageRoutingModule {}
