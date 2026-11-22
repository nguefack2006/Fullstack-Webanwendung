import type { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { AuthService, type Benutzer } from '../services/auth.service';
import { Abmelden } from '../abmelden/abmelden';
import { ProduktAnlegen } from '../produkt-anlegen/produkt-anlegen';

@Component({
    selector: 'app-anmelden',
    imports: [ReactiveFormsModule, Abmelden, ProduktAnlegen],
    templateUrl: './anmelden.html'
})
export class AnmeldenComponent {
    private readonly authService = inject(AuthService);
    private readonly formBuilder = inject(FormBuilder);

    readonly formular = this.formBuilder.nonNullable.group({
        benutzerEmail: ['', [Validators.required, Validators.email]],
        benutzerPasswort: ['', Validators.required]
    });

    readonly benutzer = signal<Benutzer | null>(null);
    readonly laedt = signal(false);
    readonly fehler = signal('');

    anmelden(): void {
        if (this.formular.invalid || this.laedt()) {
            return;
        }

        const { benutzerEmail, benutzerPasswort } = this.formular.getRawValue();

        this.laedt.set(true);
        this.fehler.set('');

        this.authService.login(benutzerEmail, benutzerPasswort)
            .pipe(finalize(() => this.laedt.set(false)))
            .subscribe({
                next: ({ benutzer }) => {
                    this.benutzer.set(benutzer);
                    this.formular.controls.benutzerPasswort.reset();
                },
                error: (error: HttpErrorResponse) => {
                    this.fehler.set(
                        error.status === 401
                            ? 'E-Mail-Adresse oder Passwort ist falsch.'
                            : 'Anmeldung fehlgeschlagen. Bitte erneut versuchen.'
                    );
                }
            });
    }

}