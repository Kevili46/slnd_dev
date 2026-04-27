import { Injectable, signal, Signal } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '@environments/environment';
import { catchError, EMPTY, Observable, Subject, Subscription } from 'rxjs'; // Import Subscription
import { ClientAgentRequest } from '@slnd/shared';

@Injectable({ providedIn: 'root' })
export class AiAgentWSService {

  private _online = signal(false);
  public readonly online: Signal<boolean> = this._online.asReadonly();

  private socket$?: WebSocketSubject<any>;
  private socketSubscription?: Subscription;

  private agentProxy$ = new Subject<any>();

  public connect() {

    if (this.online()) return;

    this.closeConnection();

    this.socket$ = webSocket({
      url: `${environment.wsUrl}/ai-agent`,
      openObserver: { next: () => this._online.set(true) },
      closeObserver: { next: () => this._online.set(false) }
    });

    this.socketSubscription = this.socket$.pipe(
      catchError((err) => {
        this._online.set(false);
        return EMPTY;
      })
    ).subscribe({
      next: (msg) => this.agentProxy$.next(msg)
    });
  }

  public closeConnection() {
    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe();
      this.socketSubscription = undefined;
    }
    if (this.socket$) {
      this.socket$.complete();
      this.socket$ = undefined;
    }
    this._online.set(false);
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