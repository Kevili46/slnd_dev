import { Component, input, InputSignal } from '@angular/core';
import { Reference } from '@features/projects/models/reference.model';
import { TileReferenceComponent } from "@features/projects/ui/reference-tile-view/tile-reference/tile-reference.component";

@Component({
  selector: 'slnd-reference-tile-view',
  imports: [TileReferenceComponent],
  templateUrl: './reference-tile-view.component.html',
  styleUrl: './reference-tile-view.component.scss',
})
export class ReferenceTileViewComponent {

  public readonly references: InputSignal<Reference[]> = input.required();

}
