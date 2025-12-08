import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true
    },

    phone: {
        type: String,
        require: true       
    },

    password: {
        type: String,
        require: true
    },

    isAdmin: {
        type: Boolean,
        default: false
    }
});

// Mongoose middleware
userSchema.pre('save', async function() {
    const user = this;

    if(!user.isModified("password")){
        next();
    }
    try{
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    }
    catch(error){
        console.log("Error while hashing password: ", error)
        next(error)
    }
})


userSchema.methods.generateToken = async function () {
    try{
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "30d",
        }
    );
    } catch (error){
        console.log(error)
    }
};


const User = mongoose.model("User", userSchema);

export {User}
