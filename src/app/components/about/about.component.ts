import { Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { skills } from '../../data/skills';
import { SkillCategory } from '../../model/SkillCategory.interface';

@Component({
  selector: 'slnd-about',
  imports: [ButtonComponent, CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})


export class AboutComponent {

  skills: SkillCategory[] = skills;

  @ViewChildren('category') categories!: QueryList<ElementRef>;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    console.log('hi');
    const border: number = Math.floor(window.innerHeight / 1.5);
    this.categories.forEach(category => {
      let yTop = category.nativeElement.getBoundingClientRect().top;
      let yBottom = category.nativeElement.getBoundingClientRect().bottom;
      if (yTop <= border && yBottom > border) {
        category.nativeElement.classList.remove('blurred');
        return;
      }
      category.nativeElement.classList.add('blurred');
    })
  }
}
