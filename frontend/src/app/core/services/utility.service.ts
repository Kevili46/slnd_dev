import { Injectable, WritableSignal, signal, computed, ElementRef, Renderer2, inject, effect, RendererFactory2, Signal } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { defaultOptions, ReferenceView, UserData } from '@slnd/shared';

@Injectable({
  providedIn: 'root'
})

export class UtilityService {

  private rendererFac: RendererFactory2 = inject(RendererFactory2);
  private document = inject(DOCUMENT);

  private _currentUIOptions: WritableSignal<UserData['options']> = signal(defaultOptions);
  public readonly currentUIOptions: Signal<UserData['options']> = this._currentUIOptions.asReadonly();

  public readonly darkMode: Signal<boolean> = computed(() => {
    return this.currentUIOptions().theme == 'DARK';
  })

  private _mobile: WritableSignal<boolean> = signal(false);
  public readonly mobile = this._mobile.asReadonly();

  private _floating: WritableSignal<boolean> = signal(false);
  public readonly floatHeader = computed(() => { return this._floating() && this.mobile(); });

  private _menuOpen: WritableSignal<boolean> = signal(false);
  public readonly menuOpen = this._menuOpen.asReadonly();

  private _consentOpen: WritableSignal<boolean> = signal(true);
  public readonly consentOpen: Signal<boolean> = this._consentOpen.asReadonly();

  private renderer: Renderer2;
  private themeSwitchTimeout: NodeJS.Timeout | undefined;

  constructor() {
    this.renderer = this.rendererFac.createRenderer(null, null);
    effect(() => {
      this.renderer.setAttribute(this.document.documentElement, 'data-theme', this._currentUIOptions().theme);
      this.renderer.addClass(this.document.documentElement, 'theme-switch');
      if (this.themeSwitchTimeout) {
        clearTimeout(this.themeSwitchTimeout);
      }
      this.themeSwitchTimeout = setTimeout(() => {
        this.renderer.removeClass(this.document.documentElement, 'theme-switch');
      }, 50);

    })
  }


  public scrollUpdate() {
    if (!this.mobile()) {
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
    this._menuOpen.update(current => !current);
  }

  public toggleDarkMode(toggle?: boolean) {
    if (toggle != undefined) {
      this._currentUIOptions.update(current => {
        return { ...current, theme: toggle ? 'DARK' : 'LIGHT' };
      });
      return;
    }
    this._currentUIOptions.update(current => {
      return { ...current, theme: current.theme == 'DARK' ? 'LIGHT' : 'DARK' };
    });
    console.log(this.currentUIOptions());
  }

  public setReferenceView(view: ReferenceView) {
    this._currentUIOptions.update(current => {
      return { ...current, referenceView: view };
    });
  }

  public toggleConsentBanner() {
    this._consentOpen.update(current => !current);
  }

  public updateUIOptions(options: UserData['options']) {
    this._currentUIOptions.set(options);
  }
}
