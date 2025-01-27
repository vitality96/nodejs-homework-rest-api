const { Schema, model } = require('mongoose');
const Joi = require("joi");


const userSchema = Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    avatarURL: String,
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    },
    token: String
}, { versionKey: false });


const joiSchema = Joi.object({
    password: Joi.string().required().min(6),
    email: Joi.string().required(),
});

const verifyEmailSchema = Joi.object({
    email: Joi.string().required(),
});


const User = model("user", userSchema);


module.exports = {
    User,
    joiSchema,
    verifyEmailSchema
}