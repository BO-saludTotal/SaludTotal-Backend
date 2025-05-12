import { Router } from 'express';
import { crearUsuario } from '../controllers/user.controller';

const router = Router();

router.post('/usuarios', crearUsuario);

export default router;

