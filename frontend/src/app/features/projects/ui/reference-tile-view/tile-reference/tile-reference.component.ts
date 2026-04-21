import { Component, InputSignal, input } from '@angular/core';
import { Reference } from '@features/projects/models/reference.model';
import { ReferenceTag } from "@features/projects/ui/reference-tag/reference-tag";

@Component({
  selector: 'slnd-tile-reference',
  imports: [ReferenceTag],
  templateUrl: './tile-reference.component.html',
  styleUrl: './tile-reference.component.scss',
  host: {
    '[class.slnd-bubble-back]': 'true',
  }
})
export class TileReferenceComponent {

  public readonly reference: InputSignal<Reference> = input.required();

}
