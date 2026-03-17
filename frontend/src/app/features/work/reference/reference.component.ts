import { Component, InputSignal, input } from '@angular/core';
import { Reference } from '@features/work/models/Reference.type';

@Component({
  selector: 'slnd-reference',
  imports: [],
  templateUrl: './reference.component.html',
  styleUrl: './reference.component.scss',
})
export class ReferenceComponent {

  public readonly reference: InputSignal<Reference> = input.required();

}
