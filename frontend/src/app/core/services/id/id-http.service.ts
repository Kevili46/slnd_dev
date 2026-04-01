import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IdResponse } from '@slnd/core/models';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { ConsentSettings } from '@features/consent/models/consent-settings.model';

@Injectable({
  providedIn: 'root',
})
export class IdHttpService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.httpUrl}/id`;

  public initializeUser(token: string | null): Observable<IdResponse> {

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get<IdResponse>(`${this.apiUrl}/init`, { headers });
  }

  public postConsentSettings(consentSettings: ConsentSettings) {
    return;
  }
}