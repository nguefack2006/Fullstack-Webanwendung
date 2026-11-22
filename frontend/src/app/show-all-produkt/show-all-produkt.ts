
import {
  Component,
  ChangeDetectorRef,
  OnInit,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Produkt {
  produktId: number;
  produktName: string;
  produktBeschreibung: string;
  produktMenge: string;
  erstelltVon: number;
}

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-show-all-produkt',
  styleUrl: './show-all-produkt.css',
  templateUrl: './show-all-produkt.html',
})
export class ShowAllProdukt implements OnInit {

  suchbegriff = '';
  meldung = '';
  produkte: Produkt[] = [];
  ausgewaehltesProdukt: Produkt | null = null;
  urspruenglichesProdukt: Produkt | null = null;

  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.alleProdukteLaden();
  }

  neueMenge = 0;
  benutzerId: number | null = null;

  alleProdukteLaden() {
    this.http.get<Produkt[]>('/api/products', {
      withCredentials: true
    }).subscribe({
      next: daten => {
        this.produkte = daten;
        this.meldung = '';
        this.cdr.detectChanges();
      },
      error: fehler => {
        this.meldung =
          fehler.error?.error || 'Fehler beim Laden der Produkte.';
        this.cdr.detectChanges();
      }
    });
  }

  produktSuchen() {
    const suche = this.suchbegriff.trim();

    if (!suche) {
      this.alleProdukteLaden();
      return;
    }

    const istId = /^\d+$/.test(suche);

    const url = istId
      ? `/api/products/${suche}`
      : `/api/products/search?name=${encodeURIComponent(suche)}`;

    this.http.get<Produkt | Produkt[]>(url, {
      withCredentials: true
    }).subscribe({
      next: daten => {
        this.produkte = Array.isArray(daten) ? daten : [daten];
        this.meldung = this.produkte.length === 0
          ? 'Keine Produkte gefunden.'
          : '';
        this.cdr.detectChanges();
      },
      error: fehler => {
        this.produkte = [];
        this.meldung =
          fehler.status === 404 || fehler.status === 400
            ? 'Produkt nicht gefunden.'
            : fehler.error?.error || 'Fehler bei der Produktsuche.';
        this.cdr.detectChanges();
      }
    });
  }

  getStatus(menge: string | number): string {
    const bestand = Number(menge);

    if (bestand <= 0) {
      return 'Nicht verfügbar';
    }

    if (bestand <= 10) {
      return 'Niedriger Bestand';
    }

    return 'Verfügbar';
  }

  produktAnlegen() {
    this.meldung = 'Produkt anlegen ist noch nicht eingerichtet.';
  }

  produktBearbeiten(produkt: Produkt) {
    this.urspruenglichesProdukt = { ...produkt };
    this.ausgewaehltesProdukt = { ...produkt };
    this.neueMenge = Number(produkt.produktMenge);
}

  bearbeitenAbbrechen() {
    this.ausgewaehltesProdukt = null;
    this.urspruenglichesProdukt = null;
  }

  aenderungenSpeichern() {
    if (!this.ausgewaehltesProdukt || !this.urspruenglichesProdukt) return;

    const produkt = this.ausgewaehltesProdukt;
    const vorher = this.urspruenglichesProdukt;
    const produktName = produkt.produktName.trim();
    const produktBeschreibung = produkt.produktBeschreibung.trim();
    const mengeEingabe = produkt.produktMenge;

    this.meldung = '';

    if (!produktName || produktName.length > 255) {
        this.meldung = 'Bitte einen Produktnamen mit maximal 255 Zeichen eingeben.';
        return;
    }
    
    if (!produktBeschreibung || produktBeschreibung.length > 255) {
      this.meldung = 'Bitte eine Beschreibung mit maximal 255 Zeichen eingeben.';
      return;
    }

    if (
        mengeEingabe === null ||
        mengeEingabe === undefined ||
        mengeEingabe === ''
    ) {
        this.meldung = 'Bitte eine gültige Menge eingeben.';
        return;
    }

    const produktMenge = Number(mengeEingabe);

    if (!Number.isFinite(produktMenge) || produktMenge < 0) {
        this.meldung = 'Die Menge muss eine Zahl ab 0 sein.';
        return;
    }

    const daten: {
        produktName?: string;
        produktMenge?: number;
        produktBeschreibung?: string;
    } = {};

    if (produktName !== vorher.produktName) {
        daten.produktName = produktName;
    }

    if (produktBeschreibung !== vorher.produktBeschreibung) {
      daten.produktBeschreibung = produktBeschreibung;
    }

    if (produktMenge !== Number(vorher.produktMenge)) {
        daten.produktMenge = produktMenge;
    }

    if (Object.keys(daten).length === 0) {
        this.meldung = 'Keine Änderungen vorhanden.';
        return;
    }

    this.http.patch(
        `/api/products/${produkt.produktId}`,
        daten,
        { withCredentials: true }
    ).subscribe({
        next: () => {
            this.ausgewaehltesProdukt = null;
            this.urspruenglichesProdukt = null;
            this.alleProdukteLaden();
        },
        error: fehler => {
            this.meldung =
                fehler.error?.message ||
                fehler.error?.error ||
                'Fehler beim Bearbeiten.';
            this.cdr.detectChanges();
        }
    });
  }

  produktLoeschen(produkt: Produkt) {
    const bestaetigt = confirm(
      `Produkt "${produkt.produktName}" wirklich löschen?`
    );

    if (!bestaetigt) return;

    this.http.delete(
      `/api/products/${produkt.produktId}`,
      { withCredentials: true }
    ).subscribe({
      next: () => {
        this.produkte = this.produkte.filter(
          p => p.produktId !== produkt.produktId
        );
        this.meldung = 'Produkt erfolgreich gelöscht.';
        this.cdr.detectChanges();
      },
      error: fehler => {
        this.meldung =
          fehler.error?.error || 'Fehler beim Löschen.';
        this.cdr.detectChanges();
      }
    });
  }
}
