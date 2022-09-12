const sgMail = require('@sendgrid/mail');

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);


const sendEmail = async (data) => {
    const email = { ...data, from: 'kontent55570@gmail.com' };
    try {
        await sgMail.send(email);
        return true;
    } catch (error) {
        console.error(error)
    }
};

module.exports = sendEmail;
