import mongoose from 'mongoose'

export interface IUser {
  userID: String,
  userName: String,
  email: String
}

const Schema = mongoose.Schema;
const userSchema = new Schema({
    userID: {
      type: String,
      require: true,
      unique: true
    },
    userName: {
      type: String,
      require: true,
      unique: true
    },
    email: {
      type: String,
      require: true
    }
  });
export const UserModel = mongoose.model('user', userSchema);