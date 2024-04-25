import HttpStatus from 'http-status-codes';
import * as NotesService from '../services/notes.service';


export const newNotes = async (req, res, next) => {
    try {
      const data = await NotesService.newNotes(req.body);
      const{titleDescription,color,isArchive,isTrash,createdBy}=data;
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: {
          titleDescription,
          color,
          isArchive,
          isTrash,
          createdBy
        },
        message: 'Notes created successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
      });
    }
  };