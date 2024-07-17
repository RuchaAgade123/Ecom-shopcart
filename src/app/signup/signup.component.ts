import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    if (this.username && this.email && this.password) {
       this.authService.signup(this.username, this.email, this.password).subscribe({
         next: (response) => {
           console.log('Signup successful', response);
           this.router.navigate(['/login']);
         },
         error: (error) => {
           this.router.navigate(['/login']);
         }
       });
     } else {
      this.router.navigate(['/login']);
    }
  }

  navigateToLogin(){
    this.router.navigate(['/login']);

  }
}
