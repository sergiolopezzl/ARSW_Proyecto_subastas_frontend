import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';
import { WebSocketService } from '../services/web-socket.service';
import { Subscription } from 'rxjs';
import { ProductOffer } from '../models/productOffer';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  productId: any;
  product: any;
  bidAmount: any;
  responseMessage: string | undefined;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiserviceService,
    private webSocketService: WebSocketService,
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.fetchProductDetail();
    });

    this.webSocketService.newOffer.subscribe((offer: Product) => {
      console.log('Received offer:', offer);
      if (this.product && offer && offer.id === this.productId) {
        const existingOfferIndex = this.product.offers.findIndex((o: ProductOffer) => o.user.username === offer.buyer.username);
        if (existingOfferIndex !== -1) {
          this.product.offers[existingOfferIndex] = offer;
        } else {
          this.product.offers.push(offer);
        }
        this.sortAndDeduplicateOffers();
        this.changeDetector.detectChanges();
      }
    });
    
    const intervalId = setInterval(() => {
      if (this.product) {
        this.updateTimer();
        this.changeDetector.detectChanges();
      }
    }, 1000);
    this.subscriptions.add({ unsubscribe: () => clearInterval(intervalId) });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  fetchProductDetail(): void {
    
    this.apiService.getPoductDetail(this.productId).subscribe(
      (response: any) => {
        if (response.success) {
          this.product = response.product;
          this.sortAndDeduplicateOffers();
          this.updateTimer();
        } else {
          console.error('Failed to fetch product details');
        }
      },
      (error: any) => {
        console.error('Error fetching product detail', error);
      }
    );
  }
  

  placeBid(): void {
    const user = localStorage.getItem('user');
    if (!user) {
      console.error('User not logged in');
      return;
    }

    try {
      const parsedUser = JSON.parse(user);
      const userId = parsedUser.id;
        this.apiService.placeBid(this.productId, userId, this.bidAmount).subscribe(response => {
          this.responseMessage = response.responseMessage;
          this.product = response;
          this.webSocketService.newOffer.next(response);
          if (response.success) {
            console.log('Bid placed successfully');
            this.fetchProductDetail();
          } else {
            console.error('Failed to place bid');
          }
        }, error => {
          this.responseMessage = error.error.responseMessage;
          console.error('Error placing bid', error);
        })
    } catch (error) {
      console.error('Error parsing user data from local storage', error);
    }
  }

  private sortAndDeduplicateOffers(): void {

    const offersMap = new Map();
    this.product.offers.forEach((offer: ProductOffer) => {
      const existingOffer = offersMap.get(offer.user.username);
      if (!existingOffer || offer.amount > existingOffer.amount) {
        offersMap.set(offer.user.username, offer);
      }
    });

    this.product.offers = Array.from(offersMap.values());
    this.product.offers.sort((a: any, b: any) => b.amount - a.amount);
  }

  private updateTimer(): void {
    const now = new Date().getTime();
    const distance = new Date(this.product.endDate).getTime() - now;

    if (distance < 0) {
      this.product.timeLeft = 'EXPIRED';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.product.timeLeft = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

}
