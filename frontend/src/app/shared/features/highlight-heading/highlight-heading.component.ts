import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { HighlightHeadingSubString } from '@shared/features/highlight-heading/models/highlight-heading.model';
import { SubstringIndices } from '@shared/features/highlight-heading/models/substring-indices.model';

@Component({
  selector: 'slnd-highlight-heading',
  imports: [],
  templateUrl: './highlight-heading.component.html',
  styleUrl: './highlight-heading.component.scss',
})
export class HighlightHeadingComponent {

  public readonly heading: InputSignal<string> = input("Highlight Heading.");
  public readonly stringToHighlight: InputSignal<string> = input('Heading.');

  public readonly highlightedHeading: Signal<HighlightHeadingSubString[]> = computed(() => {
    return this.highlightSubstring(this.heading(), this.stringToHighlight());
  });

  constructor() {
  }

  private highlightSubstring(heading: string, stringToHighlight: string): HighlightHeadingSubString[] {
    const highlightedSubstrings: HighlightHeadingSubString[] = [];
    const substringIndices: SubstringIndices = {
      start: heading.indexOf(stringToHighlight),
      end: heading.indexOf(stringToHighlight) + stringToHighlight.length
    };

    const beforeHighlight = heading.slice(0, substringIndices.start);
    highlightedSubstrings.push({ text: beforeHighlight, isHighlighted: false });
    highlightedSubstrings.push({ text: stringToHighlight, isHighlighted: true });

    const afterHighlight = heading.slice(substringIndices.end);
    highlightedSubstrings.push({ text: afterHighlight, isHighlighted: false });

    return highlightedSubstrings;

  }

}
