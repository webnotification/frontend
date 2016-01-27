import {Router}   from 'express';
import userRouter from './users';
import groupRouter from './group';

let router = new Router();


router.use('/user', userRouter);
router.use('/group', groupRouter);


export default router;
