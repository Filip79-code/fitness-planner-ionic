import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyGoalsPageRoutingModule } from './daily-goals-routing.module';

import { DailyGoalsPage } from './daily-goals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyGoalsPageRoutingModule
  ],
  declarations: [DailyGoalsPage]
})
export class DailyGoalsPageModule {}
