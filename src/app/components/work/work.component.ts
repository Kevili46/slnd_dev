import { Component, OnInit, QueryList, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { work } from '../../data/references';
import { Reference } from '../../model/Reference.type';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'slnd-work',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss'
})
export class WorkComponent implements OnInit, AfterViewInit {

  private work: Reference[] = work;
  private tagsSet = new Set<string>();
  private currentFilter!: ElementRef;
  private filterClass: string = 'filter';

  tags: string[] = [];
  shownWork: Reference[] = [];

  ngOnInit(): void {
    this.work.forEach(element => {
      for (let tag of element.tags) {
        this.tagsSet.add(tag);
      }
    });
    this.tags = Array.from(this.tagsSet);
    this.tags.push('all');
    this.shownWork = this.work;
  }

  @ViewChildren('tagElement') filterTags!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    for (let tag of this.filterTags) {
      let tagValue: string = tag.nativeElement.getAttribute('tag');
      if (tagValue == 'all') {
        tag.nativeElement.classList.add(this.filterClass);
        this.currentFilter = tag;
      }
    }
  }

  filterWork(event: Event, tag: HTMLElement): void {
    const clickedTag: ElementRef<HTMLElement> = new ElementRef(tag);
    if (clickedTag.nativeElement.classList.contains(this.filterClass)) {
      return;
    }
    this.currentFilter.nativeElement.classList.remove(this.filterClass);
    clickedTag.nativeElement.classList.add(this.filterClass);
    this.currentFilter = clickedTag;

    const tagValue: string = clickedTag.nativeElement.getAttribute('tag') || '';

    if (tagValue == 'all') {
      this.shownWork = this.work;
      return;
    }

    this.shownWork = [];
    for (let workItem of this.work) {
      if (workItem.tags.includes(tagValue)) {
        this.shownWork.push(workItem);
      }
    }
  }
}

