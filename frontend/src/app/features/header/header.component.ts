import { Component, inject, Signal } from '@angular/core';
import { UtilityService } from '#core/services/utility.service.js';
import { NavComponent } from '#features/header/ui/nav/nav.component.js';
import { ActionsComponent } from '#features/header/ui/actions/actions.component.js';
import { IconComponent } from '#shared/features/icon/icon.component.js';

import { ICON } from '#shared/features/icon/models/icon.model.js';

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
