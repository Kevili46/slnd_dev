import { Injectable, WritableSignal, Signal, signal, computed, effect } from '@angular/core';
import { Chat } from '../models/Chat.model';
import { Message } from '../models/Message.model';
import { ROLE } from '../models/Roles.model';
import { Participant } from '../models/Participant.model';

@Injectable({
  providedIn: 'root',
})
export class AgentService {

  private _chat: WritableSignal<Chat | undefined> = signal(undefined);

  private _agentOpen: WritableSignal<boolean> = signal(false);
  public readonly agentOpen: Signal<boolean> = this._agentOpen.asReadonly();

  private _typing: WritableSignal<boolean> = signal(false);
  public readonly typing: Signal<boolean> = this._typing.asReadonly();

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

  public createMessage(text: string, author?: Participant) {
    const user: Participant | undefined = this._chat()?.participants[0];
    const validAuthor: Participant | undefined = author ?? user;

    if (!validAuthor) {
      return;
    }

    const message: Message = {
      text,
      author: validAuthor,
      date: new Date(),
    }

    this._chat.update((current) =>
      current ? { ...current, history: [...current.history, message] } : current);
  }

  private initChat() {
    const user: Participant = {
      name: 'You',
      role: ROLE.USER,
    }
    const system: Participant = {
      name: 'Kevin',
      role: ROLE.SYSTEM,
      img: '/assets/img/kevin_portrait.jpg'
    }

    const chat: Chat = {
      id: this.chatId++,
      participants: [user, system],
      history: [],
    }

    this._chat.set(chat);
  }

}
