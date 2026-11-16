import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface Benutzer {
    benutzerId: number;
    benutzerVorname: string;
    benutzerNachname: string;
    benutzerEmail: string;
    benutzerRolle: 'LAGERVERWALTER' | 'LAGERASSISTENT';
}

interface LoginResponse {
    message: string;
    benutzer: Benutzer;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly http = inject(HttpClient);

    login(benutzerEmail: string, benutzerPasswort: string) {
        return this.http.post<LoginResponse>('/api/auth/login', {
            benutzerEmail,
            benutzerPasswort
        });
    }

    logout() {
        return this.http.post<{ message: string }>('/api/auth/logout', {});
    }
}