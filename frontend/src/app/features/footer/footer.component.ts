import { Component, inject, WritableSignal, signal, Signal } from '@angular/core';
import { UtilityService } from '#core/services/utility.service';
import { footerNavRoutes } from './data/footerNavRoutes';
import { NavRoute } from '#shared/features/nav-item/models/nav-route.model';
import { NavItemComponent } from "#shared/features/nav-item/nav-item.component";


@Component({
  selector: 'slnd-footer',
  imports: [NavItemComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  private utilityService: UtilityService = inject(UtilityService);

  private _year: WritableSignal<number | undefined> = signal(undefined);
  public readonly year = this._year.asReadonly();

  public readonly footerNavRoutes: Signal<NavRoute[]> = signal(footerNavRoutes);

  constructor() {
    this._year.set(new Date().getFullYear());
  }

  public openConsentBanner() {
    this.utilityService.toggleConsentBanner();
  }

}
