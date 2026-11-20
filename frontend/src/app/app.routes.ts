import { Routes } from '@angular/router';

import { AnmeldenComponent } from './anmelden/anmelden.component';
import { wareneingang } from './wareneingang/wareneingang';
import { warenausgang } from './warenausgang/warenausgang';

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
  },
  {
    path: 'warenausgang',
    component: warenausgang
  }
];