import { Component, inject } from '@angular/core';
import { UtilityService } from '#core/services/utility.service';

@Component({
  selector: 'slnd-actions',
  imports: [],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss',
})
export class ActionsComponent {

  private utilityService: UtilityService = inject(UtilityService);

  public toggleDarkMode() {
    this.utilityService.toggleDarkMode();
  }

}
