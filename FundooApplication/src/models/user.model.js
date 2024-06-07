import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    FirstName: {
      type: String
    },
    LastName: {
      type: String
    },
    Email: {
      type: String,
      unique: true
    },
    Password: {
      type: String
    },
    ConfirmPassword: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default model('User', userSchema);
