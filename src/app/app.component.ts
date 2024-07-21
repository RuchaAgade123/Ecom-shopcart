import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, RouterEvent } from '@angular/router';
import { FormControl } from '@angular/forms';
import { SearchService } from './services/search.service';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  [x: string]: any;
  title = 'E-Shopcart';
  searchQuery: string = '';
  products: any[] = [];
  filteredProducts: any[] = [];
  searchControl = new FormControl('');
  constructor(private authService: AuthService, private router: Router, private searchService: SearchService, private productService: ProductService) {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  ngOnInit() {
    this.searchControl.valueChanges.subscribe(query => {
      this.searchService.setSearchQuery(query ?? '');
      this.filterProducts(query ?? '');
    });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    // Optionally, navigate to the login page
  }

  filterProducts(query: string) {
    const lowerCaseQuery = query.toLowerCase();
    const filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(lowerCaseQuery) ||
      product.description.toLowerCase().includes(lowerCaseQuery)
    );
    this.searchService.setFilteredProducts(filteredProducts);
  }


}
