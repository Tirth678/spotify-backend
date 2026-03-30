const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['user', 'artist'], // 2 roles 
        default: 'user',
    }
})

const userModel = mongoose.model("user", userSchema);

module.exports = userModel