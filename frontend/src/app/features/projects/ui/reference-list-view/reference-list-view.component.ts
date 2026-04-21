import { Component, input, InputSignal } from '@angular/core';
import { Reference } from '@features/projects/models/reference.model';
import { ListReferenceComponent } from '@features/projects/ui/reference-list-view/list-reference/list-reference.component';

@Component({
  selector: 'slnd-reference-list-view',
  imports: [ListReferenceComponent],
  templateUrl: './reference-list-view.component.html',
  styleUrl: './reference-list-view.component.scss',
})
export class ReferenceListViewComponent {

  public readonly references: InputSignal<Reference[]> = input.required();

}
