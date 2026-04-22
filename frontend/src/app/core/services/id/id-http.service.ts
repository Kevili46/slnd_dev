import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { IdResponse, UserData } from '@slnd/shared';

@Injectable({
  providedIn: 'root',
})
export class IdHttpService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.httpUrl}/id`;

  private readonly TOKEN_KEY = 'SLND.Token';

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public initializeUser(): Observable<IdResponse> {
    const token = this.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get<IdResponse>(`${this.apiUrl}/init`, { headers });
  }

  public patchUserData(options: Partial<UserData['options']>): Observable<any> {
    const token = this.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.patch(`${this.apiUrl}/user-data`, { options }, { headers });
  }
}