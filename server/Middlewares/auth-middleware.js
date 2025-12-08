import jwt from "jsonwebtoken"
import { success } from "zod";

export const auth = (req, res, next) => {
    try{
        const header = req.headers.authorization
        const token = header.startsWith("Bearer ") ? header.slice(7) : header;

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = payload;
        return next();
    }

    catch(error){
        // console.error("Error at auth: ", error)
        return res.status(401).json({success: false, message: "Invalid token", })
    }
}