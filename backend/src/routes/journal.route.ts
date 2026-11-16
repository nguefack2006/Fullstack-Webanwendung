import { Router } from "express";
import { getJournal } from "../controllers/journal.controller";

const router = Router();

router.get("/", getJournal);

export default router;