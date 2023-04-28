import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor() { }
  ngOnInit(): void { }
   
  imgCollection: Array<object> = [
      {
        image: 'https://loremflickr.com/g/600/400/paris',
        thumbImage: 'https://loremflickr.com/g/1200/800/paris',
        alt: 'Image 1',
        title: 'Image 1'
      }, {
        image: 'https://loremflickr.com/600/400/brazil,rio',
        thumbImage: 'https://loremflickr.com/1200/800/brazil,rio',
        title: 'Image 2',
        alt: 'Image 2'
      }, {
        image: 'https://loremflickr.com/600/400/paris,girl/all',
        thumbImage: 'https://loremflickr.com/1200/800/brazil,rio',
        title: 'Image 3',
        alt: 'Image 3'
      }, {
        image: 'https://loremflickr.com/600/400/brazil,rio',
        thumbImage: 'https://loremflickr.com/1200/800/brazil,rio',
        title: 'Image 4',
        alt: 'Image 4'
      }, {
        image: 'https://loremflickr.com/600/400/paris,girl/all',
        thumbImage: 'https://loremflickr.com/1200/800/paris,girl/all',
        title: 'Image 5',
        alt: 'Image 5'
      }
  ];
}
