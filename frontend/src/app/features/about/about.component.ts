import { Component, ElementRef, viewChildren, Signal, signal, inject, Renderer2, OnDestroy, afterNextRender } from '@angular/core';
import { ButtonComponent } from '@shared/features/button/button.component';
import { SkillCategory } from '@features/about/models/SkillCategory.type';
import { TitleHeadingComponent } from './title-heading/title-heading.component';

import { SkillCategoryComponent } from './skill-category/skill-category.component';
import { skills } from './content/skills';

@Component({
  selector: 'slnd-about',
  imports: [ButtonComponent, SkillCategoryComponent, TitleHeadingComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})


export class AboutComponent implements OnDestroy {
  private renderer: Renderer2 = inject(Renderer2);
  private elRef: ElementRef = inject(ElementRef);

  public skills: Signal<SkillCategory[]> = signal(skills);

  private categories = viewChildren(SkillCategoryComponent, { read: ElementRef });
  private currentInView: number = -1;

  private cleanup?: () => void;

  constructor() {
    afterNextRender(() => {
      let ticking = false;

      this.cleanup = this.renderer.listen('window', 'scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const currentCategories = this.categories();
            if (currentCategories && currentCategories.length > 0) {
              this.focusActiveCategory(currentCategories);
            }
            ticking = false;
          });

          ticking = true;
        }
      });
    });
  }

  public focusActiveCategory(categories: readonly ElementRef[]) {
    const THRESHOLD: number = window.innerHeight * .55;

    let newIndex: number = -1;

    for (let i = 0; i < categories.length; i++) {
      const categoryTop = categories[i].nativeElement.getBoundingClientRect().top;

      if (categoryTop <= THRESHOLD) {
        newIndex = i;
      } else {
        break;
      }
    }

    if (newIndex !== this.currentInView) {
      if (this.currentInView !== -1) {
        this.renderer.removeClass(categories[this.currentInView].nativeElement, 'in-view');
      }

      if (newIndex !== -1) {
        this.renderer.addClass(categories[newIndex].nativeElement, 'in-view');
      }

      this.currentInView = newIndex;
    }

  }

  public ngOnDestroy() {
    if (this.cleanup) {
      this.cleanup();
    }
  }
}
