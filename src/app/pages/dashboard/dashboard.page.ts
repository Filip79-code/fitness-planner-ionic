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
  today: string = '';
  

  meals: any[] = [];

  userId!: string;

  get totalCalories(): number {
    return this.meals.reduce((sum, meal) => sum + meal.calories, 0);
  }

  constructor(private authService: AuthService, private firebaseService: FirebaseService) { }

  ionViewWillEnter() {
    this.today = new Date().toISOString().split('T')[0];
  this.loadMealsForToday();
  }

  // onDateChange(event: any) {
  //   this.selectedDate = event.detail.value;
  //   this.loadMealsForDate(this.selectedDate);
  // }

  loadMealsForToday() {
  const userId = this.authService.getUserId();
  if (!userId) return;

  this.firebaseService.getMeals(userId).subscribe(data => {
    const allMeals = data
      ? Object.entries(data).map(([id, meal]: any) => ({ id, ...meal }))
      : [];

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
