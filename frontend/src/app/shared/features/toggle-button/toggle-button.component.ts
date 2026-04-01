import { Component, ElementRef, input, InputSignal, output, OutputEmitterRef, signal, Signal, viewChild, WritableSignal } from '@angular/core';

@Component({
  selector: 'slnd-toggle-button',
  imports: [],
  templateUrl: './toggle-button.component.html',
  styleUrl: './toggle-button.component.scss',
})
export class ToggleButtonComponent {

  public readonly active: InputSignal<boolean> = input(false);
  public readonly mandatory: InputSignal<boolean> = input(false);
  public toggle: OutputEmitterRef<void> = output();

  public toggleButton: Signal<ElementRef | undefined> = viewChild('toggleButton');
  public toggleHead: Signal<ElementRef | undefined> = viewChild('toggleHead');

  private _headDistance: WritableSignal<string> = signal('');
  public readonly headDistance: Signal<string> = this._headDistance.asReadonly();


  public executeToggle() {
    this.toggle.emit();
  }
}
