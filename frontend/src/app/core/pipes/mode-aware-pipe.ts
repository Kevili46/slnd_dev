import { inject, Pipe, PipeTransform, Signal } from '@angular/core';
import { UtilityService } from '@core/services/utility.service';

@Pipe({
  name: 'modeAware',
  pure: false
})
export class ModeAwarePipe implements PipeTransform {

  private utilityService: UtilityService = inject(UtilityService);

  public readonly darkMode: Signal<boolean> = this.utilityService.darkMode;

  transform(value: unknown, shouldTransform: boolean = false): string | unknown {
    if (typeof value !== 'string' || !shouldTransform) {
      return value;
    }

    if (this.darkMode()) {
      return value.replace(/\.svg$/, '-inverse.svg');
    }

    return value;
  }

}
