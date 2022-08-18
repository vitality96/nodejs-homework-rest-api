const { Contact } = require('../models/contact');
const { joiSchema} = require('../models/contact');

const getAll = async (req, res, next) => {
    try {
        const contacts = await Contact.find({});
        res.json({
            status: "success",
            code: 200,
            data: {
                result: contacts
            }
        });
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Contact.findById(id);
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
        next(error);
    };
};

const add = async (req, res, next) => {
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
        const result = await Contact.create(req.body);
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

const removeById = async (req, res, next) => {
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


const updateById = async (req, res, next) => {
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



    module.exports = {
        getAll,
        getById,
        add,
        removeById,
        updateById,
        updateStatusContact
    }
