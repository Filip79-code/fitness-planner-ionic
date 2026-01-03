import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-daily-goals',
  templateUrl: './daily-goals.page.html',
  styleUrls: ['./daily-goals.page.scss'],
  standalone: false
})
export class DailyGoalsPage implements OnInit {

  userId!: string;

  goals = {
    calories: 0,
    protein: 0
  };

  constructor(
    private authService: AuthService,
    private firebaseService: FirebaseService, private modalCtrl: ModalController
  ) {}

  

  ngOnInit() {
    const userId = this.authService.getUserId();
    if (!userId) {
      console.error('User not logged in');
      return;
    }

    this.userId = userId;

    // učitaj postojeće ciljeve (ako postoje)
    this.firebaseService.getGoals(this.userId).subscribe(res => {
      if (res) {
        this.goals = res;
      }
    });
  }

  saveGoals() {
    console.log('Saving goals:', this.goals);

    this.firebaseService.saveGoals(this.userId, this.goals)
      .subscribe({
        next: () => {
          console.log('Goals saved');
          this.modalCtrl.dismiss(true); // zatvori modal
        },
        error: err => {
          console.error(err);
          alert('Error saving goals');
        }
      });
  }

  cancel() {
    this.modalCtrl.dismiss();
  }
}
