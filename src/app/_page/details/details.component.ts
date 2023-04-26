import { Component } from '@angular/core';

interface Car {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  priced?: number;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class Details01Component {

  title = 'HOMBRE';

  images: any[] = [
    {
      previewImageSrc:
        '../assets/details/prenda01.png',
      thumbnailImageSrc:
        '../assets/details/prenda01.png',
      alt: 'Description for Image 1',
      title: 'Title 1'
    },
    {
      previewImageSrc:
        './assets/details/prenda01.png',
      thumbnailImageSrc:
        './assets/details/prenda01.png',
      alt: 'Description for Image 2',
      title: 'Title 2'
    },
    {
      previewImageSrc:
        './assets/details/prenda01.png',
      thumbnailImageSrc:
        './assets/details/prenda01.png',
      alt: 'Description for Image 3',
      title: 'Title 3'
    },
  ];

  cars: Car[] = [];

  constructor() { }

  ngOnInit() {
    this.cars = [
      {
        id: '1',
        name: 'Chompa 1',
        description: 'Chompa Prueba N°1',
        price: 150,
        priced: 95,
      },
      {
        id: '2',
        name: 'Chompa 2',
        description: 'Chompa Prueba N°5',
        price: 160,
        priced: 100,
      },
      {
        id: '3',
        name: 'Chompa 3',
        description: 'Chompa Prueba N°3',
        price: 170,
        priced: 105,
      },
    ];
  }
}
