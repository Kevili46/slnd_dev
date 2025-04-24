import { AfterViewInit, Component, ElementRef, HostListener, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { UtilityService } from './services/utility.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { AiagentComponent } from './components/aiagent/aiagent.component';
import { ConsentComponent } from './components/consent/consent.component';

@Component({
  selector: 'slnd',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, AiagentComponent, CommonModule, ConsentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements AfterViewInit {
  title = 'SLND';

  utilityService: UtilityService = inject(UtilityService);
  float: boolean = this.utilityService.floatHeader;
  hide: boolean = this.utilityService.hideHeader;
  menuOpen: boolean = this.utilityService.menuOpen;

  constructor(private el: ElementRef) {
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

  @HostListener('window: load')
  allLoaded() {
    this.el.nativeElement.classList.remove('load');
  }
}
