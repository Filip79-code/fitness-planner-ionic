import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';

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

  get totalCalories(): number {
    return this.meals.reduce((sum, meal) => sum + meal.calories, 0);
  }

  constructor(private authService: AuthService, private firebaseService: FirebaseService) { }

  ionViewWillEnter() {
    this.loadMeals();

  // automatski refresh kada se doda novi obrok
  this.firebaseService.mealsChanged$.subscribe(() => {
    this.loadMeals();
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

  logout() {
    this.authService.logout();
  }

}
