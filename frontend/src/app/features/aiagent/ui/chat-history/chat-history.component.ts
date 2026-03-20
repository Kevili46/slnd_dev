import { Component, Signal, inject, ElementRef, afterEveryRender } from '@angular/core';
import { AgentService } from '@features/aiagent/services/agent.service';
import { Message } from '@features/aiagent/models/Message.model';
import { MessageComponent } from '@features/aiagent/ui/message/message.component';
import { ROLE } from '@features/aiagent/models/Roles.model';

@Component({
  selector: 'slnd-chat-history',
  imports: [MessageComponent],
  templateUrl: './chat-history.component.html',
  styleUrl: './chat-history.component.scss',
})
export class ChatHistoryComponent {

  private elRef: ElementRef = inject(ElementRef);
  private agentService: AgentService = inject(AgentService);

  public readonly history: Signal<Message[] | undefined> = this.agentService.history;
  public readonly typing: Signal<boolean> = this.agentService.typing;

  private lastHistoryLength: number | undefined = undefined;

  constructor() {
    afterEveryRender(() => {
      const currentHistoryLength = this.history()?.length;
      if (this.lastHistoryLength == currentHistoryLength) {
        return;
      }
      this.scrollHistoryToBottom();
      this.lastHistoryLength = currentHistoryLength;
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
