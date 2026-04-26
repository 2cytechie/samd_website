import { Router } from 'express';
import reviewsRouter from './reviews.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.use('/reviews', reviewsRouter);

export default router;
