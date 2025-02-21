import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import authRoutes from './routes/authRoutes';
import protectedRoutes from './routes/protectedRoutes';

const app = new Koa();

app.use(bodyParser());
app.use(authRoutes.routes());
app.use(protectedRoutes.routes());

export default app;
