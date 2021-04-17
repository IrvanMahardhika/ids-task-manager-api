import express from 'express';
import { getUserRouter } from './get.user';
import { postUserRouter } from './post.user';
const router = express.Router();

router.use(getUserRouter);
router.use(postUserRouter);

export default router;
