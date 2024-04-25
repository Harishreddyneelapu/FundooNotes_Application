import { Schema, model } from 'mongoose';

const notesSchema = new Schema(
  {
    title: {
      type: String
    },
    description:{
        type:String
    },
    color:{
      type:String
    },
    isArchive:{
      type:Boolean,
      default:false

    },
    isTrash:{
      type:String,
      default:false
    },
    createdBy:{
      type:String
    }
  },
  {
    timestamps: true
  }
);

export default model('Notes', notesSchema);