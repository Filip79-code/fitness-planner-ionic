import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutSchedulePageRoutingModule } from './workout-schedule-routing.module';

import { WorkoutSchedulePage } from './workout-schedule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkoutSchedulePageRoutingModule
  ],
  declarations: [WorkoutSchedulePage]
})
export class WorkoutSchedulePageModule {}
