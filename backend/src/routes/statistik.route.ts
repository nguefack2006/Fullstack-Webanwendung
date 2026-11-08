import {getTaeglichenWarenausgang} from "../controllers/statistik.controller";
import {Router} from "express";

const router = Router();

router.get("/:id/outgoing", getTaeglichenWarenausgang);

export default router;