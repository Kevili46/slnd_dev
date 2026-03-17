import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './features/about/about.component';
import { ContactComponent } from './features/contact/contact.component';
import { WorkComponent } from './features/work/work.component';
import { ImpressumComponent } from './features/impressum/impressum.component';
import { PrivacyComponent } from './features/privacy/privacy.component';

export const routes: Routes = [
    { path: '', component: AboutComponent, title: 'About | SLND.' },
    { path: 'work', component: WorkComponent, title: 'Work | SLND.' },
    { path: 'contact', component: ContactComponent, title: 'Contact | SLND.' },
    { path: 'impressum', component: ImpressumComponent, title: 'Impressum | SLND.' },
    { path: 'privacy', component: PrivacyComponent, title: 'Privacy | SLND.' },
    { path: '**', redirectTo: '' }
];