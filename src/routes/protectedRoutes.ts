import Router from 'koa-router';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = new Router();

// Define una ruta GET para '/protected' que utiliza el middleware de autenticación
router.get('/protected', authMiddleware, async (ctx) => {
  ctx.body = { message: 'Acceso concedido a contenido protegido' };
});

export default router;
