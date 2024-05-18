import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sold-product',
  templateUrl: './sold-product.component.html',
  styleUrl: './sold-product.component.css'
})
export class SoldProductComponent implements OnInit, OnDestroy {
  products: any[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(private apiService: ApiserviceService) {}

  ngOnInit(): void {
    this.fetchSoldProducts();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  fetchSoldProducts(): void {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user || !user.id) {
        console.error('User not logged in or invalid user data');
        return;
      }

      const fetchSub = this.apiService.getSoldProducts(user.id).subscribe(response => {
        if (response.success) {
          this.products = response.products;
        } else {
          console.error('Failed to fetch sold products');
        }
      }, error => {
        console.error('Error fetching sold products', error);
      });

      this.subscriptions.add(fetchSub);
    } catch (error) {
      console.error('Error parsing user data from localStorage', error);
    }
  }
}