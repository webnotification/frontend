import { Router } from 'express';
import Controller from '../controllers/listings';

let router = new Router();


router.post('/'  , Controller.create);
router.get('/:id', Controller.fetch);
router.put('/:id', Controller.update);
router.delete('/:id', Controller.remove);

export default router;