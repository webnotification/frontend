import {Router}   from 'express';
import userRouter from './users';
import groupRouter from './group';
import notificationRouter from './notification';
import profileRouter from './profile';

let router = new Router();


router.use('/user', userRouter);
router.use('/groups', groupRouter);
router.use('/notification', notificationRouter);
router.use('/profile', profileRouter);

export default router;
