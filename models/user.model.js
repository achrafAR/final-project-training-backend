import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required:[true,'Please add a userName']
    },
    email: {
        type: String,
        required:[true,'plz add an email'],
        unique:true
    },
    password: {
        type: String,
        required:[true,'plz add a password']
    },
    role: {
        type: String,
        default: "user"
    }



},
{
    timestamps: true
});

const User = mongoose.model("User", userSchema);
export default User;