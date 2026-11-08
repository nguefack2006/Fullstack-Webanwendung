import  express , {Request , Response} from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './config/swagger';
import produktRoutes from './routes/produkt.route';
import stockRoutes from './routes/stock.route';
import warenbewegungRoutes from './routes/warenbewegung.route';
import statistikRoutes from './routes/statistik.route';
const app = express(); 
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
);
app.use(express.json()); 

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.use('/api/products', produktRoutes);
app.use('/api/stock/', stockRoutes);
app.use('/api/products', warenbewegungRoutes);
app.use('/api/products', statistikRoutes);

export default app;
