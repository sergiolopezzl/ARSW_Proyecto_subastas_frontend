import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import $ from 'jquery';
declare var bootstrap: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private renderer: Renderer2, private router: Router) { }

  ngOnInit(): void {
    $(document).ready(() => {
      // Highlight the active link
      $('.navbar-nav .nav-link').on('click', (e: Event) => {
        $('.navbar-nav .nav-link').removeClass('active');
        this.renderer.addClass(e.target as HTMLElement, 'active');
      });

      // Close the dropdown menu when a link is clicked
      $('.navbar-nav>li>a').on('click', (e: Event) => {
        const collapse = $(e.target as HTMLElement).closest('.collapse');
        if (collapse.hasClass('show')) {
          this.renderer.removeClass(collapse.get(0), 'show');
        }
      });

      // Collapse the dropdown menu when the toggler button is clicked
      $('.navbar-toggler').on('click', () => {
        const collapse = $('#navbarNav');
        if (collapse.hasClass('show')) {
          this.renderer.removeClass(collapse.get(0), 'show');
        }
      });
    });
  }
}
