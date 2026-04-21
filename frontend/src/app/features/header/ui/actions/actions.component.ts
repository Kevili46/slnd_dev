import { Component, inject, Signal } from '@angular/core';
import { UtilityService } from '@core/services/utility.service';
import { ButtonComponent } from "@shared/features/button/button.component";
import { ICON } from '@shared/features/icon/models/icon.model';

@Component({
  selector: 'slnd-actions',
  imports: [ButtonComponent],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss',
})
export class ActionsComponent {

  private utilityService: UtilityService = inject(UtilityService);

  public readonly darkMode: Signal<boolean> = this.utilityService.darkMode;

  public toggleDarkMode() {
    this.utilityService.toggleDarkMode();
  }
  protected readonly ICON = ICON;

}
