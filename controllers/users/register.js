const { Conflict } = require('http-errors');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { nanoid } = require("nanoid");
const { User, joiSchema } = require('../../models/user');
const { sendEmail } = require('../../helpers');

const register = async (req, res, next) => {
    try {
        const { error } = joiSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            throw new Conflict(`'${email}' in use`);
        }
        const verificationToken = nanoid();
        const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        const avatarURL = gravatar.url(email);
        const result = await User.create({ email, password: hashPassword, avatarURL, verificationToken });
        const mail = {
            to: email,
            subject: "Email confirmation",
            html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm email</a>`
        };
        await sendEmail(mail);
        res.status(201).json({
            status: "success",
            code: 201,
            data: {
                result
            }
        })
    } catch (error) {
        next(error);
    }
};

module.exports = register;