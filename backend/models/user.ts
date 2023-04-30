import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema({
    name: String,
    email: String,
    address: String,
})

const UserModel = mongoose.model('User', User);

export default UserModel;