import { Router } from 'express';
import Controller from '../controllers/permission';

let router = new Router();

router.get('/send', Controller.send);
router.post('/send', Controller.sendToBackend);

export default router;
