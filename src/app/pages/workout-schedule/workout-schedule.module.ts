import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutSchedulePageRoutingModule } from './workout-schedule-routing.module';

import { WorkoutSchedulePage } from './workout-schedule.page';
import { NavbarModule } from '../../components/navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkoutSchedulePageRoutingModule,
    NavbarModule
  ],
  declarations: [WorkoutSchedulePage]
})
export class WorkoutSchedulePageModule {}
