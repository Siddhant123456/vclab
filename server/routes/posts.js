import express from 'express'
import { createClass, joinClass , fetchClass} from '../controllers/classData.js'

const router = express.Router();


router.post('/class',createClass);
router.post('/join' , joinClass);
router.get('/:id', fetchClass);

export default router;