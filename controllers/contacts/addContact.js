const { Contact, joiSchema } = require('../../models/contact');


const addContact = async (req, res, next) => {
    try {
        const { favorite = false } = req.body;
        if (!favorite) {
            console.log('favorite value is false');
        }
        const {error} = joiSchema.validate(req.body);
        if(error){
            error.status = 400;
            throw error;
        }
        const { _id } = req.user;
        const result = await Contact.create({...req.body, owner: _id});
        res.status(201).json({
            status: "success",
            code: 201,
            data: {
                result
            }
        });
    } catch (error) {
        next(error);
    };
};


module.exports = addContact;