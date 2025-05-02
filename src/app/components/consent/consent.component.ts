import { Component, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToggleButtonComponent } from '../toggle-button/toggle-button.component';
import { CommonModule } from '@angular/common';
import { ConsentService } from '../../services/consent.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'slnd-consent',
  imports: [ToggleButtonComponent, CommonModule, RouterLink],
  templateUrl: './consent.component.html',
  styleUrl: './consent.component.scss',
  providers: [CookieService]
})
export class ConsentComponent {

  cookies: CookieService = inject(CookieService);
  consentService: ConsentService = inject(ConsentService);

  constructor() {
    if (this.cookies.check(this.consentService.functional)) {
      this.consentService.cookieMap.set(this.consentService.functional, true);
      this.consentService.setFunctional(true);
    }
    if (this.cookies.check(this.consentService.analytics)) {
      this.consentService.cookieMap.set(this.consentService.analytics, true);
      this.consentService.setAnalytics(true);
      this.consentService.manageGTM();
    }
    if (this.cookies.check(this.consentService.firstVisit)) {
      this.consentService.cookieMap.set(this.consentService.firstVisit, true);
      this.consentService.consentBanner = false;
      return;
    }
    this.consentService.consentBanner = true;
  }

  allowAll() {
    this.consentService.cookieMap.forEach((value, key) => {
      if (key === this.consentService.firstVisit) {
        return;
      }
      this.consentService.cookieMap.set(key, true);
      this.cookies.set(key, 'true', this.consentService.expires);
      this.consentService.setFunctional(true);
      this.consentService.setAnalytics(true);
    })
    this.setFirstVisit()
    this.consentService.cookieMap.set(this.consentService.firstVisit, true);
    this.consentService.manageGTM();
    this.consentService.consentBanner = false;
  }

  rejectAll() {
    this.consentService.cookieMap.forEach((value, key) => {
      if (key === this.consentService.firstVisit) {
        return;
      }
      this.consentService.cookieMap.set(key, false);
      this.cookies.delete(key);
      this.consentService.setFunctional(false);
      this.consentService.setAnalytics(false);
    })
    this.setFirstVisit()
    this.consentService.cookieMap.set(this.consentService.firstVisit, true);
    this.cookies.delete('_ga');
    this.cookies.delete(`_ga_${this.consentService.gtmID}`);
    this.consentService.manageGTM();
    this.consentService.consentBanner = false;
  }

  saveSettings() {
    this.setFirstVisit()
    if (this.consentService.cookieMap.get(this.consentService.functional)) {
      this.cookies.set(this.consentService.functional, 'true', this.consentService.expires)
      this.consentService.setFunctional(true);
    } else {
      this.cookies.delete(this.consentService.functional);
      this.consentService.setFunctional(false);
    }
    if (this.consentService.cookieMap.get(this.consentService.analytics)) {
      this.cookies.set(this.consentService.analytics, 'true', this.consentService.expires)
      this.consentService.setAnalytics(true);
    } else {
      this.cookies.delete(this.consentService.analytics);
      this.cookies.delete('_ga');
      this.cookies.delete(`_ga_${this.consentService.gtmID}`);
      this.consentService.setAnalytics(false);
    }
    this.consentService.manageGTM();
    this.consentService.consentBanner = false;
  }

  setFirstVisit() {
    if (!this.cookies.check(this.consentService.firstVisit)) {
      this.cookies.set(this.consentService.firstVisit, this.consentService.generateID(), this.consentService.expires);
      this.consentService.cookieMap.set(this.consentService.firstVisit, true);
    }
  }
}
