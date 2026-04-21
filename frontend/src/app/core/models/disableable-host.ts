import { Signal } from '@angular/core';

export abstract class DisableableHost {
  abstract disabled: Signal<boolean>;
}