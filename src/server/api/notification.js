import { Router } from 'express';
import Controller from '../controllers/notification';

let router = new Router();

router.get('/send_notification', Controller.send_notification);

export default router;
