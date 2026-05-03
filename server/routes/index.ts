import { Router } from 'express';
import reviewsRouter from './reviews.js';
import artworksRouter from './artworks.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.use('/reviews', reviewsRouter);
router.use('/artworks', artworksRouter);

export default router;
