import bcrypt from 'bcrypt';
import { createBenutzer } from '../models/benutzer.model';

type NeuesKonto = {
    benutzerVorname: string;
    benutzerNachname: string;
    benutzerEmail: string;
    benutzerPasswort: string;
};

type BenutzerRolle = 'LAGERVERWALTER' | 'LAGERASSISTENT';

export async function erstelleBenutzerKonto(
    daten: NeuesKonto,
    rolle: BenutzerRolle
) {
    const benutzerPasswortHash = await bcrypt.hash(daten.benutzerPasswort, 12);

    const benutzer = await createBenutzer({
        benutzerVorname: daten.benutzerVorname.trim(),
        benutzerNachname: daten.benutzerNachname.trim(),
        benutzerEmail: daten.benutzerEmail.trim(),
        benutzerPasswortHash,
        benutzerRolle: rolle
    });

    return benutzer.get('benutzerId');
}