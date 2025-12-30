import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {

  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    if (!this.email || !this.password || !this.confirmPassword) {
      alert('Popunite sva polja!');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Lozinka i potvrda lozinke se ne poklapaju!');
      return;
    }

    // Poziv AuthService da doda korisnika u Firebase
    this.authService.register({ email: this.email, password: this.password, name: this.name })
      .subscribe({
        next: () => {
          alert('Uspešno registrovan korisnik!');
          this.router.navigate(['/login']); // preusmeravanje na login
        },
        error: (err) => {
          console.error(err);
          alert('Došlo je do greške prilikom registracije!');
        }
      });
  }

}
