import { Router } from 'express';
import Controller from '../controllers/group';

let router = new Router();

router.get('/view', Controller.list);

export default router;
