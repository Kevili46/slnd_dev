import { Component, Signal, computed, inject } from '@angular/core';
import { ProjectService } from '@features/projects/services/project.service';
import { Reference } from '@features/projects/models/reference.model';
import { BUTTON } from '@shared/features/button/models/button-type.model';
import { Tech } from '@core/models/tech.model';
import { REFERENCE_VIEW, ReferenceView } from '@features/projects/models/reference-view.model';
import { HighlightHeadingComponent } from '@shared/features/highlight-heading/highlight-heading.component';
import { ReferenceTag } from "@features/projects/ui/reference-tag/reference-tag";
import { ReferenceTileViewComponent } from "@features/projects/ui/reference-tile-view/reference-tile-view.component";
import { ButtonComponent } from "@shared/features/button/button.component";
import { ReferenceListViewComponent } from "@features/projects/ui/reference-list-view/reference-list-view.component";
import { OmniClickDirective } from '@core/directives/omni-click.directive';

@Component({
  selector: 'slnd-projects',
  imports: [HighlightHeadingComponent, ReferenceTag, ReferenceTileViewComponent, ButtonComponent, ReferenceListViewComponent, OmniClickDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

  private projectService: ProjectService = inject(ProjectService);

  public readonly sortedTags: Signal<Tech[]> = this.projectService.sortedTags;
  public readonly filteredReferences: Signal<Reference[]> = this.projectService.filteredReferences;
  public readonly referenceView: Signal<ReferenceView> = this.projectService.referenceView;

  public readonly viewOptions: Signal<ReferenceView[]> = computed(() => {
    return Object.values(REFERENCE_VIEW);
  })

  public setReferenceView(view: ReferenceView) {
    this.projectService.setReferenceView(view);
  }

  protected readonly BUTTON = BUTTON;
  protected readonly REFERENCE_VIEW = REFERENCE_VIEW;
}

