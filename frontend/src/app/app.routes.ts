import { Routes } from '@angular/router';
import { AboutComponent } from '@features/about/about.component';
import { ContactComponent } from '@features/contact/contact.component';
import { ProjectsComponent } from '@features/projects/projects.component';
import { ImpressumComponent } from '@features/impressum/impressum.component';
import { PrivacyComponent } from '@features/privacy/privacy.component';

export const routes: Routes = [
    { path: '', component: AboutComponent, title: 'About | SLND.' },
    { path: 'projects', component: ProjectsComponent, title: 'Projects | SLND.' },
    { path: 'contact', component: ContactComponent, title: 'Contact | SLND.' },
    { path: 'impressum', component: ImpressumComponent, title: 'Impressum | SLND.' },
    { path: 'privacy', component: PrivacyComponent, title: 'Privacy | SLND.' },
    { path: '**', redirectTo: '' }
];