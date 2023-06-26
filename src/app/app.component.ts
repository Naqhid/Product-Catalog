import { Component, VERSION } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observer } from 'rxjs';

interface Product {
  name: string;
  images: string;
  price: number;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  products: Product[] = [];
  cartItems: Product[] = [];
  isCartPopupOpen: boolean = false;

  constructor(private http: HttpClient) {
    this.fetchProducts();
  }

  fetchProducts() {
    this.http.get<Product[]>('https://dummyjson.com/products').subscribe({
      next: (response) => {
        this.products = response['products'];
        console.log('this.products', this.products);
      },
      error: (error: any) => {
        console.log('Error fetching products:', error);
        
      },
    });
  }

  // Function to toggle the cart popup
  toggleCartPopup() {
    this.isCartPopupOpen = !this.isCartPopupOpen;
  }

  addToCart(product: Product) {
    this.cartItems.push(product);
  }

  removeFromCart(product: Product) {
    const index = this.cartItems.indexOf(product);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }

  calculateTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }
}
