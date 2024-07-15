// Provides methods to fetch products (getProducts()), categories (getCategories()),
// and filter products by category (getProductsByCategory(category)).
// Uses Angular HttpClient to make HTTP requests to the products API 
// (https://fakestoreapi.com/products).

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {



  private apiUrl = 'https://fakestoreapi.com/products';
  private cartUrl = 'https://fakestoreapi.com/carts';

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCategories() {
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }

  getProductsByCategory(category: string) {
    return this.http.get<any[]>(`${this.apiUrl}/category/${category}`);
  }

  addToCart(productId: number) {
    return this.http.post<any>(`${this.cartUrl}`, { productId });
  }
}
