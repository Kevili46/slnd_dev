import { Component, inject, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilityService } from '@core/services/utility.service';
import { NavItemComponent } from '../../../../shared/features/nav-item/nav-item.component';
import { NavRoute } from '../../../../shared/features/nav-item/models/nav-route.model';
import { mainNavRoutes } from './data/mainNavRoutes';

@Component({
  selector: 'slnd-nav',
  imports: [NavItemComponent, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

  private utilityService: UtilityService = inject(UtilityService);

  public readonly menuOpen = this.utilityService.menuOpen;
  public readonly mainNavRoutes: Signal<NavRoute[]> = signal(mainNavRoutes);

  constructor() {
  }

  public toggleMenu(): void {
    this.utilityService.toggleMenu();
  }
}
