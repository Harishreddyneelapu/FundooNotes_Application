import express from 'express';
import * as validator from '../validators/notes.validator';
import * as notesController from '../controllers/notes.controller';


const router = express.Router();

router.post('', validator.newNotesValidator, notesController.newNotes);

export default router;