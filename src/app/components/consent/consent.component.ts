import { Component, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToggleButtonComponent } from '../toggle-button/toggle-button.component';
import { CommonModule } from '@angular/common';
import { ConsentService } from '../../services/consent.service';

@Component({
  selector: 'slnd-consent',
  imports: [ToggleButtonComponent, CommonModule],
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
    }
    if (this.cookies.check(this.consentService.analytics)) {
      this.consentService.cookieMap.set(this.consentService.analytics, true);
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
    })
    this.cookies.set(this.consentService.firstVisit, 'true', this.consentService.expires);
    this.consentService.cookieMap.set(this.consentService.firstVisit, true);
    this.consentService.consentBanner = false;
  }

  rejectAll() {
    this.consentService.cookieMap.forEach((value, key) => {
      if (key === this.consentService.firstVisit) {
        return;
      }
      this.consentService.cookieMap.set(key, false);
      this.cookies.delete(key);
    })
    this.cookies.set(this.consentService.firstVisit, 'true', this.consentService.expires);
    this.consentService.cookieMap.set(this.consentService.firstVisit, true);
    this.consentService.consentBanner = false;
  }

  saveSettings() {
    this.cookies.set(this.consentService.firstVisit, 'true', this.consentService.expires);
    this.consentService.cookieMap.set(this.consentService.firstVisit, true);
    if (this.consentService.cookieMap.get(this.consentService.functional)) {
      this.cookies.set(this.consentService.functional, 'true', this.consentService.expires)
    } else {
      this.cookies.delete(this.consentService.functional);
    }
    if (this.consentService.cookieMap.get(this.consentService.analytics)) {
      this.cookies.set(this.consentService.analytics, 'true', this.consentService.expires)
    } else {
      this.cookies.delete(this.consentService.analytics);
    }
    this.consentService.consentBanner = false;
  }


}
