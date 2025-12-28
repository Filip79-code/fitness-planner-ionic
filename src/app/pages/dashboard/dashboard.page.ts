import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {

  selectedDate: string = new Date().toISOString();

  

  meals = [
    {
      name: 'Breakfast',
      calories: 450
    },
    {
      name: 'Lunch',
      calories: 650
    },
    {
      name: 'Dinner',
      calories: 550
    },
    {
      name: 'Snack',
      calories: 200
    }
  ];

  get totalCalories(): number {
    return this.meals.reduce((sum, meal) => sum + meal.calories, 0);
  }

  constructor() { }

  ngOnInit() {
  }

}
