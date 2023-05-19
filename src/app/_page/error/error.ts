import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cuatro-cero-tres',
  templateUrl: './error.html',
  styleUrls: ['./error.css'],
})
export class Error implements OnInit {
  constructor(private route: ActivatedRoute) {}

  title!: string;
  mensaje!: string;
  ngOnInit(): void {
    const type = this.route.snapshot.paramMap.get('type')!;
    this.title = type;
    if (type === '403') {
      this.mensaje =
        'No posee los permisos necesarios, comuniquese con el administrador de la página.';
    }
  }
}
