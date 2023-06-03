import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema({
  name: String,
  email: String,
  address: String,
  token: String,
  designation: String,
  scholarUrl: String,
});

export interface UserInterface {
  name: string;
  email: string;
  address: string;
  token: string;
  designation: string,
  scholarUrl: string,
}

const UserModel = mongoose.model<UserInterface>("User", User);

export default UserModel;
