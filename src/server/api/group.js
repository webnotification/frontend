import { Router } from 'express';
import Controller from '../controllers/group';

let router = new Router();

router.get('/view', Controller.list);
router.get('/create', Controller.create);
router.post('/create', Controller.createOnBackend);

export default router;
