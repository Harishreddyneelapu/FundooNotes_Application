import HttpStatus from 'http-status-codes';
import * as NotesService from '../services/notes.service';


export const newNotes = async (req, res, next) => {
    try {
      req.body.createdBy = res.locals.user.Email
      const data = await NotesService.newNotes(req.body);
      const{_id,title,description,color,isArchive,isTrash,createdBy}=data;
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        success:true,
        message: 'Notes created successfully',
        data: {
            _id,
          title,
          description,
          color,
          isArchive,
          isTrash,
          createdBy
        },
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
      });
    }
  };

  export const getUser = async (req, res, next) => {
    try {
      const data = await NotesService.getUser(req.params._id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        success:true,
        message: 'User fetched successfully',
        data: data
      });
    } catch (error) {
      next(error);
    }
  };


  export const updateNotes = async (req, res, next) => {
    try {
      const data = await NotesService.updateNotes(req.params._id, req.body);
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        success:true,
        message: 'User updated successfully',
        data: data
      });
    } catch (error) {
      next(error);
    }
  };



  export const deleteNotes = async (req,res,next)=>{
    try{
        const data = await NotesService.deleteNotes(req.params._id);
        res.status(HttpStatus.OK).json({
            success:true,
            message:'User deleted successfully'
        })
    }catch(error){
        next(error);

    }
  }



  export const getAllNotes = async (req,res,next)=>{
    try{
        const data = await NotesService.getAllNotes();
        res.status(HttpStatus.OK).json({
            success:true,
            message:'All Notes fetched Successfully',
            data :data
        })
    }catch(error){
        next(error);
    }
  }