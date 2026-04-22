import { computed, inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { Reference } from '@features/projects/models/reference.model';
import { references, github } from '@features/projects/data/references';
import { Tech } from '@core/models/tech.model';
import { ReferenceView } from '@slnd/shared';
import { UtilityService } from '@core/services/utility.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  private utilityService: UtilityService = inject(UtilityService);

  public readonly referenceView: Signal<ReferenceView> = computed(() => {
    return this.utilityService.currentUIOptions().referenceView;
  });

  public readonly references: Signal<Reference[]> = signal(references);
  public readonly availableTags = computed(() => {
    const tags: Set<string> = new Set();
    this.references().forEach((reference) => {
      reference.tags.forEach((tag) => {
        tags.add(tag);
      })
    })
    return tags;
  })

  public readonly sortedTags: Signal<Tech[]> = computed(() => {
    return [...this.availableTags()].sort();
  });

  private _activeFilter: WritableSignal<Set<Tech>> = signal(new Set());
  public readonly activeFilter = this._activeFilter.asReadonly();

  public readonly filteredReferences: Signal<Reference[]> = computed(() => {
    const filterTags = this.activeFilter();
    const filteredReferences: Set<Reference> = new Set([...this.references()]);
    filterTags.forEach((filter) => {
      filteredReferences.forEach((reference) => {
        if (!reference.tags.includes(filter)) {
          filteredReferences.delete(reference);
        }
      })
    });
    filteredReferences.add(github);
    return Array.from(filteredReferences);
  })

  public readonly possibleCombinationTags: Signal<Set<Tech>> = computed(() => {
    const possibleCombinationTags: Set<Tech> = new Set();
    this.filteredReferences().forEach((reference) => {
      reference.tags.forEach((tag) => {
        possibleCombinationTags.add(tag);
      })
    })

    return possibleCombinationTags;
  })

  public setReferenceView(view: ReferenceView) {
    this.utilityService.setReferenceView(view);
  }

  public toggleFilter(tag: Tech) {
    const currentFilterTags: Set<Tech> = new Set([...this.activeFilter()]);
    if (currentFilterTags.has(tag)) {
      currentFilterTags.delete(tag);
    } else {
      currentFilterTags.add(tag);
    }
    this._activeFilter.set(currentFilterTags);
  }

}
