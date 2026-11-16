import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [FormsModule],
  selector: 'app-wareneingang',
  styleUrl: './wareneingang.css',
  templateUrl: './wareneingang.html',
})

export class wareneingang {
  produktId = 0;
  menge = 1;
  meldung = '';

  constructor(private http: HttpClient) { }

  buchen() {
    if (this.produktId <= 0 || this.menge <= 0) {
      this.meldung = 'Bitte gültige Werte eingrben!'
      return;
    }
    this.http.post('/api/stock/wareneingang', {
      produktId: this.produktId,

      menge: this.menge
    }, {
      withCredentials: true
    }).subscribe({
      next: () => {
        this.meldung = 'Wareneingang erfolgreich!';
        console.log('Wareneingang erfolgreich gebucht');
      },
      error: (fehler) => {
        this.meldung = 'Fehler beim Wareneingang!';
        console.error(fehler);
      }
    });
  }
}

