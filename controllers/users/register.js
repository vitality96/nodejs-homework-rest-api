const { Conflict } = require('http-errors');
const bcrypt = require('bcryptjs');
const { User, joiSchema } = require('../../models/user');

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
        const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        const result = await (await User.create({ email, password: hashPassword }));
        res.status(201).json({
            status: "success",
            code: 201,
            data: {
                user: {
                    result
                }
            }
        })
    } catch (error) {
        next(error);
    }
};

module.exports = register;