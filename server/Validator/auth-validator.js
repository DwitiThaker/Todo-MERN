import {z }from "zod"

const signupSchema = z.object({
    username: z.string({required_error: "Username is required"})
                .trim()
                .min(3, {message: "Userame must be of atleast 3 characters.."})
                .max(255, {message: "Username must not be greater than 255 characters.."}),

    
    email: z.string({required_error: "email is required"})
                .trim()
                .min(10, {message: "email must be of atleast 10 characters.."})
                .max(255, {message: "email must not be greater 3 characters.."}), 

    phone: z.string({required_error: "Phone number is required"})
                .trim()
                .min(10, {message: "Phone number must be of atleast 10 characters.."})
                .max(20, {message: "Phone number must not be greater 20 characters.."}),

    password: z.string({required_error: "Password is required"})
                .trim()
                .min(7, {message: "Password must be of atleast 7 characters.."})
                .max(1024, {message: "Password must not be greater 1024 characters.."}),

});


export {signupSchema}
