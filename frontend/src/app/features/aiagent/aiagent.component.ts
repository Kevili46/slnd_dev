import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms'
import { Message } from '../../core/models/Message.type';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ConsentService } from '../../core/services/consent.service';
import { LLMResponse } from '../../core/models/LLMResponse.type';
import { RouterLink } from '@angular/router';
import { UtilityService } from '../../core/services/utility.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'slnd-aiagent',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './aiagent.component.html',
  styleUrl: './aiagent.component.scss'
})
export class AiagentComponent implements OnInit, OnDestroy {

  agentActive: boolean = false;
  chatForm!: FormGroup;
  chatHistory: Message[] = [];
  typing: boolean = false;
  typingMessage: string = 'Typing';
  disabled: boolean = true;
  inputPossible: boolean = false;
  querySubscription!: Subscription | undefined;
  cookieSubscription!: Subscription | undefined;


  cookies: CookieService = inject(CookieService);
  consentService: ConsentService = inject(ConsentService);
  utilityService: UtilityService = inject(UtilityService);
  sanitizer: DomSanitizer = inject(DomSanitizer);


  @ViewChild('agent') agentEl!: ElementRef;
  @ViewChild('history') historyEl!: ElementRef;
  @ViewChild('query') inputField!: ElementRef;

  constructor(private http: HttpClient, private el: ElementRef) { }

  ngOnInit(): void {
    this.chatForm = new FormGroup({
      'query': new FormControl('')
    })

    this.cookieSubscription = this.consentService.functional$.subscribe(
      (value) => {
        this.disableInput(!value);
        if (!value) {
          this.chatHistory = [];
        }
      }
    )

    this.querySubscription = this.chatForm.controls['query']?.valueChanges.subscribe(value => {
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
    this.disableInput(true);
    let userMessage: Message = { text: '', date: new Date(), role: 'user' };
    userMessage.text = query;
    this.chatHistory.push(userMessage);
    let to = setTimeout(() => this.scrollToBottom(this.historyEl), 0)
    this.chatForm.reset();
    await this.utilityService.sleep(300);
    this.typing = true;
    to = setTimeout(() => this.scrollToBottom(this.historyEl), 0)
    await this.utilityService.sleep(500);
    let systemMessage: Message = await this.getAPIResponse(query);
    this.chatHistory.push(systemMessage);
    this.typing = false;
    this.checkQueryfield(this.chatForm.get('query')?.value);
    to = setTimeout(() => this.scrollToBottom(this.historyEl), 2)
    this.disableInput(false);
    this.inputField.nativeElement.focus();
  }

  scrollToBottom(el: ElementRef) {
    let yScroll = el.nativeElement.scrollHeight;
    el.nativeElement.scrollTo({ top: yScroll, left: 0, behavior: 'smooth' });
  }

  getAPIResponse(query: string): Promise<Message> {
    return new Promise((resolve) => {
      this.http.post<LLMResponse>('https://slnd.dev/api/chat', { message: query, _id: this.cookies.get('_slnd') })
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

  checkQueryfield(value: string): void {
    if (value && value.trim() !== '' && !this.typing && this.cookies.check(this.consentService.functional)) {
      this.disabled = false;
      return
    }
    this.disabled = true;
  }

  disableInput(disable: boolean) {
    if (disable) {
      this.chatForm.controls['query']?.disable();
      return;
    }
    this.chatForm.controls['query']?.enable();
  }

  allowFunctionalCookies() {
    if (!this.cookies.check(this.consentService.firstVisit)) {
      this.cookies.set(this.consentService.firstVisit, this.consentService.generateID(), this.consentService.expires);
      this.consentService.cookieMap.set(this.consentService.firstVisit, true);
    }
    this.consentService.cookieMap.set(this.consentService.functional, true);
    this.cookies.set('slnd-functional', 'true');
    this.disableInput(false);
    this.checkQueryfield(this.chatForm.get('query')?.value);
    let to = setTimeout(() => this.scrollToBottom(this.historyEl), 0)
    this.consentService.consentBanner = false;
    this.inputField.nativeElement.focus();
  }

  editResponse(res: string): SafeHtml {
    let edit = res.slice(1, -1);
    edit = edit.replace(/\\n/g, '<br>');
    edit = edit.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    edit = edit.replace(/\\"(.*?)\\"/g, '<em>$1</em>');
    return this.sanitizer.bypassSecurityTrustHtml(edit);
  }

  ngOnDestroy(): void {
    this.querySubscription?.unsubscribe();
    this.cookieSubscription?.unsubscribe();
  }
}
