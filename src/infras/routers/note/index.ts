import express from 'express';
import { postNoteRouter } from './post.note';
const router = express.Router();

router.use(postNoteRouter);

export default router;
