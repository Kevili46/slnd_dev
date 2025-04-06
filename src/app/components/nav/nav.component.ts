import { Component, ElementRef, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'slnd-nav',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

  menuOpen: boolean;
  constructor(private utilityService: UtilityService, private el: ElementRef) {
    this.menuOpen = utilityService.menuOpen;
  }

  openMenu(): void {
    this.utilityService.menuOpen = !this.utilityService.menuOpen;
    this.menuOpen = this.utilityService.menuOpen;
  }

  @HostListener('window: resize')
  resizeServiceUpdate() {
    if (typeof window == 'undefined') {
      return;
    }
    this.utilityService.resizeUpdate();
    this.menuOpen = this.utilityService.menuOpen;
  }
}
