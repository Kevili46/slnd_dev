import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { WorkComponent } from './components/work/work.component';

export const routes: Routes = [
    { path: '', component: AboutComponent, title: 'About | slnd' },
    { path: 'work', component: WorkComponent, title: 'Work | slnd' },
    { path: 'contact', component: ContactComponent, title: 'Contact | slnd' }
];