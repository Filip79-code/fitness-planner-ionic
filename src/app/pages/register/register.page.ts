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
  if (!this.name || !this.email || !this.password || !this.confirmPassword) {
    alert('Popunite sva polja!');
    return;
  }

  if (this.password !== this.confirmPassword) {
    alert('Lozinka i potvrda lozinke se ne poklapaju!');
    return;
  }

  const user = {
    id: Date.now().toString(),
    name: this.name,
    email: this.email.trim().toLowerCase(),
    password: this.password
  };

  this.authService.register(user).subscribe({
    next: () => {
      alert('Uspešno registrovan korisnik!');
      this.router.navigate(['/login']);
    },
    error: (err) => {
      console.error(err);
      alert('Došlo je do greške prilikom registracije!');
    }
  });
}


}
