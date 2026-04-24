import { Component, computed, inject, input, InputSignal, Signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Icon, ICON } from '@shared/features/icon/models/icon.model';
import { icons } from '@shared/features/icon/models/icons.js';

@Component({
  selector: 'slnd-icon',
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  host: {
    '[style.width]': 'width() || null',
    '[innerHTML]': 'svg() ?? ""'
  }
})
export class IconComponent {

  public sanititzer: DomSanitizer = inject(DomSanitizer);

  public readonly icon: InputSignal<Icon> = input.required();
  public readonly width: InputSignal<string> = input('1.5em');

  public readonly svg: Signal<SafeHtml | undefined> = computed(() => {
    return this.sanititzer.bypassSecurityTrustHtml(icons.get(this.icon()) ?? '');
  })

  protected readonly ICON = ICON;

}
