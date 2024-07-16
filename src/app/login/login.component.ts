import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  login() {
    fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.email, // Assuming the API expects email as username
        password: this.password
      })
    })
    .then(res => res.json())
    .then(json => {
      console.log(json);
      // Handle the response as needed
      // For example, you could store the token and redirect the user
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle the error as needed
    });
  }
}
