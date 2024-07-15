// Provides methods for cart management such as adding items to the cart 
// (addToCart(productId)), retrieving cart items (getCartItems()), updating cart item quantities 
// (updateCartItem(cartItemId, quantity)), and removing items from the cart (removeCartItem(cartItemId)).
// Uses Angular HttpClient to interact with the cart API (https://fakestoreapi.com/carts).

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'https://fakestoreapi.com/carts';


  constructor(private http: HttpClient) { }

  addToCart(productId: number) {
    return this.http.post<any>(this.apiUrl, { productId });
  }

  getCartItems() {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateCartItem(cartItemId: number, quantity: number) {
    return this.http.patch<any>(`${this.apiUrl}/${cartItemId}`, { quantity });
  }

  removeCartItem(cartItemId: number) {
    return this.http.patch<any>(`${this.apiUrl}/${cartItemId}`, { method: 'DELETE' });
  }
}
