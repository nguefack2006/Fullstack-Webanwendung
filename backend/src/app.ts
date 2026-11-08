import  express , {Request , Response} from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './config/swagger';
import benutzerRoutes from './routes/benutzer.routes';
import produktRoutes from './routes/produkt.routes';
import { sessionMiddleware } from './config/session';
import { loadBenutzer } from './middlewares/authentifizierung';
const app = express(); 
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
);
app.use(express.json()); 
app.use(sessionMiddleware);
app.use(loadBenutzer);

app.use('/api', benutzerRoutes);
app.use('/api/products', produktRoutes);
app.get('/', (req: Request, res: Response)=> {res.send ('Hello Wold !');
    
});

export default app;
