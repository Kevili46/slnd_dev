import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'slnd-toggle-button',
  imports: [CommonModule],
  templateUrl: './toggle-button.component.html',
  styleUrl: './toggle-button.component.scss'
})
export class ToggleButtonComponent {

  @Input() cookie: string = '';
  @Input() state: string = '';

  toggleState: boolean = false;

  constructor() {
  }

}
