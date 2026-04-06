import { Component } from '@angular/core';
import { ButtonComponent } from '@shared/features/button/button.component';
import { BUTTON } from '@shared/features/button/models/button-type.model';

@Component({
  selector: 'slnd-about-me',
  imports: [ButtonComponent],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
  host: {
    '[class.slnd-bubble-back]': 'true',
  }
})
export class AboutMeComponent {

  protected readonly BUTTON = BUTTON;

}
