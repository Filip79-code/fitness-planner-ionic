import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditMealPage } from './edit-meal.page';

const routes: Routes = [
  {
    path: '',
    component: EditMealPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditMealPageRoutingModule {}
