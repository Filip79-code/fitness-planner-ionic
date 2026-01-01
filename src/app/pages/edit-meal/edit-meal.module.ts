import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditMealPageRoutingModule } from './edit-meal-routing.module';

import { EditMealPage } from './edit-meal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditMealPageRoutingModule
  ],
  declarations: [EditMealPage]
})
export class EditMealPageModule {}
