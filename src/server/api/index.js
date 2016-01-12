import {Router}   from 'express';
import userRouter from './users';
import groupRouter from './group';
import notificationRouter from './notification';

let router = new Router();


router.use('/user', userRouter);
router.use('/group', groupRouter);
router.use('/notification', notificationRouter);

export default router;
