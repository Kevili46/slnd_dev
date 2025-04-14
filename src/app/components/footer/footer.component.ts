import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'slnd-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  year: number;

  constructor() {
    this.year = new Date().getFullYear();
  }

}
