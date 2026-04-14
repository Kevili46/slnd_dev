import { Component, signal, Signal } from '@angular/core';
import { HighlightHeadingComponent } from '@shared/features/highlight-heading/highlight-heading.component';
import { contacts } from '@features/contact/data/contacts.js';
import { Contact } from '@features/contact/models/contact.model';
import { IconComponent } from "@shared/features/icon/icon.component";

@Component({
  selector: 'slnd-contact',
  imports: [HighlightHeadingComponent, IconComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})

export class ContactComponent {

  public readonly contacts: Signal<Contact[]> = signal(contacts);

}
