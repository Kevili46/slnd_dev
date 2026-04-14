import { Component, viewChildren } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from "@shared/features/icon/icon.component";
import { ICON } from '@shared/features/icon/models/icon.model';

@Component({
  selector: 'slnd-privacy',
  imports: [RouterLink, IconComponent],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent {

  public readonly privacyItems = viewChildren('privacyItem');

  togglePrivacyItem(event: MouseEvent) {
    const clicked: HTMLElement = event.target as HTMLElement;
    let parent: HTMLElement | null | undefined = clicked.parentElement;
    while (!parent?.classList.contains('privacy-item')) {
      parent = parent?.parentElement;
    }
    parent.classList.toggle('open-item');
  }

  protected readonly ICON = ICON;
}
