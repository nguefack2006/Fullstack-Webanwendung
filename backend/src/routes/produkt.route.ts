import {handleCreateProdukt, handleUpdateProdukt, handleDeleteProdukt} from '../controllers/produkt.controller';
import {getAllProdukte,getProduktById,suchProdukteByName} from "../controllers/produkt.controller";
import express from 'express';

const router = express.Router();

router.get("/", getAllProdukte);
router.get("/search", suchProdukteByName);
router.get("/:id", getProduktById);
router.post('/', handleCreateProdukt);
router.patch('/:id', handleUpdateProdukt);
router.delete('/:id', handleDeleteProdukt);
    


export default router;