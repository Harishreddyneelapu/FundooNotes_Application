import express from 'express';
import * as validator from '../validators/notes.validator';
import * as notesController from '../controllers/notes.controller';


const router = express.Router();

router.post('', validator.newNotesValidator, notesController.newNotes);

router.get('/:_id', notesController.getUser);

router.put('/:_id', notesController.updateNotes);

router.delete('/:_id', notesController.deleteNotes);

router.get('', notesController.getAllNotes);

export default router;