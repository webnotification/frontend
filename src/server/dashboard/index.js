import {Router}   from 'express';
import groupRouter from './group';
import notificationRouter from './notification';
import permissionRouter from './permission';
import profileRouter from './profile';
import analyticsRouter from './analytics';
import imageRouter from './image';
import auth from './../controllers/auth';

let router = new Router();


router.use('/profile', auth.ensure, profileRouter);
router.use('/image', auth.ensure, imageRouter);
router.use('/groups', auth.ensure, groupRouter);
router.use('/notification', auth.ensure, notificationRouter);
router.use('/permission', auth.ensure, permissionRouter);
router.use('/analytics', auth.ensure, analyticsRouter);

export default router;
