import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        NoopAnimationsModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    expect(component.title).toBeTruthy();
  });

  it('should have a search bar if logged in', () => {
    spyOn(component, 'isLoggedIn').and.returnValue(true);
    fixture.detectChanges();

    const searchBar = fixture.debugElement.query(By.css('.search-bar'));
    expect(searchBar).toBeTruthy();
  });

  it('should not have a search bar if not logged in', () => {
    spyOn(component, 'isLoggedIn').and.returnValue(false);
    fixture.detectChanges();

    const searchBar = fixture.debugElement.query(By.css('.search-bar'));
    expect(searchBar).toBeFalsy();
  });

  it('should reset search control when clear button is clicked', () => {
    spyOn(component, 'isLoggedIn').and.returnValue(true);
    fixture.detectChanges();

    component.searchControl.setValue('test search');
    fixture.detectChanges();

    const clearButton = fixture.debugElement.query(By.css('.clear-button'));
    clearButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.searchControl.value).toBeNull();
  });

  it('should contain navigation buttons if logged in', () => {
    spyOn(component, 'isLoggedIn').and.returnValue(true);
    fixture.detectChanges();

    const productButton = fixture.debugElement.query(By.css('button[routerLink="/products"]'));
    const cartButton = fixture.debugElement.query(By.css('button[routerLink="/cart"]'));
    const aboutButton = fixture.debugElement.query(By.css('button[routerLink="/about"]'));
    const contactButton = fixture.debugElement.query(By.css('button[routerLink="/contact-us"]'));
    const logoutButton = fixture.debugElement.query(By.css('button[routerLink=""]'));

    expect(productButton).toBeTruthy();
    expect(cartButton).toBeTruthy();
    expect(aboutButton).toBeTruthy();
    expect(contactButton).toBeTruthy();
    expect(logoutButton).toBeTruthy();
  });
});
