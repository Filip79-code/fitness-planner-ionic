import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import { ModalController } from '@ionic/angular';
import { EditMealPage } from '../edit-meal/edit-meal.page';


interface Meal {
  id?: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  date: string;
}

interface FoodResult {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
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

  foodQuery = '';
  foodResults: FoodResult[] = [];

  constructor(private authService: AuthService, private firebaseService: FirebaseService, private modalCtrl: ModalController) { }

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

  deleteMeal(meal: Meal) {
  if (!meal.id) return;

  const confirmDelete = confirm(`Delete meal "${meal.name}"?`);
  if (!confirmDelete) return;

  this.firebaseService.deleteMeal(this.userId, meal.id)
    .subscribe({
      next: () => {
        // ukloni odmah iz UI
        this.meals = this.meals.filter(m => m.id !== meal.id);
      },
      error: (err) => {
        console.error(err);
        alert('Error deleting meal.');
      }
    });
}



async openEditMeal(meal: Meal) {
  const modal = await this.modalCtrl.create({
    component: EditMealPage,
    componentProps: {
      meal: { ...meal } // kopija
    },
    breakpoints: [0, 0.9],
    initialBreakpoint: 0.9
  });

  modal.onDidDismiss().then(result => {
    if (result.data) {
      this.firebaseService.getMeals(this.userId).subscribe(data => {
        this.meals = data
          ? Object.entries(data).map(([id, m]: any) => ({ id, ...m }))
          : [];
      });
    }
  });

  await modal.present();
}



searchFood() {
  if (!this.foodQuery) return;

  this.firebaseService.searchFood(this.foodQuery)
    .subscribe(res => {

      const products = res.products || [];

      // 1️⃣ samo proizvodi koji imaju PRAVE nutritivne vrednosti
      const validProducts = products.filter((p: any) =>
        p.nutriments &&
        p.nutriments['energy-kcal_100g'] &&
        p.nutriments['proteins_100g']
      );

      // 2️⃣ ime mora da sadrži ono što je korisnik uneo
      const cleanProducts = validProducts.filter((p: any) =>
        p.product_name &&
        p.product_name.toLowerCase().includes(this.foodQuery.toLowerCase())
      );

      // 3️⃣ mapiranje u tvoj FoodResult
      this.foodResults = cleanProducts.map((p: any) => ({
        name: p.product_name,
        calories: Math.round(p.nutriments['energy-kcal_100g']),
        protein: Math.round(p.nutriments['proteins_100g']),
        carbs: Math.round(p.nutriments['carbohydrates_100g'] || 0),
        fats: Math.round(p.nutriments['fat_100g'] || 0),
      }));

      // 4️⃣ ako nema ničega → fallback
      if (this.foodResults.length === 0) {
        alert('No reliable nutrition data found. Try another food.');
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
