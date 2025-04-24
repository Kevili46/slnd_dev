import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms'
import { Message } from '../../model/Message.type';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ConsentService } from '../../services/consent.service';
import { LLMResponse } from '../../model/LLMResponse.type';

@Component({
  selector: 'slnd-aiagent',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './aiagent.component.html',
  styleUrl: './aiagent.component.scss'
})
export class AiagentComponent implements OnInit {

  agentActive: boolean = false;
  chatForm!: FormGroup;
  chatHistory: Message[] = [];
  typing: boolean = false;
  typingMessage: string = 'Typing';
  disabled: boolean = true;
  querySubscription!: Subscription | undefined;

  cookies: CookieService = inject(CookieService);
  consentService: ConsentService = inject(ConsentService);


  @ViewChild('agent') agentEl!: ElementRef;
  @ViewChild('history') historyEl!: ElementRef;

  constructor(private http: HttpClient, private el: ElementRef) { }


  ngOnInit(): void {
    this.chatForm = new FormGroup({
      'query': new FormControl('')
    })

    this.querySubscription = this.chatForm.get('query')?.valueChanges.subscribe(value => {
      this.checkQueryfield(value);
    });
  }

  toggleAgent(): void {
    this.agentActive = !this.agentActive;
    if (this.agentActive) {
      this.el.nativeElement.classList.add('active');
      return;
    }
    this.el.nativeElement.classList.remove('active');
  }

  async onSubmit() {
    let query: string = this.chatForm.value.query.trim();
    if (!query || query == '' || this.disabled) {
      return;
    }
    this.disabled = true;
    let userMessage: Message = { text: '', date: new Date(), role: 'user' };
    userMessage.text = query;
    this.chatHistory.push(userMessage);
    let to = setTimeout(() => this.scrollToBottom(this.historyEl), 0)
    this.chatForm.reset();
    await this.sleep(300);
    this.typing = true;
    to = setTimeout(() => this.scrollToBottom(this.historyEl), 0)
    await this.sleep(500);
    let systemMessage: Message = await this.getAPIResponse(query);
    this.chatHistory.push(systemMessage);
    this.typing = false;
    this.checkQueryfield(this.chatForm.get('query')?.value);
    to = setTimeout(() => this.scrollToBottom(this.historyEl), 2)
  }

  sleep(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  scrollToBottom(el: ElementRef) {
    let yScroll = el.nativeElement.scrollHeight;
    el.nativeElement.scrollTo({ top: yScroll, left: 0, behavior: 'smooth' });
  }

  getAPIResponse(query: string): Promise<Message> {
    return new Promise((resolve) => {
      this.http.post<LLMResponse>('http://localhost:4600/chat', { message: query })
        .subscribe({
          next: (res) => {
            const systemMessage = {
              text: this.editResponse(JSON.stringify(res.response)),
              date: new Date(),
              role: 'system'
            };
            resolve(systemMessage);
          },
          error: (e) => {
            const systemMessage = {
              text: "Sorry, I cannot respond at the moment.",
              date: new Date(),
              role: 'system'
            };
            resolve(systemMessage);
          }
        });
    });
  }

  checkQueryfield(value: string | null): void {
    if (value && value.trim() !== '' && !this.typing && this.cookies.get('slnd-functional')) {
      this.disabled = false;
      return
    }
    this.disabled = true;
  }

  allowFunctionalCookies() {
    this.consentService.cookieMap.set(this.consentService.functional, true);
    this.cookies.set('slnd-functional', 'true');
    this.checkQueryfield(this.chatForm.get('query')?.value);
    let to = setTimeout(() => this.scrollToBottom(this.historyEl), 0)
  }

  editResponse(res: string): string {

    return res.slice(0, -3);
  }
}
