// Displays a login form with email and password fields.
// Calls AuthService's login() method on form submission to authenticate the user.
// Navigates to the product listing page (/products) upon successful login.

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) { }


  login() {
    this.authService.login(this.email, this.password).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }

}
