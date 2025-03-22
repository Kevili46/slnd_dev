import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'slnd-about',
  imports: [RouterLink, ButtonComponent, CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})

export class AboutComponent {

  uiux: skillCategory = {
    name: "UI/UX design",
    skills: [
      {
        name: "Adobe XD",
        icon: "assets/icons/adobe_xd.svg"
      },
      {
        name: "Figma",
        icon: "assets/icons/figma.svg"
      },
    ]
  }

  programming: skillCategory = {
    name: "programming & coding",
    skills: [
      {
        name: "JavaScript",
        icon: "assets/icons/javascript.svg"
      },
      {
        name: "Python",
        icon: "assets/icons/python.svg"
      },
      {
        name: "Java",
        icon: "assets/icons/java.svg"
      },
      {
        name: "CSS",
        icon: "assets/icons/css.svg"
      },
      {
        name: "HTML",
        icon: "assets/icons/html.svg"
      },
    ]
  }

  skills: skillCategory[] = [this.programming, this.uiux];

}

export interface skillCategory {
  name: string;
  skills: skill[];
}

export interface skill {
  name: string;
  icon: string;
}
