import mongoose from "mongoose";


const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },

    description: {
        type: String,
        require: false
    },

    status: {
        type: String,
        require: true,
        default: "pending"
    },

    user: {
        require: true,
        type: String,
        ref: "User"
    }
    
});



const Todo = mongoose.model("Todo", todoSchema)
export {Todo}