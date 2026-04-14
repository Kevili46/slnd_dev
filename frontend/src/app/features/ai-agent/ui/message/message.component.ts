import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { Message } from '@features/ai-agent/models/message.model';
import { ROLE } from '@features/ai-agent/models/roles.model';

@Component({
  selector: 'slnd-message',
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  host: {
    '[class]': 'message().author.role.toLowerCase()'
  }
})
export class MessageComponent {

  public readonly message: InputSignal<Message> = input.required<Message>();

  public readonly time: Signal<string> = computed(() => {
    return this.formatDate(this.message().date);
  })

  private formatDate(date: Date): string {
    const hour = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hour}:${minutes}`;
  }

  protected readonly ROLE = ROLE;
}
