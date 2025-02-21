import Router from 'koa-router'; 
import { authService } from '../services/authService';
import { sessionService } from '../services/sessionService';

const router = new Router(); 

interface Try { 
  email: string; 
  password: string; 
}

// Define una ruta POST para el login
router.post('/login', async (ctx) => {
  const { email, password } = ctx.request.body as Try;
  if (!email || !password) {
    ctx.status = 400;
    ctx.body = { error: 'Email y contraseña son obligatorios' };
    return;
  }

  // Verifica si las credenciales son inválidas
  if (!authService.authenticate(email, password)) {
    ctx.status = 401;
    ctx.body = { error: 'Credenciales inválidas' };
    return;
  }

  // Crea una nueva sesión y obtiene el token
  const token = sessionService.createSession(email);
  ctx.body = { token };
});

// Define una ruta POST para el logout
router.post('/logout', async (ctx) => {
  const authHeader = ctx.headers.authorization;
  // Verifica si el encabezado de autorización comienza con 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    ctx.status = 400;
    ctx.body = { error: 'Token no proporcionado' };
    return;
  }

  // Obtiene el token del encabezado de autorización
  const token = authHeader.split(' ')[1];
  sessionService.deleteSession(token); // Elimina la sesión correspondiente al token
  ctx.body = { message: 'Sesión cerrada correctamente' };
}
);

export default router;