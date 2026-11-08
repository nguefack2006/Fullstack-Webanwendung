import type { Request, Response, NextFunction } from 'express';
import { getBenutzerById } from '../models/benutzer.model';

export async function loadBenutzer(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const benutzerId = req.session.benutzerId;

    if (benutzerId === undefined) {
        next();
        return;
    }

    try {
        const benutzer = await getBenutzerById(benutzerId);

        if (benutzer) {
            res.locals.benutzer = benutzer.get({ plain: true });
        }

        next();
    } catch (error) {
        next(error);
    }
}
