import Notes from '../models/notes.model';

export const newNotes = async (body)=>{
    const data = await Notes.create(body);
  return data;
}

export const getUser = async (id) => {
    const data = await Notes.findById(id);
    return data;
  };



  export const updateNotes = async (_id, body) => {
    const data = await Notes.findByIdAndUpdate(
      {
        _id
      },
      body,
      {
        new: true
      }
    );
    return data;
  };

  export const deleteNotes = async (id) => {
    await Notes.findByIdAndDelete(id);
    return '';
  };


  export const getAllNotes = async ()=>{
    const data = await Notes.find();
    return data;
  };


  export const isArchive = async (id)=>{
    const data = await Notes.findById(id);
    
    data.isArchive = !data.isArchive;
    
    const updatedData = await data.save();
    return updatedData;
  }

  export const isTrash = async (id)=>{
    const data = await Notes.findById(id);

    data.isTrash = !data.isTrash;

    const updatedData = await data.save();

    return updatedData;
  }