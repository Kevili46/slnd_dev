import { Component, computed, effect, inject, signal, Signal, WritableSignal } from '@angular/core';

import { RouterLink } from '@angular/router';
import { ConsentSettings } from '@archive/consent/models/consent-settings.model';
import { ConsentArgs } from '@archive/consent/models/consent-args.model';
import { IdService } from '@core/services/id/id.service';
import { UtilityService } from '@core/services/utility.service';
import { ToggleButtonComponent } from "@shared/features/toggle-button/toggle-button.component";
// import { ButtonComponent } from "#shared/features/button/button.component";
import { BUTTON } from '@shared/features/button/models/button-type.model';
import { UserData } from '@slnd/shared';

@Component({
  selector: 'slnd-consent',
  imports: [RouterLink, ToggleButtonComponent],
  templateUrl: './consent.component.html',
  styleUrl: './consent.component.scss',
  host: {
    '[class.slnd-bubble-back]': 'true',
  }
})
export class ConsentComponent {

  private idService: IdService = inject(IdService);
  private utilityService: UtilityService = inject(UtilityService);

  private _displayConsentSettings: WritableSignal<ConsentSettings> = signal({ functional: false, analytics: false });
  public readonly displayConsentSettings: Signal<ConsentSettings> = this._displayConsentSettings.asReadonly();

  public readonly currentConsentSettings: Signal<ConsentSettings> = computed(() => {
    const userData: UserData | undefined = this.idService.userData();
    const consentSettings: ConsentSettings = {
      functional: userData?.data.consent.functional ?? false,
      analytics: userData?.data.consent.analytics ?? false,
    }
    return consentSettings;
  });

  public readonly consentOpen: Signal<boolean> = this.utilityService.consentOpen;

  constructor() {
    effect(() => {
      this._displayConsentSettings.set(this.currentConsentSettings());
    })
  }

  public changeConsentSettings(args: ConsentArgs = {}) {
    this._displayConsentSettings.update((current) => {
      const base: ConsentSettings = current ?? { functional: false, analytics: false };
      return {
        functional: args.functional ?? base.functional,
        analytics: args.analytics ?? base.analytics,
      }
    })
  }

  public toggleConsentBanner() {
    this.utilityService.toggleConsentBanner();
  }

  // public saveConsentSettings() {
  //   this.idService.saveConsentSettings(this.displayConsentSettings());
  // }

  // public allowAll() {
  //   this.idService.saveConsentSettings({ functional: true, analytics: true });
  // }

  // public rejectAll() {
  //   this.idService.saveConsentSettings({ functional: false, analytics: false });
  // }

  protected readonly BUTTON = BUTTON;

}
