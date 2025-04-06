import { AfterViewInit, Component, ElementRef, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { UtilityService } from './services/utility.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'slnd',
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements AfterViewInit {
  title = 'SLND';

  float: boolean;
  hide: boolean;
  menuOpen: boolean;

  constructor(private utilityService: UtilityService, private el: ElementRef) {
    this.float = utilityService.floatHeader;
    this.hide = utilityService.hideHeader;
    this.menuOpen = utilityService.menuOpen;
  }

  ngAfterViewInit() {
    this.scrollServiceUpdate();
    this.resizeServiceUpdate();
  }

  @HostListener('window: scroll')
  scrollServiceUpdate() {
    if (typeof window == 'undefined') {
      return;
    }
    this.utilityService.scrollUpdate();
    this.float = this.utilityService.floatHeader;
    this.hide = this.utilityService.hideHeader;
    this.menuOpen = this.utilityService.menuOpen;
  }

  @HostListener('window: resize')
  resizeServiceUpdate() {
    if (typeof window == 'undefined') {
      return;
    }
    this.utilityService.resizeUpdate();
    this.float = this.utilityService.floatHeader;
    this.hide = this.utilityService.hideHeader;
    this.menuOpen = this.utilityService.menuOpen;
  }
}
