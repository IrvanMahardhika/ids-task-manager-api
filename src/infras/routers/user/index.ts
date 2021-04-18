import express from 'express';
import { loginRouter } from './get.user';
import { registerUserRouter } from './post.user';
const router = express.Router();

router.use(loginRouter);
router.use(registerUserRouter);

export default router;
