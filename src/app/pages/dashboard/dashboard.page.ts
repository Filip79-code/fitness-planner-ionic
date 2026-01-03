import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import { ModalController } from '@ionic/angular';
import { DailyGoalsPage } from '../daily-goals/daily-goals.page';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage {

  // selectedDate: string = new Date().toISOString();
  get today(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // meseci su 0-indexirani
  const day = now.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

  meals: any[] = [];

  userId!: string;
  // userId: string | null = null;

  weight!: number;
  proteinPerKg: number = 1.8;
  dailyProtein: number | null = null;

  goals = {
  calories: 0,
  protein: 0,
  // water: 0
};



  get totalCalories(): number {
    return this.meals.reduce((sum, meal) => sum + meal.calories, 0);
  }

  constructor(private authService: AuthService, private firebaseService: FirebaseService, private modalCtrl: ModalController) { }

  cancel() {
  this.modalCtrl.dismiss();
}

  ionViewWillEnter() {

    this.userId = this.authService.getUserId()!;
  if (!this.userId) return;
  //   this.userId = this.authService.getUserId(); // OBAVEZNO
  // if (!this.userId) return;
    this.loadMeals();

  // automatski refresh kada se doda novi obrok
  this.firebaseService.mealsChanged$.subscribe(() => {
    this.loadMeals();
  });

  // učitaj ciljeve odmah
  this.loadGoals();




  this.firebaseService.getGoals(this.userId)
  .subscribe((res: any) => {
    if (res) {
      this.goals = res;
    }
  });

  }

  // onDateChange(event: any) {
  //   this.selectedDate = event.detail.value;
  //   this.loadMealsForDate(this.selectedDate);
  // }

  loadMeals() {
  const userId = this.authService.getUserId();
  if (!userId) return;

  this.firebaseService.getMeals(userId).subscribe(data => {
    const allMeals = data
      ? Object.entries(data).map(([id, meal]: any) => ({ id, ...meal }))
      : [];

    // filtriramo samo obroke za danas
    this.meals = allMeals.filter(meal => meal.date === this.today);
  });
}




  loadMealsForDate(date: string) {
    const formattedDate = date.split('T')[0];

    this.firebaseService.getMeals(this.userId).subscribe((res: any) => {
      if (!res) {
        this.meals = [];
        return;
      }

      this.meals = Object.values(res).filter(
        (meal: any) => meal.date === formattedDate
      );
    });
  }


  calculateProtein() {
  if (!this.weight || this.weight <= 0) {
    this.dailyProtein = null;
    return;
  }

  this.dailyProtein = Math.round(this.weight * this.proteinPerKg);
}


get totalProtein(): number {
  return this.meals.reduce(
    (sum, meal) => sum + (meal.protein || 0),
    0
  );
}

getCaloriesProgress(): number {
  if (!this.goals.calories) return 0;

  return Math.min(
    (this.totalCalories / this.goals.calories) * 100,
    100
  );
}

getProteinProgress(): number {
  if (!this.goals.protein) return 0;

  return Math.min(
    (this.totalProtein / this.goals.protein) * 100,
    100
  );
}


async openDailyGoalModal() {
  const modal = await this.modalCtrl.create({
    component: DailyGoalsPage,

    // 🔥 OVO SPREČAVA FULLSCREEN
    breakpoints: [0, 0.9],
    initialBreakpoint: 0.9
  });

  modal.onDidDismiss().then(res => {
    if (res.data) {
      this.firebaseService.getGoals(this.userId).subscribe((g: any) => {
        if (g) this.goals = g;
      });
    }
  });

  await modal.present();
}

loadGoals() {
  const userId = this.authService.getUserId();
  if (!userId) return;

  this.firebaseService.getGoals(userId)
    .subscribe(res => {
      if (res) {
        this.goals = res;
      }
    });
}


  logout() {
    this.authService.logout();
  }

}
