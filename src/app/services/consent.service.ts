import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsentService {

  consentBanner: boolean = false;
  firstVisit: string = 'slnd-cookies';
  functional: string = 'slnd-functional';
  analytics: string = 'slnd-analytics';
  cookieMap: Map<string, boolean> = new Map([
    [this.firstVisit, false],
    [this.functional, false],
    [this.analytics, false]
  ])
  expires: number = 365;

  constructor() { }

  openConsentBanner(): void {
    this.consentBanner = true;
  }

  changeCookies(cookie: string) {
    this.cookieMap.set(cookie, !this.cookieMap.get(cookie));
  }
}
