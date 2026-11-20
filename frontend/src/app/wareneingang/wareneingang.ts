import { Component, ChangeDetectorRef, inject } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);

  buchen() {
    this.http.post(
      '/api/stock/wareneingang',
      {
        produktId: this.produktId,
        menge: this.menge
      },
      { withCredentials: true }
    ).subscribe({
      next: () => {
        this.meldung = 'Wareneingang erfasst!';
        this.cdr.detectChanges();
      },
      error: (fehler) => {
        this.meldung =
          fehler.error?.error || 'Fehler beim Wareneingang!';
        this.cdr.detectChanges();
      }
    });
  }
}

