import { Component, InputSignal, Signal, inject, input } from '@angular/core';
import { ModeAwarePipe } from '@core/pipes/mode-aware-pipe';
import { UtilityService } from '@core/services/utility.service';
import { Reference } from '@features/projects/models/reference.model';
import { ReferenceTag } from "@features/projects/ui/reference-tag/reference-tag";

@Component({
  selector: 'slnd-tile-reference',
  imports: [ReferenceTag, ModeAwarePipe],
  templateUrl: './tile-reference.component.html',
  styleUrl: './tile-reference.component.scss',
  host: {
    '[class.slnd-bubble-back]': 'true',
  }
})
export class TileReferenceComponent {

  public readonly reference: InputSignal<Reference> = input.required();

}
