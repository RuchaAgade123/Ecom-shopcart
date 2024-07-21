import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchQuerySubject = new BehaviorSubject<string> ('');
  filteredProductsSubject = new BehaviorSubject<any[]>([]);
  
  searchQuery$ = this.searchQuerySubject.asObservable();
  filteredProducts$ = this.filteredProductsSubject.asObservable();

  constructor() {}

  setSearchQuery(query: string) {
    this.searchQuerySubject.next(query);
  }

  setFilteredProducts(products: any[]) {
    this.filteredProductsSubject.next(products);
  }
  
}
