import { Component, InputSignal, inject, input } from '@angular/core';
import { SkillCategory } from '#features/about/models/skill-category.model.js';
import { UtilityService } from '#core/services/utility.service.js';
import { CATEGORY } from '#features/about/models/category.model.js';

@Component({
  selector: 'slnd-skill-category',
  imports: [],
  templateUrl: './skill-category.component.html',
  styleUrl: './skill-category.component.scss',
  host: {
    '[class.slnd-bubble-back]': 'true',
    '[class.core-category]': 'skillCategory().title == CATEGORY.CORE',
  }
})
export class SkillCategoryComponent {

  private utilityService = inject(UtilityService);

  public readonly skillCategory: InputSignal<SkillCategory> = input.required();

  public readonly darkMode = this.utilityService.darkMode;

  protected readonly CATEGORY = CATEGORY;

}
