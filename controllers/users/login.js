const { Unauthorized } = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, joiSchema } = require('../../models/user');

const SECRET_KEY = "kontent55570";

const login = async (req, res, next) => {
    try {
        const { error } = joiSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw new Unauthorized("Email or password is wrong")
        }
        const passCompare = bcrypt.compareSync(password, user.password);
        if (!passCompare) {
            throw new Unauthorized("Email or password is wrong")
        }
        const payload = {
            id: user._id
        }
        const token = jwt.sign(payload, SECRET_KEY);
        await User.findByIdAndUpdate(user._id, {token})
        res.json({
            status: "success",
            code: 200,
            data: {
                token
            }
        })
    } catch (error) {
        next(error);
    }
};


module.exports = login;