import { Component, inject, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilityService } from '@core/services/utility.service';
import { NavItemComponent } from './nav-item/nav-item.component';
import { NavRoute } from './models/navRoute.model';
import { navRoutes } from './models/navRoutes';

@Component({
  selector: 'slnd-nav',
  imports: [NavItemComponent, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

  private utilityService: UtilityService = inject(UtilityService);

  public readonly menuOpen = this.utilityService.menuOpen;
  public readonly navRoutes: Signal<NavRoute[]> = signal(navRoutes);

  constructor() {
  }

  public toggleMenu(): void {
    this.utilityService.toggleMenu();
  }
}
