import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [NavbarComponent]
})
export class NavbarModule {}
