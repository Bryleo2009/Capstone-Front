import { Component, OnInit, EventEmitter } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { environment } from '@env/environment.development';
import { CarritoService } from '@app/_service/modelos/carrito.service';
import { AppComponent } from '@app/app.component';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  constructor(
    private carritoService: CarritoService,
    private general: AppComponent
  ){}
  tempEnviroment!: number;
  cantCarrito: string = '';
  ngOnInit(): void { 
    this.carritoService.carrito$.subscribe((valor) => {
      this.cantCarrito = valor.toString();
      console.log("🔥 > HeaderComponent > this.carritoService.carrito$.subscribe > this.cantCarrito:", this.cantCarrito)
      this.tempEnviroment = parseInt(this.cantCarrito, 10);
    });
    
    const menu: Element | null = document.querySelector('#mobile-menu');
    const menuLinks: Element | null = document.querySelector('.navbar_menu');
    const navLogo: Element | null = document.querySelector('#navbar_logo');

    const mobileMenu = (): void => {
      if (menu && menuLinks) {
        menu.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
      }
    };

    if (menu) {
      menu.addEventListener('click', mobileMenu);
    }

    //Show active menu when scrolling
    const highlightMenu = (): void => {
      const elem: Element | null = document.querySelector('.highlight');
      const homeMenu: Element | null = document.querySelector('#home-page');
      const aboutMenu: Element | null = document.querySelector('#store-page');
      const servicesMenu: Element | null =
        document.querySelector('#about-page');
      let scrollPos: number = window.scrollY;

      //Add'highlight' class to my menu items
      if (window.innerWidth > 960 && scrollPos < 600) {
        if (homeMenu && aboutMenu) {
          homeMenu.classList.add('highlight');
          aboutMenu.classList.remove('highlight');
        }
        return;
      } else if (window.innerWidth > 960 && scrollPos < 1400) {
        if (aboutMenu && homeMenu && servicesMenu) {
          aboutMenu.classList.add('highlight');
          homeMenu.classList.remove('highlight');
          servicesMenu.classList.remove('highlight');
        }
        return;
      } else if (window.innerWidth > 960 && scrollPos < 2345) {
        if (servicesMenu && aboutMenu) {
          servicesMenu.classList.add('highlight');
          aboutMenu.classList.remove('highlight');
        }
        return;
      }
      if ((elem && window.innerWidth < 960 && scrollPos < 600) || elem) {
        if (elem) {
          elem.classList.remove('highlight');
        }
      }
    };

    window.addEventListener('scroll', highlightMenu);
    window.addEventListener('click', highlightMenu);

    //Close mobile menu when clicking on menu item
    const hideMobileMenu = (): void => {
      const menuBars: Element | null = document.querySelector('.is-active');
      if (menuBars && menu && menuLinks) {
        if (window.innerWidth <= 768) {
          menu.classList.toggle('is-active');
          menuLinks.classList.remove('active');
        }
      }
    };

    if (menuLinks && navLogo) {
      menuLinks.addEventListener('click', hideMobileMenu);
      navLogo.addEventListener('click', hideMobileMenu);
    }

    /* Animations */

    gsap.registerPlugin(ScrollTrigger);

    gsap.to('.animate-text', {
      duration: 0.7,
      opacity: 0.1,
      x: -200,
      stagger: 0.4,
    });
  }
}
