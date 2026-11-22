import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface Produkt {
    produktId: number;
    produktName: string;
    produktBeschreibung: string;
    produktMenge: string | number;
}

@Injectable({ providedIn: 'root' })
export class ProduktService {
    private readonly http = inject(HttpClient);

    anlegen(
        produktName: string,
        produktBeschreibung: string
    ) {
        return this.http.post<Produkt>('/api/products', {
            produktName,
            produktBeschreibung
        });
    }
}