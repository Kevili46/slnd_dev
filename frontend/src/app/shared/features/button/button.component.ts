import { booleanAttribute, Component, computed, input, InputSignal, InputSignalWithTransform, output, OutputEmitterRef, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '@shared/features/icon/models/icon.model';
import { IconComponent } from '@shared/features/icon/icon.component';
import { BUTTON } from '@shared/features/button/models/button-type.model';

@Component({
  selector: 'slnd-button',
  imports: [IconComponent, RouterLink],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  host: {
    '[class.disabled]': 'btnDisabled()',
    '[class.default]': '!cta() && !raised()',
    '[class.cta]': 'cta()',
    '[class.raised]': 'raised()'
  }
})
export class ButtonComponent {


  public readonly raised: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute });
  public readonly cta: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute });

  public readonly url: InputSignal<string | undefined> = input();
  public readonly activeUrl: Signal<string | undefined> = computed(() => {
    return !this.btnDisabled() ? this.url() : undefined;
  });
  public readonly icon: InputSignal<Icon | undefined> = input();
  public readonly iconWidth: InputSignal<string | undefined> = input();
  public readonly inputIconWidth: Signal<string> = computed(() => {
    return this.iconWidth() ?? '1.5em';
  });
  public readonly text: InputSignal<string | undefined> = input();

  public readonly btnDisabled: InputSignal<boolean> = input(false);
  public readonly btnType: InputSignal<string | undefined> = input();

  public readonly btnClick: OutputEmitterRef<void> = output<void>();

  public execute() {
    this.btnClick.emit();
  }

  protected readonly BUTTON = BUTTON;

}
