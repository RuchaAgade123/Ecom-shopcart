// Provides methods for handling user authentication.
// Uses Angular HttpClient to make HTTP requests to the authentication 
// API (https://fakestoreapi.com/auth/login).
// Stores the authentication token (token) in localStorage after successful login.
// Provides methods to check if the user is logged in (isLoggedIn()) and to log out (logout()).


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://fakestoreapi.com/auth/login';


  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<any>(this.apiUrl, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}
