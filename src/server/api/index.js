import {Router}   from 'express';
import userRouter from './users';

let router = new Router();


router.use('/user', userRouter);

export default router;
