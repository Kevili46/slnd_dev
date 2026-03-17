import { Component, input, InputSignal } from '@angular/core';
import { Icon, ICON } from '@shared/features/icon/models/icon.model';

@Component({
  selector: 'slnd-icon',
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  host: {
    '[style.width]': 'width() ? width() : null',
  }
})
export class IconComponent {

  public readonly icon: InputSignal<Icon | undefined> = input();
  public readonly width: InputSignal<string> = input('20px');

  protected readonly ICON = ICON;

}
