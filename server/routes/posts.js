import express from 'express'
import { createClass, joinClass , fetchClass, leaveClass} from '../controllers/classData.js'

const router = express.Router();


router.post('/class',createClass);
router.post('/join' , joinClass);
router.get('/:id', fetchClass);

router.get('/leave/:id/:user' , leaveClass)
export default router;