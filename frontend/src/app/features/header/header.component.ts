import { Component, inject, Signal } from '@angular/core';
import { UtilityService } from '@core/services/utility.service';
import { NavComponent } from './nav/nav.component';
import { IconComponent } from '@shared/features/icon/icon.component';
import { ICON } from '@shared/features/icon/models/icon.model';

@Component({
  selector: 'slnd-header',
  imports: [NavComponent, IconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: {
    "[class.float]": "floatHeader()",
  },
})
export class HeaderComponent {

  private utilityService: UtilityService = inject(UtilityService);
  public readonly floatHeader: Signal<boolean> = this.utilityService.floatHeader;

  public toggleDarkMode() {
    this.utilityService.toggleDarkMode();
  }

  protected readonly ICON = ICON;

}
