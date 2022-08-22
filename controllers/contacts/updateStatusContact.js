const { Contact } = require('../../models/contact');


const updateStatusContact = async (req, res, next) => {
    try {
        const { favorite } = req.body;
        if (!favorite) {
        const error = new Error("missing field favorite");
            error.status = 400;
            throw error;
        }
        const { id } = req.params;
        const result = await Contact.findByIdAndUpdate(id, {favorite}, { new: true });
        if (!result) {
            const error = new Error(`Not found`);
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


module.exports = updateStatusContact;