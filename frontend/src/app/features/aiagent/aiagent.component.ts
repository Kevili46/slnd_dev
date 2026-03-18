import { Component, ElementRef, inject, Signal, viewChild, computed, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { ConsentService } from '../../core/services/consent.service';
import { IconComponent } from '@shared/features/icon/icon.component';
import { ChatHistoryComponent } from './ui/chat-history/chat-history.component';
import { ICON } from '@shared/features/icon/models/icon.model';
import { AgentService } from './services/agent.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'slnd-aiagent',
  imports: [CommonModule, FormsModule, IconComponent, ChatHistoryComponent],
  templateUrl: './aiagent.component.html',
  styleUrl: './aiagent.component.scss',
  host: {
    '[class.active]': 'agentOpen()'
  }
})
export class AiagentComponent {

  private cookies: CookieService = inject(CookieService);
  private agentService: AgentService = inject(AgentService);

  public agentEl: Signal<ElementRef> = viewChild.required('agent', { read: ElementRef });
  public queryInput: Signal<ElementRef> = viewChild.required('queryInput', { read: ElementRef });

  public query: WritableSignal<string> = signal<string>('');

  public readonly agentOpen: Signal<boolean> = this.agentService.agentOpen;
  public readonly submitDisabled: Signal<boolean> = computed(() => {
    const emptyInput: boolean = this.query().trim().length === 0;
    return emptyInput || this._submitOnTheWay();
  });

  private _submitOnTheWay: WritableSignal<boolean> = signal(false);

  public toggleAgent(): void {
    this.agentService.toggleAgent();
  }

  public submitQuery() {
    this.agentService.createMessage(this.query());
    this._submitOnTheWay.set(true)
    this.agentService.startTyping();
    this.query.set('');
    this.queryInput().nativeElement.focus();
    setTimeout(() => {
      this.agentService.createMessage('Hello', this.agentService!.participants()![1]);
      this._submitOnTheWay.set(false)
      this.agentService.stopTyping();
    }, 2000);
  }

  scrollToBottom(el: ElementRef) {
    let yScroll = el.nativeElement.scrollHeight;
    el.nativeElement.scrollTo({ top: yScroll, left: 0, behavior: 'smooth' });
  }

  // getAPIResponse(query: string): Promise<Message> {
  //   return new Promise((resolve) => {
  //     this.http.post<LLMResponse>('https://slnd.dev/api/chat', { message: query, _id: this.cookies.get('_slnd') })
  //       .subscribe({
  //         next: (res) => {
  //           const systemMessage = {
  //             text: this.editResponse(JSON.stringify(res.response)),
  //             date: new Date(),
  //             role: 'system'
  //           };
  //           resolve(systemMessage);
  //         },
  //         error: (e) => {
  //           const systemMessage = {
  //             text: "Sorry, I cannot respond at the moment.",
  //             date: new Date(),
  //             role: 'system'
  //           };
  //           resolve(systemMessage);
  //         }
  //       });
  //   });
  // }


  // allowFunctionalCookies() {
  //   if (!this.cookies.check(this.consentService.firstVisit)) {
  //     this.cookies.set(this.consentService.firstVisit, this.consentService.generateID(), this.consentService.expires);
  //     this.consentService.cookieMap.set(this.consentService.firstVisit, true);
  //   }
  //   this.consentService.cookieMap.set(this.consentService.functional, true);
  //   this.cookies.set('slnd-functional', 'true');
  //   this.disableInput(false);
  //   this.checkQueryfield(this.chatForm.get('query')?.value);
  //   let to = setTimeout(() => this.scrollToBottom(this.historyEl()), 0)
  //   this.consentService.consentBanner = false;
  //   this.queryInput().nativeElement.focus();
  // }

  editResponse(res: string): string {
    let edit = res.slice(1, -1);
    edit = edit.replace(/\\n/g, '<br>');
    edit = edit.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    edit = edit.replace(/\\"(.*?)\\"/g, '<em>$1</em>');
    return edit;
  }

  public check(cookie: string) {
    this.cookies.check(cookie);
  }

  protected readonly ICON = ICON;
}
