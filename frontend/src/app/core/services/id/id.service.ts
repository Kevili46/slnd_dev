import { inject, Injectable, signal, Signal, WritableSignal, computed } from '@angular/core';
import { IdHttpService } from '@core/services/id/id-http.service';
import { UserData, IdResponse, defaultOptions } from '@slnd/shared';
import { UtilityService } from '../utility.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { catchError, debounceTime, distinctUntilChanged, of, skip, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IdService {

  private utilityService: UtilityService = inject(UtilityService);
  private idHttpService: IdHttpService = inject(IdHttpService);

  private _userData: WritableSignal<UserData | undefined> = signal(undefined);
  public readonly userData: Signal<UserData | undefined> = this._userData.asReadonly();
  public readonly currentUIOptions: Signal<UserData['options']> = this.utilityService.currentUIOptions;

  public readonly userOptions: Signal<UserData['options']> = computed(() => {
    const options: UserData['options'] | undefined = this.userData()?.options;
    return options || defaultOptions;
  })

  constructor() {
    toObservable(this.currentUIOptions).pipe(
      skip(2),
      debounceTime(1000),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
      switchMap(options => {
        const optionsPayload = {
          ...options
        };
        return this.idHttpService.patchUserData(optionsPayload).pipe(
          catchError(err => {
            console.error('Failed to sync user settings to DB', err);
            return of(null);
          })
        );
      })
    ).subscribe();
  }

  private readonly TOKEN_KEY = 'SLND.Token';

  public async initializeUser() {
    this.idHttpService.initializeUser().subscribe({
      next: (response: IdResponse) => {
        this._userData.set(response.userData);
        this.utilityService.updateUIOptions(response.userData.options);
        if (response.token) {
          localStorage.setItem(this.TOKEN_KEY, response.token);
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
