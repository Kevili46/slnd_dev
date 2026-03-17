import { Injectable, WritableSignal, signal, computed, ElementRef, Renderer2, inject, effect, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  private rendererFac: RendererFactory2 = inject(RendererFactory2);
  private document = inject(DOCUMENT);

  private _mobile: WritableSignal<boolean> = signal(false);
  public readonly mobile = this._mobile.asReadonly();

  private _floating: WritableSignal<boolean> = signal(false);
  public readonly floatHeader = computed(() => {
    return this._floating() && this.mobile();
  });

  private _menuOpen: WritableSignal<boolean> = signal(false);
  public readonly menuOpen = this._menuOpen.asReadonly();

  private _darkMode: WritableSignal<boolean> = signal(false);
  public readonly darkMode = this._darkMode.asReadonly();

  private renderer: Renderer2;

  constructor() {
    this.renderer = this.rendererFac.createRenderer(null, null);
    effect(() => {
      if (this.darkMode()) {
        this.renderer.setAttribute(this.document.documentElement, 'dark', '');
        return;
      }
      this.renderer.removeAttribute(this.document.documentElement, 'dark');

    })
  }


  public scrollUpdate() {
    if (!this.mobile) {
      return;
    }

    if (window.scrollY > 50) {
      this._floating.set(true);
    } else {
      this._floating.set(false);
    }
  }

  public resizeUpdate(resizedEl: ElementRef) {
    this._mobile.set(resizedEl.nativeElement.clientWidth <= 1024);
  }

  public sleep(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  public toggleMenu() {
    if (!this.mobile()) {
      return;
    }
    this._menuOpen.set(!this.menuOpen());
  }

  public toggleDarkMode() {
    this._darkMode.set(!this.darkMode());
  }
}
