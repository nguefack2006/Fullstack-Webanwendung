import type { RequestHandler } from 'express';

export function createReadinessHandler(
    checkDatabase: () => Promise<void>
): RequestHandler {
    return async (_req, res) => {
        try {
            await checkDatabase();
        } catch {
            res.status(503).json({ status: 'not_ready' });
            return;
        }

        res.status(200).json({ status: 'ready' });
    };
}