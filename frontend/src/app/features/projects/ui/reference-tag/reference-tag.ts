import { booleanAttribute, Component, computed, inject, input, InputSignal, InputSignalWithTransform, Signal } from '@angular/core';
import { DisableableHost } from '@core/models/disableable-host';
import { Tech } from '@core/models/tech.model';
import { ProjectService } from '@features/projects/services/project.service';

@Component({
  selector: 'slnd-reference-tag',
  imports: [],
  templateUrl: './reference-tag.html',
  styleUrl: './reference-tag.scss',
  providers: [
    {
      provide: DisableableHost,
      useExisting: ReferenceTag
    }
  ],
  host: {
    '(omniClick)': 'toggleFilter()',
    '[class.filter]': 'filter()',
    '[class.filter-match]': 'matchesFilter()',
    '[class.filter-active]': 'activeFilter()',
    '[attr.disabled]': 'disabled() ? "" : null',

  }
})
export class ReferenceTag implements DisableableHost {

  private projectService: ProjectService = inject(ProjectService);

  public readonly tag: InputSignal<Tech> = input.required();
  public readonly filter: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute });

  public readonly matchesFilter: Signal<boolean> = computed(() => {
    return this.projectService.activeFilter().has(this.tag());
  });

  public readonly activeFilter: Signal<boolean> = computed(() => {
    return this.filter() && this.matchesFilter();
  });

  public readonly disabled: Signal<boolean> = computed(() => {
    return this.filter() && !this.projectService.possibleCombinationTags().has(this.tag());
  });

  public toggleFilter() {
    if (!this.filter()) return;
    this.projectService.toggleFilter(this.tag());
  }
}
