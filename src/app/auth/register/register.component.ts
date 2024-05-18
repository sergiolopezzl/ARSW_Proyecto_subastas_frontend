import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiserviceService } from '../../services/apiservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerData = { username: '', password: '' };
  responseMessage: string = '';
  isSuccess: boolean = false;

  constructor(private apiService: ApiserviceService) { }

  onSubmit() {
    this.apiService.registerUser(this.registerData).subscribe(response => {
      console.log('Registro Exitoso', response);
      this.responseMessage = response.responseMessage;
      this.isSuccess = response.success;
    }, error => {
      console.error('Registro Fallido', error);
      this.responseMessage = 'Registro fallido. Intenta de nuevo.';
      this.isSuccess = false;
    });
  }
}
