import { Injectable, signal, Signal } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '@environments/environment';
import { catchError, EMPTY, Observable, Subject } from 'rxjs';
import { ClientAgentRequest } from '@slnd/shared';

@Injectable({ providedIn: 'root' })
export class AiAgentWSService {
  private socket$?: WebSocketSubject<any>;

  private agentProxy$ = new Subject<any>();

  private _online = signal(false);
  public readonly online: Signal<boolean> = this._online.asReadonly();

  public connect() {
    if (this.online()) return;

    this.socket$ = webSocket({
      url: `${environment.wsUrl}/ai-agent`,
      openObserver: {
        next: () => {
          this._online.set(true);
        }
      },
      closeObserver: {
        next: () => {
          this._online.set(false);
        }
      }
    });

    this.socket$.pipe(
      catchError((err) => {
        this._online.set(false);
        return EMPTY;
      })
    ).subscribe(this.agentProxy$);
  }

  public get agentStream$(): Observable<any> {
    return this.agentProxy$.asObservable();
  }

  public sendMessage(data: ClientAgentRequest): void {
    if (this._online() && this.socket$) {
      this.socket$.next(data);
    }
  }
}