import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-unsold-product',
  templateUrl: './unsold-product.component.html',
  styleUrl: './unsold-product.component.css'
})
export class UnsoldProductComponent implements OnInit, OnDestroy {
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

      const fetchSub = this.apiService.getUnSoldProducts(user.id).subscribe(response => {
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