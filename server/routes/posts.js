import express from 'express'
import { createClass } from '../controllers/classData.js'

const router = express.Router();


router.post('/class',createClass);

export default router;