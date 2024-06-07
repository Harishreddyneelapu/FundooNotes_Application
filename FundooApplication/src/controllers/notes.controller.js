import HttpStatus from 'http-status-codes';
import * as NotesService from '../services/notes.service';

export const newNotes = async (req, res) => {
  try {
    req.body.createdBy = res.userEmail;
    const data = await NotesService.newNotes(req.body);
    const { _id, title, description, color, isArchive, isTrash, createdBy } =
      data;
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      success: true,
      message: 'Note created successfully',
      data: {
        _id,
        title,
        description,
        color,
        isArchive,
        isTrash,
        createdBy
      }
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      success: false,
      message: `${error}`
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const data = await NotesService.getUser(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      success: true,
      message: 'User fetched successfully',
      data: data
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};

export const updateNotes = async (req, res) => {
  try {
    const data = await NotesService.updateNotes(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      success: true,
      message: 'User updated successfully',
      data: data
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};

export const deleteNotes = async (req, res) => {
  try {
    await NotesService.deleteNotes(req.params._id);
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const data = await NotesService.getAllNotes(res.userEmail);
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'All Notes fetched Successfully',
      data: data
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};

export const isArchive = async (req, res) => {
  try {
    const data = await NotesService.isArchive(req.params._id);
    res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Archive successsfully',
      data: data
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};

export const isTrash = async (req, res) => {
  try {
    const data = await NotesService.isTrash(req.params._id);
    res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Trash operation success',
      data: data
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};

export const color = async (req, res) => {
  try {
    const data = await NotesService.color(req.params._id, req.body);
    res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'color changed successfully',
      data: data
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};
