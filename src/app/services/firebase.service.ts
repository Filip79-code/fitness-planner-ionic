import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  
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
  // Dodavanje treninga
  addWorkout(workout: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/workouts.json`, workout);
  }

  // Dohvatanje svih treninga
  getWorkouts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/workouts.json`);
  }

  // ---------- ISHRANA / OBROCI ----------
  // Dodavanje obroka
  addMeal(meal: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/meals.json`, meal);
  }

  // Dohvatanje svih obroka
  getMeals(): Observable<any> {
    return this.http.get(`${this.baseUrl}/meals.json`);
  }
}
