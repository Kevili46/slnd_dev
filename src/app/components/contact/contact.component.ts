import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'slnd-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})

export class ContactComponent implements AfterViewInit {

  @ViewChild('mail') mail!: ElementRef;
  @ViewChild('mailLink') mailLink!: ElementRef;

  ngAfterViewInit() {
    let randXsign = Math.random() < .55 ? -1 : 1;
    let randX = (200 * Math.random()) * randXsign;
    let randY = (window.innerHeight - this.mailLink.nativeElement.getBoundingClientRect().bottom - 200) * Math.random() + 100;
    this.mail.nativeElement.addEventListener('mouseover', () => {
      this.mail.nativeElement.classList.add('hovered');
      this.mailLink.nativeElement.style.translate = `${randX}px ${randY}px`;
    })
  }
}
