const { Unauthorized } = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, joiSchema } = require('../../models/user');

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
    try {
        const { error } = joiSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !user.verify) {
            throw new Unauthorized("Email is wrong or not verify")
        }
        const passCompare = bcrypt.compareSync(password, user.password);
        if (!passCompare) {
            throw new Unauthorized("Password is wrong")
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