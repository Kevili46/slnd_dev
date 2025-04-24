import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConsentService } from '../../services/consent.service';

@Component({
  selector: 'slnd-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  consentService: ConsentService = inject(ConsentService);
  year: number;

  constructor() {
    this.year = new Date().getFullYear();
  }

}
