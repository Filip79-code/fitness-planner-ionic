import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService,
    private router: Router) { }
  ngOnInit() {}

  login() {
    if (!this.email || !this.password) {
      alert('Unesite email i lozinku!');
      return;
    }

    this.isLoading = true;
    this.authService.login(this.email, this.password).subscribe({
      next: (success) => {
        this.isLoading = false;
        if (success) {
          this.router.navigate(['/dashboard']);
        } else {
          alert('Neispravan email ili lozinka!');
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        alert('Došlo je do greške prilikom logovanja.');
      }
    });
  }

}
