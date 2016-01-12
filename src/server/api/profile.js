import { Router } from 'express';
import Controller from '../controllers/profile';

let router = new Router();

router.get('/profile', Controller.profile);

export default router;
