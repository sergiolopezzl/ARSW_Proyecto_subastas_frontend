import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-available-products',
  templateUrl: './available-products.component.html',
  styleUrl: './available-products.component.css'
})
export class AvailableProductsComponent implements OnInit, OnDestroy {
  products: any[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(private apiService: ApiserviceService,private router: Router, private WebSocketService: WebSocketService) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.WebSocketService.newProduct.subscribe(
      product => {
        this.products.push(product);
        this.updateTimer(product);
        const intervalId = setInterval(() => this.updateTimer(product), 1000);
      this.subscriptions.add({ unsubscribe: () => clearInterval(intervalId) });
      }
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  viewProductDetail(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  fetchProducts(): void {
    const fetchSub = this.apiService.getAvailableProducts().subscribe(response => {
      if (response.success) {
        this.products = response.products;
        this.products.forEach(product => {
          this.updateTimer(product);
          const intervalId = setInterval(() => this.updateTimer(product), 1000);
          this.subscriptions.add({ unsubscribe: () => clearInterval(intervalId) });
        });
      } else {
        console.error('Failed to fetch products');
      }
    }, error => {
      console.error('Error fetching products', error);
    });

    this.subscriptions.add(fetchSub);
  }

  updateTimer(product: any): void {
    const now = new Date().getTime();
    const distance = parseInt(product.endDate) - now;

    if (distance < 0) {
      product.timeLeft = 'EXPIRED';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    product.timeLeft = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
}