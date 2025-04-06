import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  mobile: boolean = false;
  floatHeader: boolean = false;
  hideHeader: boolean = false;
  scrollDown: boolean = false;
  scrolled: boolean = false;
  lastScroll: number = 0;
  menuOpen: boolean = false;

  constructor() { }

  scrollUpdate() {
    if (!this.mobile) {
      return;
    }
    if (this.lastScroll < window.scrollY) {
      this.scrollDown = true;
    } else {
      this.scrollDown = false;
    }
    this.lastScroll = window.scrollY;

    if (window.scrollY > 50) {
      this.floatHeader = true;
    } else {
      this.floatHeader = false;
    }

    // if (window.scrollY > 30000 && this.floatHeader && this.scrollDown) {
    //   this.hideHeader = true;
    // } else {
    //   this.hideHeader = false;
    // }
  }

  resizeUpdate() {
    console.log(this.mobile);
    if (window.innerWidth > 1024) {
      this.mobile = false;
      this.floatHeader = false;
      this.hideHeader = false;
      this.menuOpen = false;
      return
    }
    this.mobile = true;
  }
}
