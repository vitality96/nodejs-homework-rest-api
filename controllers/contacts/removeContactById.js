const { Contact } = require('../../models/contact');

const removeContactById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Contact.findByIdAndRemove(id);
        if (!result) {
            const error = new Error(`id ${id} not found`);
            error.status = 404;
            throw error;
        }
        res.json({
            status: "success",
            code: 200,
            message: "product deleted",
            data: {
                result
            }
        });
    } catch (error) {
        next(error)
    }
};


module.exports = removeContactById;