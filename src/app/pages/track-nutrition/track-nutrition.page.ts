import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';


interface Meal {
  id?: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  date: string;
}

@Component({
  selector: 'app-track-nutrition',
  templateUrl: './track-nutrition.page.html',
  styleUrls: ['./track-nutrition.page.scss'],
  standalone: false
})
export class TrackNutritionPage implements OnInit {

  userId!: string;

  mealName: string = '';
  calories!: number;
  protein!: number;
  carbs!: number;
  fats!: number;
  mealDate: string = '';

  meals: Meal[] = [];

  selectedDate: string = '';

  constructor(private authService: AuthService, private firebaseService: FirebaseService) { }

  ngOnInit() {

    this.userId = this.authService.getUserId()!;

  this.firebaseService.getMeals(this.userId)
    .subscribe(data => {
      this.meals = data
        ? Object.entries(data).map(([id, meal]: any) => ({ id, ...meal }))
        : [];
    });

  }


  addMeal() {
    if (!this.mealName || !this.calories || !this.mealDate) {
      return;
    }

    const newMeal: Meal = {
    name: this.mealName,
    calories: this.calories,
    protein: this.protein || 0,
    carbs: this.carbs || 0,
    fats: this.fats || 0,
    date: this.mealDate
  };

  this.firebaseService.addMeal(this.userId, newMeal)
    .subscribe({
      next: (res) => {
        this.meals.push({ id: res.name, ...newMeal });

        // reset forme
        this.mealName = '';
        this.calories = 0;
        this.protein = 0;
        this.carbs = 0;
        this.fats = 0;
        this.mealDate = '';
      },
      error: err => {
        console.error(err);
        alert('Greška pri čuvanju obroka');
      }
    });
  }

  getMealsForSelectedDate(): Meal[] {
    return this.meals.filter(m => m.date === this.selectedDate);
  }

  getTotalCalories(): number {
    return this.getMealsForSelectedDate()
      .reduce((sum, meal) => sum + meal.calories, 0);
  }

  logout() {
    this.authService.logout();
  }

}
