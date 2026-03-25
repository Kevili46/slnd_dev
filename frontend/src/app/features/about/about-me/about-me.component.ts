import { Component } from '@angular/core';
import { ButtonComponent } from '@shared/features/button/button.component';

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

}
