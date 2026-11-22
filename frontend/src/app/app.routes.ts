import { Routes } from '@angular/router';

import { AnmeldenComponent } from './anmelden/anmelden';
import { wareneingang } from './wareneingang/wareneingang';
import { warenausgang } from './warenausgang/warenausgang';
import { ShowAllProdukt } from './show-all-produkt/show-all-produkt';
import { ProduktAnlegen } from './produkt-anlegen/produkt-anlegen';


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
    path: 'produkt-anlegen',
    component: ProduktAnlegen
  },
  {
    path: 'produkte',
    component: ShowAllProdukt
  }

];