import {buchenWareneingang, buchenWarenausgang} from "../controllers/stock.controller";
import {Router} from "express";

const router = Router();

router.post('/wareneingang', buchenWareneingang);
router.post('/warenausgang', buchenWarenausgang);
export default router;
