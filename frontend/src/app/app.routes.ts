import { Routes } from '@angular/router';

import { AnmeldenComponent } from './anmelden/anmelden';
import {wareneingang } from './wareneingang/wareneingang';
import { warenausgang } from './warenausgang/warenausgang';
import { ShowAllProdukt } from './show-all-produkt/show-all-produkt';


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
  },
  {
    path: 'produkte',
    component: ShowAllProdukt
  }

];