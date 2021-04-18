import express from 'express';
import { createNoteRouter } from './post.note';
const router = express.Router();

router.use(createNoteRouter);

export default router;
