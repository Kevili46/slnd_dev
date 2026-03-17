import { Component, Inject, Input } from '@angular/core';


@Component({
  selector: 'slnd-toggle-button',
  imports: [],
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
