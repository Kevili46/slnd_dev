import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { Reference } from '@features/projects/models/reference.model';
import { ReferenceTag } from "@features/projects/ui/reference-tag/reference-tag";

@Component({
  selector: 'slnd-list-reference',
  imports: [ReferenceTag],
  templateUrl: './list-reference.component.html',
  styleUrl: './list-reference.component.scss',
})
export class ListReferenceComponent {

  public readonly reference: InputSignal<Reference> = input.required();

  public readonly trimmedLink: Signal<string> = computed(() => {
    let link = this.reference().link;

    if (link.startsWith('https://')) {
      link = link.split('https://')[1];
    }
    return link
  });

}
