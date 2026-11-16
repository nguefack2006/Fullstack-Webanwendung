import { Routes } from '@angular/router';
import { AnmeldenComponent } from './anmelden/anmelden.component';

export const routes: Routes = [
    { path: '', redirectTo: 'anmelden', pathMatch: 'full' },
    { path: 'anmelden', component: AnmeldenComponent }
];