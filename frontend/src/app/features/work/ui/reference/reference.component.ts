import { Component, InputSignal, input } from '@angular/core';
import { Reference } from '#features/work/models/reference.model.js';

@Component({
  selector: 'slnd-reference',
  imports: [],
  templateUrl: './reference.component.html',
  styleUrl: './reference.component.scss',
  host: {
    '[class.slnd-bubble-back]': 'true',
  }
})
export class ReferenceComponent {

  public readonly reference: InputSignal<Reference> = input.required();

}
