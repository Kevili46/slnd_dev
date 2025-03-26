import { Component } from '@angular/core';
import { work } from '../../data/references';
import { Reference } from '../../model/Reference.type';

@Component({
  selector: 'slnd-work',
  imports: [],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss'
})
export class WorkComponent {

  work: Reference[] = work;
}
