import { Component } from '@angular/core';
import { ApiserviceService } from '../../services/apiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData = { username: '', password: '' };
  responseMessage: string = '';
  isSuccess: boolean = false;

  constructor(private apiService: ApiserviceService,private router: Router) { }

  onSubmit() {
    this.apiService.loginUser(this.loginData).subscribe(response => {
      console.log('Inicio Exitoso', response);
      this.responseMessage = response.responseMessage;
      this.isSuccess = response.success;
      if (response.success) {
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/available-products']);
      }
    }, error => {
      console.error('Inicio Fallido', error);
      this.responseMessage = 'Inicio de Sesion fallido. Intenta de nuevo';
      this.isSuccess = false;
    });
  }
}