import { Component, inject, input, InputSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavRoute } from '../models/navRoute.model';
import { UtilityService } from '@core/services/utility.service';

@Component({
  selector: 'slnd-nav-item',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss',
  host: {
    '(click)': 'toggleMenu()',
  }
})
export class NavItemComponent {

  private utilityService: UtilityService = inject(UtilityService);

  public readonly navRoute: InputSignal<NavRoute> = input.required();

  public toggleMenu() {
    this.utilityService.toggleMenu();
  }

}
