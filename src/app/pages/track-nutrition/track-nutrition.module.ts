import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackNutritionPageRoutingModule } from './track-nutrition-routing.module';

import { TrackNutritionPage } from './track-nutrition.page';
import { NavbarModule } from '../../components/navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackNutritionPageRoutingModule,
    NavbarModule
  ],
  declarations: [TrackNutritionPage]
})
export class TrackNutritionPageModule {}
