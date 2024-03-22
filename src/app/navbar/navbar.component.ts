import { Component, OnInit } from '@angular/core';
declare var $: any; // Declare jQuery as a global variable

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(document).ready(() => { // Use an arrow function instead of a regular function
      // Highlight the active link
      $('.navbar-nav .nav-link').on('click', () => {
        $('.navbar-nav').find('.active').removeClass('active');
        $(this).addClass('active'); // 'this' now refers to the component instance
      });

      // Close the dropdown menu when a link is clicked
      $('.navbar-nav>li>a').on('click', function(){
        $('.navbar-collapse').collapse('hide');
      });
    });
  }
}
