import { Component, ElementRef, inject, Signal, viewChild, computed, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatHistoryComponent } from '@features/ai-agent/ui/chat-history/chat-history.component';
import { ButtonComponent } from '@shared/features/button/button.component';
import { ICON } from '@shared/features/icon/models/icon.model';
import { BUTTON } from '@shared/features/button/models/button-type.model';
import { AiAgentService } from './services/ai-agent.service';
import { FormsModule } from '@angular/forms';
import { UtilityService } from '@core/services/utility.service';

@Component({
  selector: 'slnd-aiagent',
  imports: [CommonModule, FormsModule, ChatHistoryComponent, ButtonComponent],
  templateUrl: './ai-agent.component.html',
  styleUrl: './ai-agent.component.scss',
  host: {
    '[class.active]': 'agentOpen()'
  }
})
export class AiAgentComponent {

  private agentService: AiAgentService = inject(AiAgentService);
  private utilityService: UtilityService = inject(UtilityService);

  public agentEl: Signal<ElementRef> = viewChild.required('agent', { read: ElementRef });
  public queryInput: Signal<ElementRef> = viewChild.required('queryInput', { read: ElementRef });

  public query: WritableSignal<string> = signal<string>('');

  public mobile: Signal<boolean> = this.utilityService.mobile;
  public readonly agentOpen: Signal<boolean> = this.agentService.agentOpen;
  public readonly online: Signal<boolean> = this.agentService.online;
  public readonly typing: Signal<boolean> = this.agentService.typing;
  public readonly submitDisabled: Signal<boolean> = computed(() => {
    const emptyInput: boolean = this.query().trim().length === 0;
    return emptyInput || !this.online() || this.typing();
  });

  public toggleAgent(): void {
    this.agentService.toggleAgent();

    if (this.agentOpen()) {
      const el = this.agentEl().nativeElement;

      el.addEventListener('transitionend', () => {
        this.queryInput().nativeElement.focus();
      }, { once: true });
    }
  }

  public submitQuery() {
    this.agentService.sendMessage(this.query());
    this.query.set('');
    if (!this.mobile()) {
      this.queryInput().nativeElement.focus();
    }
  }

  scrollToBottom(el: ElementRef) {
    let yScroll = el.nativeElement.scrollHeight;
    el.nativeElement.scrollTo({ top: yScroll, left: 0, behavior: 'smooth' });
  }

  protected readonly ICON = ICON;
  protected readonly BUTTON = BUTTON;
}
