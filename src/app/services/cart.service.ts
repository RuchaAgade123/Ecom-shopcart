import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([]);

  constructor() { }

  getCartItems(): Observable<any[]> {
    return this.cartItems.asObservable();
  }

  addToCart(product: any): void {
    const items = this.cartItems.getValue();
    const itemIndex = items.findIndex(item => item.product.id === product.id);
    if (itemIndex === -1) {
      items.push({ product, quantity: 1 });
    } else {
      items[itemIndex].quantity++;
    }
    this.cartItems.next(items);
  }

  updateCartItem(cartItemId: number, quantity: number): Observable<void> {
    const items = this.cartItems.getValue();
    const itemIndex = items.findIndex(item => item.product.id === cartItemId);
    if (itemIndex !== -1) {
      items[itemIndex].quantity = quantity;
      this.cartItems.next(items);
    }
    return of();
  }

  removeCartItem(cartItemId: number): Observable<void> {
    const items = this.cartItems.getValue();
    const filteredItems = items.filter(item => item.product.id !== cartItemId);
    this.cartItems.next(filteredItems);
    return of();
  }
}
