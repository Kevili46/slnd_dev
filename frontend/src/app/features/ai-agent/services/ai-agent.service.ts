import { Injectable, WritableSignal, Signal, signal, computed, effect, inject } from '@angular/core';
import { Chat } from '../models/Chat.model';
import { Message } from '../models/Message.model';
import { ROLE } from '../models/Roles.model';
import { Participant } from '../models/Participant.model';
import { AiAgentHttpService } from './ai-agent-http.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AiAgentService {

  private aiAgentHttpService: AiAgentHttpService = inject(AiAgentHttpService);

  private _chat: WritableSignal<Chat | undefined> = signal(undefined);

  private _agentOpen: WritableSignal<boolean> = signal(false);
  public readonly agentOpen: Signal<boolean> = this._agentOpen.asReadonly();

  private _typing: WritableSignal<boolean> = signal(false);
  public readonly typing: Signal<boolean> = this._typing.asReadonly();

  public readonly online: Signal<boolean> = this.aiAgentHttpService.online;

  public readonly history: Signal<Message[] | undefined> = computed(() => {
    return this._chat()?.history;
  });
  public readonly participants: Signal<Participant[] | undefined> = computed(() => {
    return this._chat()?.participants;
  })

  private chatId: number = 0;

  constructor() {
    this.initChat();
  }

  public toggleAgent() {
    this._agentOpen.update(current => !current);
  }

  public startTyping() {
    this._typing.set(true);
  }

  public stopTyping() {
    this._typing.set(false);
  }

  public async sendMessage(query: string) {
    const chat = this._chat();
    if (!chat) {
      return;
    }
    this.createMessage(query, chat.participants[1]);
    this._typing.set(true);
    try {
      const response = await firstValueFrom(this.aiAgentHttpService.sendChatPrompt(query));

      if (response.success) {
        this.createMessage(response.data, chat.participants[0]);
      }
    } catch (err) {
      console.error('AI AGENT ERROR: ', err)
    } finally {
      this._typing.set(false);
    }

  }

  private createMessage(text: string, author: Participant) {
    const message: Message = {
      text,
      author,
      date: new Date(),
    }

    this._chat.update((current) =>
      current ? { ...current, history: [...current.history, message] } : current);
  }

  private initChat() {
    const system: Participant = {
      name: 'Kevin',
      role: ROLE.SYSTEM,
      img: '/assets/img/kevin_portrait.jpg'
    }
    const user: Participant = {
      name: 'You',
      role: ROLE.USER,
    }

    const chat: Chat = {
      id: this.chatId++,
      participants: [system, user],
      history: [],
    }

    this._chat.set(chat);
  }

}
