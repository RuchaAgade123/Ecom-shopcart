// Provides methods for handling user authentication.
// Uses Angular HttpClient to make HTTP requests to the authentication 
// API (https://fakestoreapi.com/auth/login).
// Stores the authentication token (token) in localStorage after successful login.
// Provides methods to check if the user is logged in (isLoggedIn()) and to log out (logout()).


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

export interface LoginResponse{
  token: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://fakestoreapi.com';


  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, { username, password });
  }
  resetPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/reset-password`, { email });
  }
  
  signup(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, { username, email, password });
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
