import { Component } from '@angular/core';

interface Car {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
}

@Component({
  selector: 'app-details01',
  templateUrl: './details01.component.html',
  styleUrls: ['./details01.component.css']
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
                description: 'Racing car',
                price: 800,
            },
            {
                id: '2',
                name: 'Chompa 2',
                description: 'The Prancing Horse',
                price: 1500,
            },
            {
                id: '3',
                name: 'Chompa 3',
                description: 'Full spectrum',
                price: 10000,
            },
            {
              id: '4',
              name: 'Chompa 4',
              description: 'Full spectrum',
              price: 100500,
          },
        ];
    }

}
