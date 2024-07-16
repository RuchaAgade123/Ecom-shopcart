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
    // Fetch products once and store them
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      // Initialize with all products
      this.filterByCategory('all');
    });

    // Fetch categories
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    // Fetch cart items
    this.cartService.getCartItems().subscribe(items => {
      this.cartQuantities = items.reduce((acc, item) => {
        acc[item.product.id] = item.quantity;
        return acc;
      }, {});
    });
  }

  filterByCategory(category: string) {
    if (category === 'all') {
      // Show all products with their original prices
      this.productService.getProducts().subscribe(products => {
        this.products = products;
      });
    } else {
      // Show products filtered by category with their original prices
      this.productService.getProductsByCategory(category).subscribe(products => {
        this.products = products;
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
    } else {
      this.cartService.removeCartItem(product.id); // Remove the item if quantity is 0 or less
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
}
