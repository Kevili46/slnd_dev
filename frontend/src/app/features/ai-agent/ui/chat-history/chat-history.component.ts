import { Component, Signal, inject, ElementRef, afterEveryRender, effect } from '@angular/core';
import { AiAgentService } from '@features/ai-agent/services/ai-agent.service';
import { Message } from '@features/ai-agent/models/message.model';
import { MessageComponent } from '@features/ai-agent/ui/message/message.component';
import { ROLE } from '@features/ai-agent/models/roles.model';

@Component({
  selector: 'slnd-chat-history',
  imports: [MessageComponent],
  templateUrl: './chat-history.component.html',
  styleUrl: './chat-history.component.scss',
})
export class ChatHistoryComponent {

  private elRef: ElementRef = inject(ElementRef);
  private agentService: AiAgentService = inject(AiAgentService);

  public readonly history: Signal<Message[] | undefined> = this.agentService.history;
  public readonly typing: Signal<boolean> = this.agentService.typing;

  private lastHistoryLength: number | undefined = undefined;

  constructor() {
    afterEveryRender(() => {
      const currentHistoryLength = this.history()?.length;
      if (this.lastHistoryLength != currentHistoryLength || this.typing()) {
        this.scrollHistoryToBottom();
        this.lastHistoryLength = currentHistoryLength;
      }
    });
  }

  private scrollHistoryToBottom() {
    const nativeEl = this.elRef.nativeElement;
    nativeEl.scrollTo({
      top: nativeEl.scrollHeight,
      behavior: 'smooth',
    });
  }

  protected readonly ROLE = ROLE;
}
