import { Injectable, WritableSignal, Signal, signal, computed, effect, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AiAgentWSService } from '@features/ai-agent/services/ai-agent-ws.service';
import { Chat } from '@features/ai-agent/models/chat.model';
import { Message } from '@features/ai-agent/models/message.model';
import { ROLE } from '@features/ai-agent/models/roles.model';
import { Participant } from '@features/ai-agent/models/participant.model';
import { AgentClientResponse } from '@features/ai-agent/models/agent-client-response.model';
import { WS_DATA } from '@features/ai-agent/models/ws-data-type.model';
import { WS_STATUS } from '@features/ai-agent/models/ws-status.model';

@Injectable({ providedIn: 'root' })
export class AiAgentService {
  private aiAgentWSService = inject(AiAgentWSService);

  private _chat: WritableSignal<Chat | undefined> = signal(undefined);
  private _agentOpen: WritableSignal<boolean> = signal(false);
  public readonly agentOpen: Signal<boolean> = this._agentOpen.asReadonly();
  private _typing: WritableSignal<boolean> = signal(false);
  public readonly typing: Signal<boolean> = this._typing.asReadonly();

  public readonly online: Signal<boolean> = this.aiAgentWSService.online;
  public readonly history: Signal<Message[] | undefined> = computed(() => this._chat()?.history);
  public readonly participants: Signal<Participant[] | undefined> = computed(() => this._chat()?.participants);

  constructor() {
    this.initChat();

    this.aiAgentWSService.agentStream$
      .pipe(takeUntilDestroyed())
      .subscribe((response: AgentClientResponse) => {
        const chat = this._chat();
        if (response.type === WS_DATA.STATUS) {
          if (response.data == WS_STATUS.OK) {
            this._typing.set(true);
          }
        }
        if (response.type === WS_DATA.AI_RESPONSE && chat) {
          this.createMessage(response.data, chat.participants[0]);
          this._typing.set(false);
        }
      });

    effect(() => {
      if (this.agentOpen() && !this.online()) {
        this.aiAgentWSService.connect();
      }
    });
  }

  public toggleAgent() { this._agentOpen.update(current => !current); }

  public sendMessage(query: string) {
    const chat = this._chat();
    if (!chat || !query.trim()) return;

    this.createMessage(query, chat.participants[1]);

    this.aiAgentWSService.sendMessage({
      type: WS_DATA.USER_QUERY,
      query: query
    });
  }

  private initChat() {
    const system: Participant = { name: 'Kevin', role: ROLE.SYSTEM, img: '/assets/img/kevin_portrait.jpg' };
    const user: Participant = { name: 'You', role: ROLE.USER };
    const chat: Chat = { participants: [system, user], history: [] };
    this._chat.set(chat);
  }

  private createMessage(text: string, author: Participant) {
    const message: Message = { text, author, date: new Date() };
    this._chat.update((current) =>
      current ? { ...current, history: [...current.history, message] } : current
    );
  }
}