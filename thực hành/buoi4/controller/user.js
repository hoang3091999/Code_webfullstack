import User from "../models/user.js";

export const CreateUser = async (req,res) => {
    const role = "user";
    const {name,age,email,password} = req.body;
    const user = await User.create({
        name,
        age,
        email,
        password,
        role: role
    })
    res.status(201).json({
        message: "User created successfully",
        user
    })
}



export const GetUser = async (req,res) => {
    // const {id} = req.params;
    // const user = userModel.findById(id);
    const user = await User.find()
    // if(!user){
    //     res.status(404).json({
    //         message: "User not found"
    //     })
    // }
    res.status(200).json({
        message: "User found successfully",
        user
    })

}