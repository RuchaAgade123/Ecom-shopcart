import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  resetEmail: string = '';
  resetPasswordMode: boolean = false;
  updatedPassword: boolean = false;
  constructor(private authService: AuthService, private router: Router) { }


  login() {
    if (this.email && this.password) {
      //   this.authService.login(this.email, this.password).subscribe({
      //     next: (response) => {
      //       console.log('Login successful', response);
      //       localStorage.setItem('token', response.token);
      //       this.router.navigate(['/']);
      //     },
      //     error: (error) => {
      //       this.router.navigate(['/']);
      //     }
      //   });
      this.router.navigate(['/products']);
    } else {
      console.error('Email and password are required');
    }
  }

  toggleResetPassword() {
    this.resetPasswordMode = !this.resetPasswordMode;
  }

  resetPassword() {
    if (this.resetEmail) {
      this.updatedPassword = true;
      this.authService.resetPassword(this.resetEmail).subscribe({
        next: (response) => {
          console.log('Password reset email sent', response);
          this.resetPasswordMode = false;
        },
        error: (error) => {
        }
      });
    } else {
      console.error('Email is required');
    }
  }


}
