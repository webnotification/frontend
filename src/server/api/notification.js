import { Router } from 'express';
import Controller from '../controllers/notification';

let router = new Router();

router.get('/send', Controller.send);

export default router;
