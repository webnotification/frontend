import { Router } from 'express';
import Controller from '../controllers/user';

let router = new Router();

router.post('/register', Controller.create);
router.get('/me', Controller.me);

export default router;
