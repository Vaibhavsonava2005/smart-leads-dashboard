import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes';
import leadRoutes from './routes/lead.routes';
import { errorHandler, notFound } from './middleware/error.middleware';
import { ENV } from './config/env';

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: ENV.CORS_ORIGIN,
  credentials: true,
}));
app.use(helmet());
if (ENV.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'API is running successfully' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

export default app;
