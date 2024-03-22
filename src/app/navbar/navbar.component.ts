import { Component, OnInit } from '@angular/core';
declare var $: any; // Declara jQuery como una variable global

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const self: NavbarComponent = this; // Anotación de tipo explícita para 'this'

    $(document).ready(function(this: NavbarComponent) { // Anotación de tipo explícita para 'this' dentro de la función de callback
      // Resaltar el enlace activo
      $('.navbar-nav .nav-link').on('click', () => {
        $('.navbar-nav').find('.active').removeClass('active');
        $(this).addClass('active');
      });

      // Cerrar el menú desplegable al hacer clic en un enlace
      $('.navbar-nav>li>a').on('click', function(){
        $('.navbar-collapse').collapse('hide');
      });
    }.bind(this));
  }
}
