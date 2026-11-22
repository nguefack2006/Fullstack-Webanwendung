import type { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { ProduktService } from '../services/produkt.service';

@Component({
    selector: 'app-produkt-anlegen',
    imports: [ReactiveFormsModule],
    templateUrl: './produkt-anlegen.html',
    styleUrl: './produkt-anlegen.css'
})
export class ProduktAnlegen {
    private readonly produktService = inject(ProduktService);
    private readonly formBuilder = inject(FormBuilder);

    readonly formular = this.formBuilder.nonNullable.group({
        produktName: ['', [Validators.required, Validators.maxLength(255)]],
        produktBeschreibung: ['', [Validators.required, Validators.maxLength(255)]]
    });

    readonly laedt = signal(false);
    readonly fehler = signal('');
    readonly erfolg = signal('');

    speichern(): void {
        if (this.laedt()) {
            return;
        }

        this.fehler.set('');
        this.erfolg.set('');

        if (this.formular.invalid) {
            this.formular.markAllAsTouched();
            return;
        }

        const daten = this.formular.getRawValue();
        const produktName = daten.produktName.trim();
        const produktBeschreibung = daten.produktBeschreibung.trim();

        if (!produktName || !produktBeschreibung) {
            this.fehler.set('Bitte Name und Beschreibung eingeben.');
            return;
        }

        this.laedt.set(true);

        this.produktService.anlegen(produktName, produktBeschreibung)
            .pipe(finalize(() => this.laedt.set(false)))
            .subscribe({
                next: () => {
                    this.erfolg.set('Produkt erfolgreich angelegt.');
                    this.formular.reset();
                },
                error: (error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        this.fehler.set('Bitte zuerst anmelden.');
                    } else if (error.status === 403) {
                        this.fehler.set('Nur der Lagerverwalter darf Produkte anlegen.');
                    } else {
                        this.fehler.set('Produkt konnte nicht angelegt werden.');
                    }
                }
            });
    }
}