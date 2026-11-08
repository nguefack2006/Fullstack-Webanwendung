import {getAllProdukte,getProduktById,suchProdukteByName} from "../controllers/produkt.controller";
import express from 'express';

const router = express.Router();

router.get("/", getAllProdukte);
router.get("/search", suchProdukteByName);
router.get("/:id", getProduktById);



export default router;