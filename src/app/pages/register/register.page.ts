import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  register() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    console.log('Name:', this.name);
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }

}
