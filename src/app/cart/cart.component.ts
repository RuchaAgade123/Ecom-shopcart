import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems!: any[];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  updateQuantity(cartItemId: number, quantity: number) {
    this.cartService.updateCartItem(cartItemId, quantity).subscribe(() => {
      // Update cart items or handle response
    });
  }

  removeItem(cartItemId: number) {
    this.cartService.removeCartItem(cartItemId).subscribe(() => {
      // Remove item from cartItems array or handle response
    });
  }

}
