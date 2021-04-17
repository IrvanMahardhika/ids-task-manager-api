import express from 'express';
import { getTaskRouter } from './get.task';
import { postTaskRouter } from './post.task';
const router = express.Router();

router.use(getTaskRouter);
router.use(postTaskRouter);

export default router;
