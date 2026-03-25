import { HttpClient, httpResource } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { ApiHealthResponse } from '@core/models/ApiHealthResponse.model';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IdHttpService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/id`;

  private readonly health = httpResource<ApiHealthResponse>(() => `${this.apiUrl}/health`);

  public readonly online = computed(() => {
    if (this.health.error() || this.health.isLoading()) {
      return false;
    }
    return this.health.value()?.status === 'UP' || false;
  });


  public initializeUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/init`);
  }

}
