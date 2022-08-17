const contactOperations = require('../models/contacts');
const { contactSchema } = require('../schemas/contacts');

const getAll = async (req, res, next) => {
    try {
        const contacts = await contactOperations.listContacts();
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
        const result = await contactOperations.getContactById(id);
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
        const {error} = contactSchema.validate(req.body);
        if(error){
            error.status = 400;
            throw error;
        }
        const result = await contactOperations.addContact(req.body);
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
        const result = await contactOperations.removeContact(id);
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
        const {error} = contactSchema.validate(req.body);
        if(error){
            error.status = 400;
            throw error;
        }
        const { id } = req.params;
        const result = await contactOperations.updateContact(id, req.body);
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



    module.exports = {
        getAll,
        getById,
        add,
        removeById,
        updateById
    }
