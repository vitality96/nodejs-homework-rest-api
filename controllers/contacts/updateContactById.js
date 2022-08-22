const { Contact, joiSchema } = require('../../models/contact');



const updateContactById = async (req, res, next) => {
    try {
        const {error} = joiSchema.validate(req.body);
        if(error){
            error.status = 400;
            throw error;
        }
        const { id } = req.params;
        const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
        if (!result) {
            const error = new Error(`id ${id} not found`);
            error.status = 404;
            throw error;
        }
        res.json({
            status: "success",
            code: 200,
            data: {
                result
            }
        });
    } catch (error) {
        next(error)
    };
};


module.exports = updateContactById;
