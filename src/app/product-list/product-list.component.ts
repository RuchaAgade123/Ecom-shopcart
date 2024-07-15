// Fetches products and categories from ProductService during component initialization (ngOnInit()).
// Displays a list of products with Angular Material cards and buttons.
// Implements category filtering to display products based on selected categories.

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

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {


    this.productService.getProducts().subscribe(products => {
      this.products = products;
      console.log(this.products)
    });

    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  filterByCategory(category: string) {
    this.productService.getProductsByCategory(category).subscribe(products => {
      this.products = products;
    });
  }

  addToCart(productId: number) {
    this.cartService.addToCart(productId).subscribe(() => {
      console.log(`Product ${productId} added to cart.`);
      // Optionally, you can notify the user or update the UI
    }, error => {
      console.error('Error adding product to cart:', error);
      // Handle error, such as showing an error message to the user
    });
  }

}
