import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-meal',
  templateUrl: './edit-meal.page.html',
  styleUrls: ['./edit-meal.page.scss'],
  standalone: false
})
export class EditMealPage {

  @Input() meal: any;
  userId!: string;

  constructor(
    private modalCtrl: ModalController,
    private firebaseService: FirebaseService,
    private authService: AuthService
  ) {
    this.userId = this.authService.getUserId()!;
  }

  updateMeal() {
    this.firebaseService
      .updateMeal(this.userId, this.meal.id, this.meal)
      .subscribe(() => {
        this.modalCtrl.dismiss(true);
      });
  }

  cancel() {
    this.modalCtrl.dismiss(false);
  }
}
