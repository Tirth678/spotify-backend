const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


async function registerUser(req, res){
    const {username, email, password, role="user"} = req.body;

    const userAlreadyExist = await userModel.findOne({
        // username: username,
        // email: email // aise to null return kr degi email same hua aur username diff hua to
        $or:[
            {username},
            {email}
        ]
    })
    if(userAlreadyExist){
        return res.status(409).json({message: "user already exist"})
    }
    // hasing password logic

    const hash = await bcrypt.hash(password, 15) // 15 is salt: delays attack

    const user = await userModel.create({
        username,
        email,
        password: hash,
        role
    })
    const token = jwt.sign({
        id: user._id,
        role: user.role,
    }, process.env.JWT_SECRET)

    res.cookie("token", token);

    res.status(201).json({
        message: "user registration succesfully",
        user: {id: user.id, role: user.role},
        token,
    })
}
// use $or: operator

async function loginUser(req, res){
    try {
        const {username, email, password} = req.body;

        if(!password){
            return res.status(400).json({message: "password is required"})
        }

        const user = await userModel.findOne({
            $or:[
                {username},
                {email}
            ]
        })
        if(!user){
            return res.status(401).json({message: "invalid credentials"})
        }
        
        if(!user.password){
            return res.status(500).json({message: "user password not found in database"})
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(401).json({message: "invalid password"})
        }

        const token = jwt.sign({
            id: user._id,
            role: user.role,
        }, process.env.JWT_SECRET)

        res.cookie("token", token);
        res.status(200).json({
            message: "login successful",
            user: {id: user._id, role: user.role},
            token,
        })
    } catch(error) {
        res.status(500).json({message: error.message})
    }
}
async function logoutUser(req,res){
    res.clearCookie("token")
    res.status(200).json({message: "logout successful"})
}
module.exports = { registerUser, loginUser, logoutUser }