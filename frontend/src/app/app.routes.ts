import { Routes } from '@angular/router';
import { wareneingang } from './wareneingang/wareneingang';

export const routes: Routes = [
      {
    path: '',
    redirectTo: 'wareneingang',
    pathMatch: 'full'
  },
  {
    path: 'wareneingang',
    component: wareneingang
  }
];
