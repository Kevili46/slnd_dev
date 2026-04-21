import { booleanAttribute, computed, Directive, inject, input, InputSignal, InputSignalWithTransform, output, OutputEmitterRef } from '@angular/core';
import { DisableableHost } from '@core/models/disableable-host';

@Directive({
  selector: '[slndOmniClick]',
  host: {
    '[attr.role]': '!hostDisabled() ? "button" : null',
    '[attr.tabindex]': '!hostDisabled() ? 0 : null',
    '(click)': 'emitClickEvent()',
    '(keydown.enter)': 'emitClickEvent()',
  }
})
export class OmniClickDirective {

  private hostComponent = inject(DisableableHost, { optional: true });

  public readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, {
    alias: 'disabled',
    transform: booleanAttribute
  });

  public readonly hostDisabled = computed(() => {
    if (this.hostComponent) {
      return this.hostComponent.disabled();
    }
    return this.disabled();
  });
  public omniClick: OutputEmitterRef<void> = output<void>();

  public emitClickEvent() {
    this.omniClick.emit();
  }

}
