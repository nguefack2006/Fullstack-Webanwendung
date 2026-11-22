import { Routes } from '@angular/router';

import { AnmeldenComponent } from './anmelden/anmelden';
import {wareneingang } from './wareneingang/wareneingang';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'anmelden',
    pathMatch: 'full'
  },
  {
    path: 'anmelden',
    component: AnmeldenComponent
  },
  {
    path: 'wareneingang',
    component: wareneingang
  }
];