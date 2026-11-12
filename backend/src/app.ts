import  express , {Request , Response} from 'express';
import { createReadinessHandler } from './controllers/readiness.controller';
import { sequelize } from './config/postgres';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './config/swagger';
import benutzerRoutes from './routes/benutzer.routes';
import produktRoutes from './routes/produkt.route';
import stockRoutes from './routes/stock.route';
import warenbewegungRoutes from './routes/warenbewegung.route';
import statistikRoutes from './routes/statistik.route';
import { sessionMiddleware } from './config/session';
import { loadBenutzer } from './middlewares/authentifizierung';

const app = express(); 

app.get('/api/ready', createReadinessHandler(() => sequelize.authenticate()));

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: { defaultModelsExpandDepth: -1 }
}),
);
app.use(express.json()); 

app.use(sessionMiddleware);
app.use(loadBenutzer);

app.use('/api', benutzerRoutes);
app.use('/api/products', produktRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/products', warenbewegungRoutes);
app.use('/api/products', statistikRoutes);
app.get('/', (req: Request, res: Response)=> {res.send ('Hello Wold !');
    
});



export default app;

