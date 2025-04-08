import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { WorkComponent } from './components/work/work.component';

export const routes: Routes = [
    { path: '', component: AboutComponent, title: 'About | SLND.' },
    { path: 'work', component: WorkComponent, title: 'Work | SLND.' },
    { path: 'contact', component: ContactComponent, title: 'Contact | SLND.' },
    { path: '**', redirectTo: '' }
];