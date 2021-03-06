import express from 'express'
import {signin,signup, updateProfile} from '../controllers/user.js'

const router = express.Router();

router.post('/signin',signin);

router.post('/signup',signup);

router.post('/',updateProfile)

export default router;