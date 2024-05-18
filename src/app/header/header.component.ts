import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] 
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  showModal = false;
  username: string = '';
  walletAmount: number = 0;

  constructor(private router: Router) { }

  logout(): void {
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.loadUserData();
  }

  loadUserData(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.username && user.walletAmount !== undefined) {
      this.username = user.username;
      this.walletAmount = user.walletAmount;
    }
  }

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      this.isLoggedIn = !!localStorage.getItem('user');
      this.loadUserData();
    }
  }
}