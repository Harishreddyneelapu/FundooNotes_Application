import Notes from '../models/notes.model';

export const newNotes = async (body)=>{
    const data = await Notes.create(body);
  return data;
}