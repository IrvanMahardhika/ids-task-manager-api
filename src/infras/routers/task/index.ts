import express from 'express';
import { getTaskRouter } from './get.task';
import { createTaskRouter } from './post.task';
import { setCompletedTaskRouter } from './put.task';
const router = express.Router();

router.use(getTaskRouter);
router.use(createTaskRouter);
router.use(setCompletedTaskRouter);

export default router;
