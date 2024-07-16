import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      console.log(items);
    });
  }

  updateQuantity(cartItemId: number, quantity: number) {
    if (quantity > 0) {
      this.cartService.updateCartItem(cartItemId, quantity);
    }
  }

  removeItem(cartItemId: number) {
    this.cartService.removeCartItem(cartItemId);
  }
}
