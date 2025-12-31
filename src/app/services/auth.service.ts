import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from './firebase.service';
import { Observable, map } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  email: string;
  password: string;
  [key: string]: any; // za dodatna polja kasnije
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private firebaseService: FirebaseService) {}

  // Registracija korisnika
  register(user: any) {
  return this.firebaseService.addUser(user).pipe(
    tap(res => {
      // res.name je Firebase generisani ID korisnika
      localStorage.setItem('user', JSON.stringify({ ...user, id: res.name }));
    })
  );
}

  // Login
  login(email: string, password: string): Observable<boolean> {
    return this.firebaseService.getUsers().pipe(
      map(usersObj => {
        const users = usersObj ? Object.values(usersObj) : [];
        const user = users.find((u: any) => u.email === email && u.password === password);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          return true;
        }
        return false;
      })
    );
  }

  // Logout
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // Provera da li je korisnik ulogovan
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  // Dohvatanje trenutno ulogovanog korisnika
  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }


  getUserId(): string | null {
  const user = this.getUser();
  return user ? user['id'] : null;
}


}
