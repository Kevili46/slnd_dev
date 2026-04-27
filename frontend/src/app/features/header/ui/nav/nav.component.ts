import { Component, inject, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilityService } from '@core/services/utility.service';
import { NavItemComponent } from '@shared/features/nav-item/nav-item.component';
import { NavRoute } from '@shared/features/nav-item/models/nav-route.model';
import { mainNavRoutes } from '@features/header/ui/nav/data/mainNavRoutes.js';
import { ButtonComponent } from "@shared/features/button/button.component";
import { ICON } from '@shared/features/icon/models/icon.model';

@Component({
  selector: 'slnd-nav',
  imports: [NavItemComponent, CommonModule, ButtonComponent],
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

  protected readonly ICON = ICON;
}
