import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [FormsModule],
  selector: 'app-warenausgang',
  styleUrl: './warenausgang.css',
  templateUrl: './warenausgang.html',
})

export class warenausgang {
  produktId = 0;
  menge = 1;
  meldung = '';

  constructor(private http: HttpClient) { }
  private cdr = inject(ChangeDetectorRef);

  abbuchen() {
    this.http.post(
      '/api/stock/warenausgang',
      {
        produktId: this.produktId,
        menge: this.menge
      },
      { withCredentials: true }
    ).subscribe({
      next: () => {
        this.meldung = 'Warenausgang erfasst!';
        this.cdr.detectChanges();
      },
      error: (fehler) => {
        this.meldung =
          fehler.error?.error || 'Fehler beim Warenausganggang!';
        this.cdr.detectChanges();
      }
    });
  }
}

