import { Component, ElementRef, viewChildren, Signal, signal, inject, Renderer2, OnDestroy, afterNextRender, computed } from '@angular/core';
import { ButtonComponent } from '@shared/features/button/button.component';
import { SkillCategoryComponent } from '@features/about/skills/skill-category/skill-category.component';
import { CATEGORY, CategoryType } from '@features/about/models/category.model';
import { SkillCategory } from '@features/about/models/skill-category.model';
import { Skill } from '@features/about/models/skill.model';
import { skills } from '@features/about/skills/data/skills';
import { BUTTON } from '@shared/features/button/models/button-type.model';

@Component({
  selector: 'slnd-skills',
  imports: [ButtonComponent, SkillCategoryComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent implements OnDestroy {

  private renderer: Renderer2 = inject(Renderer2);

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

  protected readonly BUTTON = BUTTON;

}
