import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'slnd-privacy',
  imports: [RouterLink],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent {

  @ViewChildren('privacyItem') privacyItems !: QueryList<ElementRef>;

  togglePrivacyItem(event: MouseEvent) {
    const clicked: HTMLElement = event.target as HTMLElement;
    let parent: HTMLElement | null | undefined = clicked.parentElement;
    while (!parent?.classList.contains('privacy-item')) {
      parent = parent?.parentElement;
    }
    parent.classList.toggle('open-item');
  }
}
