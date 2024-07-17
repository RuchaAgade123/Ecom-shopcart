import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];
  selectedCategories: string[] = [];

  cartQuantities: { [productId: number]: number } = {};

  constructor(private productService: ProductService, private cartService: CartService, private router: Router) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
    });

    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.cartService.getCartItems().subscribe(items => {
      this.cartQuantities = items.reduce((acc, item) => {
        acc[item.product.id] = item.quantity;
        return acc;
      }, {});
    });
  }

  filterBySelectedCategories() {
    if (this.selectedCategories.length === 0) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => this.selectedCategories.includes(product.category));
    }
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.updateCartQuantities();
  }

  updateQuantity(product: any, quantity: number) {
    if (quantity > 0) {
      this.cartService.updateCartItem(product.id, quantity);
    } else {
      this.cartService.removeCartItem(product.id);
    }
    this.updateCartQuantities();
  }

  private updateCartQuantities() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartQuantities = items.reduce((acc, item) => {
        acc[item.product.id] = item.quantity;
        return acc;
      }, {});
    });
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }
  
}
