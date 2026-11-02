import  express , {Request , Response} from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './config/swagger';
const app = express(); 
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
);
app.use(express.json()); 
app.get('/', (req: Request, res: Response)=> {res.send ('Hello Wold !');
    
});

export default app;
