import { Component, inject, WritableSignal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConsentService } from '../../core/services/consent.service';

@Component({
  selector: 'slnd-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  private consentService: ConsentService = inject(ConsentService);

  private _year: WritableSignal<number | undefined> = signal(undefined);
  public readonly year = this._year.asReadonly();

  constructor() {
    this._year.set(new Date().getFullYear());
  }

  public openConsentBanner() {
    this.consentService.openConsentBanner();
  }

}
