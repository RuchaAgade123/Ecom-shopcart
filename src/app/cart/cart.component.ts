import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  subtotal: number = 0;
  tax: number = 3;
  total: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.calculateTotals();
    });
  }

  // Update cart items and its count or handle response
  updateQuantity(cartItemId: number, quantity: number) {
    if (quantity > 0) {
      this.cartService.updateCartItem(cartItemId, quantity).subscribe(() => {
        this.calculateTotals();
      });
    }
  }

  // Remove item from cartItems array or handle response
  removeItem(cartItemId: number) {
    this.cartService.removeCartItem(cartItemId).subscribe(() => {
      this.cartItems = this.cartItems.filter(item => item.product.id !== cartItemId);
      this.calculateTotals();
    });
  }

  // Calculate the total products price to proceed payment
  private calculateTotals() {
    this.subtotal = this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    this.total = this.subtotal + this.tax;
  }
}
