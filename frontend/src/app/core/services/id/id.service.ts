import { inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { IdHttpService } from './id-http.service';
import { IdResponse, UserData } from '@slnd/core/models';
import { UtilityService } from '../utility.service';
import { ConsentSettings } from 'src/app/archive/consent/models/consent-settings.model';

@Injectable({
  providedIn: 'root',
})
export class IdService {

  private idHttpService: IdHttpService = inject(IdHttpService);
  private utilityService: UtilityService = inject(UtilityService);

  private _userData: WritableSignal<UserData | undefined> = signal(undefined);
  public readonly userData: Signal<UserData | undefined> = this._userData.asReadonly();

  private readonly TOKEN_KEY = 'SLND.Token';

  public initializeUser() {
    const existingToken = this.getToken();
    this.idHttpService.initializeUser(existingToken).subscribe({
      next: (response: IdResponse) => {
        this._userData.set(response.userData);
        if (response.token) {
          localStorage.setItem(this.TOKEN_KEY, response.token);
        }
        this.utilityService.toggleDarkMode(response.userData.data.theme == 'dark');
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public saveConsentSettings(consentSettings: ConsentSettings) {
    this.idHttpService.postConsentSettings(consentSettings);
  }

}
