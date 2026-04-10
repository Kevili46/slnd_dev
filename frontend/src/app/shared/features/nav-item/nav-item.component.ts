import { Component, inject, input, InputSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavRoute } from '#shared/features/nav-item/models/nav-route.model';
import { UtilityService } from '#core/services/utility.service';

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
  public readonly mainNav: InputSignal<boolean> = input(false);

  public toggleMenu() {
    this.utilityService.toggleMenu();
  }

}
