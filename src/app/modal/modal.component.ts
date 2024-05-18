import { Component, Output, EventEmitter } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  amount: number = 0;
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(private apiService: ApiserviceService, private router: Router) { }

  closeModal(): void {
    this.close.emit();
  }

  addFunds(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
      console.error('User not logged in or invalid user data');
      return;
    }

    this.apiService.updateWalletAmount(user.id, user.walletAmount + this.amount).subscribe(response => {
      if (response.success) {
        user.walletAmount += this.amount;
        localStorage.setItem('user', JSON.stringify(user));
        alert('Wallet updated successfully!');
        this.closeModal(); // Close modal after adding funds
      } else {
        alert(response.responseMessage);
      }
    }, error => {
      console.error('Error updating wallet', error);
    });
  }
}