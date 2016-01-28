import {Router}   from 'express';
import userRouter from './users';
import groupRouter from './group';
import analyticsRouter from './analytics';

let router = new Router();


router.use('/user', userRouter);
router.use('/group', groupRouter);
router.use('/analytics', analyticsRouter);


export default router;
