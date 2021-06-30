import express from 'express'
const router = express.Router();
import {createNote, deleteNote} from '../controllers/notes.js';
import {fetchNotes} from '../controllers/notes.js';
router.post('/create',createNote)

router.get('/fetch/:id',fetchNotes);

router.get('/remove/:id',deleteNote);


export default router