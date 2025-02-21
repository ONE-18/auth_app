import { Context, Next } from 'koa';
import { sessionService } from '../services/sessionService';

// Middleware function to authenticate requests
export async function authMiddleware(ctx: Context, next: Next) {
  
  // Get the Authorization header from the request
  const authHeader = ctx.headers.authorization;

  // Check if the Authorization header starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // Respond with 401 Unauthorized if the token is not provided
    ctx.status = 401;
    ctx.body = { error: 'No autorizado. Token no proporcionado.' };
    return;
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(' ')[1];

  // Validate the session using the token
  if (!sessionService.validateSession(token)) {
    // Respond with 401 Unauthorized if the token is invalid or expired
    ctx.status = 401;
    ctx.body = { error: 'Token inválido o expirado.' };
    return;
  }

  await next();
}
