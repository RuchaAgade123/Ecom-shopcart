import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: any[] = [];
  categories: string[] = [];
  cartQuantities: { [productId: number]: number } = {};

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products.map(product => ({
        ...product,
        //price: this.getRandomPrice() // Add random price here
      }));
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

  filterByCategory(category: string) {
    if (category === 'all') {
      this.productService.getProducts().subscribe(products => {
        this.products = products.map(product => ({
          ...product,
          price: this.getRandomPrice() // Add random price here
        }));
      });
    } else {
      this.productService.getProductsByCategory(category).subscribe(products => {
        this.products = products.map(product => ({
          ...product,
          price: this.getRandomPrice() // Add random price here
        }));
      });
    }
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.updateCartQuantities();
  }

  updateQuantity(product: any, quantity: number) {
    if (quantity > 0) {
      this.cartService.updateCartItem(product.id, quantity);
      this.updateCartQuantities();
    }
  }

  private updateCartQuantities() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartQuantities = items.reduce((acc, item) => {
        acc[item.product.id] = item.quantity;
        return acc;
      }, {});
    });
  }

  // Function to generate random price between 10 and 100
  private getRandomPrice(): number {
    return Math.floor(Math.random() * (100 - 10 + 1) + 10);
  }
}
