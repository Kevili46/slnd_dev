import { Component, Signal, WritableSignal, signal, computed } from '@angular/core';
import { Reference } from '@features/work/models/reference.model';
import { ButtonComponent } from '@shared/features/button/button.component';
import { BUTTON } from '@shared/features/button/models/button-type.model';
import { HighlightHeadingComponent } from '@shared/features/highlight-heading/highlight-heading.component';

import { ReferenceComponent } from './ui/reference/reference.component';

import { references } from './data/references';

@Component({
  selector: 'slnd-work',
  imports: [ButtonComponent, ReferenceComponent, HighlightHeadingComponent],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss'
})
export class WorkComponent {

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

  public readonly filteredReferences: Signal<Reference[]> = computed(() => {
    const filterTags = this.filterTags();
    const filteredReferences: Set<Reference> = new Set([...this.references()]);
    filterTags.forEach((filter) => {
      filteredReferences.forEach((reference) => {
        if (!reference.tags.includes(filter)) {
          filteredReferences.delete(reference);
        }
      })
    })
    return Array.from(filteredReferences);
  })

  private _filterTags: WritableSignal<Set<string>> = signal(new Set());
  public readonly filterTags = this._filterTags.asReadonly();

  public filterReferences(tag: string) {
    const currentFilterTags: Set<string> = new Set([...this.filterTags()]);
    if (currentFilterTags.has(tag)) {
      currentFilterTags.delete(tag);
    } else {
      currentFilterTags.add(tag);
    }
    this._filterTags.set(currentFilterTags);
  }

  protected readonly BUTTON = BUTTON;
}

