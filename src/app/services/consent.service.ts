import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsentService {

  consentBanner: boolean = false;
  firstVisit: string = '_slnd';
  functional: string = 'slnd-functional';
  analytics: string = 'slnd-analytics';
  cookieMap: Map<string, boolean> = new Map([
    [this.firstVisit, false],
    [this.functional, false],
    [this.analytics, false]
  ])
  expires: number = 365;

  functionalSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  functional$ = this.functionalSource.asObservable();
  analyticsSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  analytics$ = this.analyticsSource.asObservable();

  constructor() { }

  openConsentBanner(): void {
    this.consentBanner = true;
  }

  changeCookies(cookie: string) {
    this.cookieMap.set(cookie, !this.cookieMap.get(cookie));
  }

  setFunctional(bool: boolean) {
    this.functionalSource.next(bool);
  }
  setAnalytics(bool: boolean) {
    this.analyticsSource.next(bool);
  }

  generateID(): string {
    const length: number = 12;
    const maxVariation: number[] = [8, 4];
    let distribution: number[] = [0, 0];
    const characters: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w'];
    const digits: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const charPool: string[][] = [characters, digits];
    let ID: string = 'slnd-';
    for (let i: number = 0; i < length; i++) {
      let randomCharacter: string = '';
      let category: number = Math.floor(Math.random() * charPool.length);
      if (distribution[category] == maxVariation[category]) {
        charPool.splice(category, 1);
        category = Math.floor(Math.random() * charPool.length);
      }
      ++distribution[category];
      let charRand: number = Math.floor(Math.random() * charPool[category].length);
      randomCharacter = charPool[category][charRand];
      if (category == 0) {
        randomCharacter = Math.random() > .5 ? randomCharacter.toUpperCase() : randomCharacter;
      }
      ID += randomCharacter;
      if (i < 10 && (i + 1) % 4 == 0) {
        ID += '-';
      }
    }
    return ID;
  }

}
