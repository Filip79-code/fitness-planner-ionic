import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private mealsChanged = new BehaviorSubject<void>(undefined);
mealsChanged$ = this.mealsChanged.asObservable();

  
  private baseUrl = 'https://fitness-planner-9ee6b-default-rtdb.europe-west1.firebasedatabase.app';

  constructor(private http: HttpClient) { }

  // ---------- KORISNICI ----------
  // Dodavanje novog korisnika
  addUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users.json`, user);
  }

  // Dohvatanje svih korisnika
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users.json`);
  }

  // ---------- TRENING ----------
  // Dodavanje treninga za određenog korisnika
addWorkout(userId: string, workout: any): Observable<{ name: string }> {
  return this.http.post<{ name: string }>(
    `${this.baseUrl}/workouts/${userId}.json`,
    workout
  );
}

// Dohvatanje svih treninga određenog korisnika
getWorkouts(userId: string): Observable<{ [key: string]: any }> {
  return this.http.get<{ [key: string]: any }>(
    `${this.baseUrl}/workouts/${userId}.json`
  );
}


// Brisanje treninga
deleteWorkout(userId: string, workoutId: string): Observable<void> {
  return this.http.delete<void>(
    `${this.baseUrl}/workouts/${userId}/${workoutId}.json`
  );
}


// Update treninga
updateWorkout(userId: string, workoutId: string, workout: any): Observable<any> {
  return this.http.patch(
    `${this.baseUrl}/workouts/${userId}/${workoutId}.json`,
    workout
  );
}




  // ---------- ISHRANA / OBROCI ----------
  // Dodavanje obroka
//   addMeal(userId: string, meal: any): Observable<{ name: string }> {
//   return this.http.post<{ name: string }>(
//     `${this.baseUrl}/meals/${userId}.json`,
//     meal
//   );
// }

  addMeal(userId: string, meal: any): Observable<{ name: string }> {
  return this.http.post<{ name: string }>(
    `${this.baseUrl}/meals/${userId}.json`,
    meal
  ).pipe(
    tap(() => {
      this.mealsChanged.next();
    })
  );
}




  // Dohvatanje svih obroka
  getMeals(userId: string): Observable<{ [key: string]: any }> {
  return this.http.get<{ [key: string]: any }>(
    `${this.baseUrl}/meals/${userId}.json`
  );
}


deleteMeal(userId: string, mealId: string): Observable<void> {
  return this.http.delete<void>(
    `${this.baseUrl}/meals/${userId}/${mealId}.json`
  ).pipe(
    tap(() => {
      this.mealsChanged.next();
    })
  );
}

// Update obroka
updateMeal(userId: string, mealId: string, meal: any): Observable<void> {
  return this.http.patch<void>(
    `${this.baseUrl}/meals/${userId}/${mealId}.json`,
    meal
  );
}


}
