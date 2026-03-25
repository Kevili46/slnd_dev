import { Component, ElementRef, viewChildren, Signal, signal, inject, Renderer2, OnDestroy, afterNextRender, computed } from '@angular/core';
import { SkillCategory } from '@features/about/models/skill-category.model';
import { Skill } from '@features/about/models/skill.model';
import { TitleHeadingComponent } from '@features/about/title-heading/title-heading.component';
import { AboutMeComponent } from '@features/about/about-me/about-me.component';
import { ButtonComponent } from '@shared/features/button/button.component';
import { SkillCategoryComponent } from '@features/about/skill-category/skill-category.component';
import { skills } from '@features/about/content/skills';
import { CATEGORY, CategoryType } from './models/category.model';

@Component({
  selector: 'slnd-about',
  imports: [ButtonComponent, SkillCategoryComponent, TitleHeadingComponent, AboutMeComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})


export class AboutComponent implements OnDestroy {
  private renderer: Renderer2 = inject(Renderer2);
  private elRef: ElementRef = inject(ElementRef);

  public skills: Signal<Skill[]> = signal(skills);
  public skillCategories: Signal<SkillCategory[]> = computed(() => {
    return this.sortSkills();
  })

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

  private sortSkills() {
    const skills: Skill[] = this.skills();
    const skillCategories: Map<CategoryType | string, SkillCategory> = new Map([
      [CATEGORY.CORE, { title: CATEGORY.CORE, skills: [] }],
    ]);

    skills.forEach((skill) => {
      if (skill.core) {
        skillCategories.get(CATEGORY.CORE)?.skills.push(skill);
      }
      const category: SkillCategory | undefined = skillCategories.get(skill.category);
      if (category) {
        category.skills.push(skill);
        return;
      }
      const newCategory: SkillCategory = { title: skill.category, skills: [skill] };
      skillCategories.set(skill.category, newCategory);
    });

    return Array.from(skillCategories.values());
  }
}
