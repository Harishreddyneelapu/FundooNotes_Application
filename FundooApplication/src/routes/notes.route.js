import express from 'express';
import * as validator from '../validators/notes.validator';
import * as notesController from '../controllers/notes.controller';
import { userAuth } from '../middlewares/auth.middleware';
// import { cache } from '../config/redis';

const router = express.Router();

router.post(
  '',
  validator.newNotesValidator,
  userAuth,
  notesController.newNotes
);

router.get('', userAuth, notesController.getAllNotes);

router.get('/:_id', userAuth, notesController.getUser);

router.put('/:_id', userAuth, notesController.updateNotes);

router.delete('/:_id', userAuth, notesController.deleteNotes);

router.put('/:_id/isArchive', userAuth, notesController.isArchive);

router.put('/:_id/isTrash', userAuth, notesController.isTrash);

router.put('/:_id/color', userAuth, notesController.color);

export default router;
