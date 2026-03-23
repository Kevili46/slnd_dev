import { Injectable, computed, effect, inject } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment'
import { ApiHealthResponse } from '@core/models/ApiHealthResponse.model';

@Injectable({ providedIn: 'root' })
export class AiAgentHttpService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/ai-agent`;

  public readonly health = httpResource<ApiHealthResponse>(() => `${this.apiUrl}/health`);

  public readonly online = computed(() => {
    return this.health.value()?.status === 'UP';
  });

  public sendChatPrompt(query: string): Observable<AiAgentResponse> {
    return this.http.post<AiAgentResponse>(`${this.apiUrl}/sendMessage`, { query });
  }
}