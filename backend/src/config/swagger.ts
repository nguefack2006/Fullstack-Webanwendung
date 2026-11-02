export const swaggerDocument = {
  openapi: '3.0.3',
  info: {
    title: 'Lagerverwaltung API',
    version: '1.0.0',
    description: 'API der Lagerverwaltungsanwendung',
  },
  paths: {
    '/': {
      get: {
        summary: 'Erreichbarkeit des Backends prüfen',
        responses: {
          '200': {
            description: 'Das Backend antwortet erfolgreich',
            content: {
              'text/html': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  },
};