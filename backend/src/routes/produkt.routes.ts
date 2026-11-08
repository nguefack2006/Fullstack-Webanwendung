import { Router } from 'express';
import {handleCreateProdukt, handleUpdateProdukt, handleDeleteProdukt} from '../controllers/produkt.controller';

const router = Router();

router.post('/', handleCreateProdukt);
router.patch('/:id', handleUpdateProdukt);
router.delete('/:id', handleDeleteProdukt);

export default router;