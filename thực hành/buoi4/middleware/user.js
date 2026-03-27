import User from "../models/user.js";

export const createUserMiddleware = async (req,res,next) => {
    const {name,age,email,password} = req.body;
    if(!name || !age || !email || !password){
        return res.status(400).json({
            message: "Missing required fields"
        })
    }
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({
            message: "Email already exists"
        })
    }
    next();
}

    