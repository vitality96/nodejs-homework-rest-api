const { BadRequest, NotFound } = require('http-errors');
const { User, verifyEmailSchema } = require('../../models/user');
const { sendEmail } = require('../../helpers');

const resendVerifyEmail = async (req, res, next) => {
    try {
        const { error } = verifyEmailSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }
        const { email } = req.body;
        const user = User.findOne({ email });
        if (!user) {
            throw NotFound('Missing required field email');
        }
        if (user) {
            throw BadRequest('Verification has already been passed');
        }
        const mail = {
            to: email,
            subject: "Email confirmation",
            html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Confirm email</a>`
        };
        await sendEmail(mail);
        res.status(200).json({
            status: "success",
            message: 'Verification email sent'
        })
    } catch (error) {
        next()
    }
};


module.exports = resendVerifyEmail;