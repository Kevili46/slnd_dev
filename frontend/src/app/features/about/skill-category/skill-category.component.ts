import { Component, InputSignal, inject, input } from '@angular/core';
import { SkillCategory } from '../models/SkillCategory.type';
import { UtilityService } from '@core/services/utility.service';

@Component({
  selector: 'slnd-skill-category',
  imports: [],
  templateUrl: './skill-category.component.html',
  styleUrl: './skill-category.component.scss',
})
export class SkillCategoryComponent {

  private utilityService = inject(UtilityService);

  public readonly darkMode = this.utilityService.darkMode;

  public readonly skillCategory: InputSignal<SkillCategory> = input.required();

}
