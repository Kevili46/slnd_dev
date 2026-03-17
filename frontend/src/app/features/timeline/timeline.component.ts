import { AfterViewInit, Component, ElementRef, HostBinding, OnInit, QueryList, ViewChildren } from '@angular/core';
import { experiences } from '../../data/experiences';

import { Experience } from '../../core/models/Experience.class';

@Component({
  selector: 'slnd-timeline',
  imports: [],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit, AfterViewInit {

  @HostBinding('attr.style')
  style: string = (`height: 600px;`);

  @ViewChildren('stampElement') stampElements!: QueryList<ElementRef>;

  timestamps: Experience[] = experiences;
  earliest!: Experience;
  latest!: Experience;
  tlMax: number = 0;

  ngOnInit() {
    this.earliest = this.timestamps[0];
    this.latest = this.timestamps[0];
    this.timestamps.forEach(stamp => {
      if (stamp.start < this.earliest.start) {
        this.earliest = stamp;
      }
      if (stamp.end > this.latest.end) {
        this.latest = stamp;
      }
    });
    this.tlMax = this.latest.end.getTime() - this.earliest.start.getTime();
  }

  ngAfterViewInit() {
    this.positionTimestamps();
  }
  ngOnChanges() {
    this.positionTimestamps();
  }

  positionTimestamps(): void {
    this.stampElements.forEach((element, i) => {
      let tlYPos = 100 * ((this.timestamps[i].start.getTime() - this.earliest.start.getTime()) / this.tlMax);
      element.nativeElement.style.top = `${tlYPos}%`;
    })
  }
}
