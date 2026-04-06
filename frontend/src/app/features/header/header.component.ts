import { Component, inject, Signal } from '@angular/core';
import { UtilityService } from '@core/services/utility.service';
import { NavComponent } from './ui/nav/nav.component';
import { ActionsComponent } from './ui/actions/actions.component';
import { IconComponent } from '@shared/features/icon/icon.component';

import { ICON } from '@shared/features/icon/models/icon.model';

@Component({
  selector: 'slnd-header',
  imports: [NavComponent, ActionsComponent, IconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: {
    "[class.float]": "floatHeader()",
  },
})
export class HeaderComponent {

  private utilityService: UtilityService = inject(UtilityService);
  public readonly floatHeader: Signal<boolean> = this.utilityService.floatHeader;

  protected readonly ICON = ICON;

}
