import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor() { }
  ngOnInit() {}

  login() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }
}
