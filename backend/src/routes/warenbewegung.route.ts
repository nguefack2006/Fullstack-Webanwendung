import {Router} from "express";
import { getProduktBewegungenById } from "../controllers/warenbewegung.controller";

const router = Router();

router.get("/:id/movements", getProduktBewegungenById);
export default router;