import { Component, inject, output, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-abmelden',
    templateUrl: './abmelden.html',
    styleUrl: './abmelden.css'
})
export class Abmelden {
    private readonly authService = inject(AuthService);

    readonly laedt = signal(false);
    readonly fehler = signal('');
    readonly abgemeldet = output<void>();

    abmelden(): void {
        if (this.laedt()) {
            return;
        }

        this.laedt.set(true);
        this.fehler.set('');

        this.authService.logout()
            .pipe(finalize(() => this.laedt.set(false)))
            .subscribe({
                next: () => {
                    this.abgemeldet.emit();
                },
                error: () => {
                    this.fehler.set(
                        'Abmeldung fehlgeschlagen. Bitte erneut versuchen.'
                    );
                }
            });
    }
}