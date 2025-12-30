import { Component, OnInit } from '@angular/core';


interface Meal {
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

  mealName: string = '';
  calories!: number;
  protein!: number;
  carbs!: number;
  fats!: number;
  mealDate: string = '';

  meals: Meal[] = [];

  selectedDate: string = '';

  constructor() { }

  ngOnInit() {
  }

  addMeal() {
    if (!this.mealName || !this.calories || !this.mealDate) {
      return;
    }

    this.meals.push({
      name: this.mealName,
      calories: this.calories,
      protein: this.protein || 0,
      carbs: this.carbs || 0,
      fats: this.fats || 0,
      date: this.mealDate
    });

    // reset forme
    this.mealName = '';
    this.calories = 0;
    this.protein = 0;
    this.carbs = 0;
    this.fats = 0;
    this.mealDate = '';
  }

  getMealsForSelectedDate(): Meal[] {
    return this.meals.filter(m => m.date === this.selectedDate);
  }

  getTotalCalories(): number {
    return this.getMealsForSelectedDate()
      .reduce((sum, meal) => sum + meal.calories, 0);
  }

}
