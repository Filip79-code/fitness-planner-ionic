import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {

  selectedDate: string = new Date().toISOString();

  

  meals: any[] = [];

  userId!: string;

  get totalCalories(): number {
    return this.meals.reduce((sum, meal) => sum + meal.calories, 0);
  }

  constructor(private authService: AuthService, private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.userId = this.authService.getUserId()!;
    this.loadMealsForDate(this.selectedDate);
  }

  onDateChange(event: any) {
    this.selectedDate = event.detail.value;
    this.loadMealsForDate(this.selectedDate);
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
