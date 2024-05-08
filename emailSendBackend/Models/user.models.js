const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    verificationCode: Number,
    isActive: Boolean
});

module.exports.inActivateUser = mongoose.model('inActivateUser', userSchema);
