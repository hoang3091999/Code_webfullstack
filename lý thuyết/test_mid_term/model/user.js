import mongoose from 'mongoose';

const UserModel = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    apikey: {
        type: String,
    }
})

const User = mongoose.model('User', UserModel);

export default User;