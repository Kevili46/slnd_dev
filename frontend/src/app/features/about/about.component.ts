import { Component } from '@angular/core';
import { TitleHeadingComponent } from '@features/about/ui/title-heading/title-heading.component';
import { AboutMeComponent } from '@features/about/ui/about-me/about-me.component';
import { SkillsComponent } from '@features/about/ui/skills/skills.component';

@Component({
  selector: 'slnd-about',
  imports: [TitleHeadingComponent, AboutMeComponent, SkillsComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})


export class AboutComponent {
  constructor() {
    console.log('hey');
  }
}
