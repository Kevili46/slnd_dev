import { AfterViewInit, Component, ElementRef, Signal, inject, viewChild } from '@angular/core';
import { UtilityService } from '@core/services/utility.service';
import { HighlightHeadingComponent } from '@shared/features/highlight-heading/highlight-heading.component';

@Component({
  selector: 'slnd-contact',
  imports: [HighlightHeadingComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})

export class ContactComponent implements AfterViewInit {

  private utilityService: UtilityService = inject(UtilityService);


  public mail: Signal<ElementRef> = viewChild.required('mail');
  public mailLink: Signal<ElementRef> = viewChild.required('mailLink');

  constructor() {
  }

  ngAfterViewInit() {
    if (!this.utilityService.mobile()) {
      let randXsign = Math.random() < .55 ? -1 : 1;
      let randX = (200 * Math.random()) * randXsign;
      let randY = (window.innerHeight - this.mailLink().nativeElement.getBoundingClientRect().bottom - 200) * Math.random() + 100;
      this.mail().nativeElement.addEventListener('mouseover', () => {
        this.mail().nativeElement.classList.add('hovered');
        this.mailLink().nativeElement.style.translate = `${randX}px ${randY}px`;
      })
    }
  }
}
