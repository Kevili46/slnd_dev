import { Component, inject, WritableSignal, signal } from '@angular/core';
import { RouterLink } from '@angular/router'; import { UtilityService } from '@core/services/utility.service';


@Component({
  selector: 'slnd-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  private utilityService: UtilityService = inject(UtilityService);

  private _year: WritableSignal<number | undefined> = signal(undefined);
  public readonly year = this._year.asReadonly();

  constructor() {
    this._year.set(new Date().getFullYear());
  }

  public openConsentBanner() {
    this.utilityService.toggleConsentBanner();
  }

}
