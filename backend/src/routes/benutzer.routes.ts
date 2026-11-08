import { Router } from 'express';
import {handleLogin,handleLogout,handleRegisterLagerverwalter,handleCreateLagerassistent} from '../controllers/benutzer.controller';

const router = Router();

router.post('/auth/login', handleLogin);
router.post('/auth/logout', handleLogout);
router.post('/auth/register', handleRegisterLagerverwalter);
router.post('/users/assistants', handleCreateLagerassistent);

export default router;