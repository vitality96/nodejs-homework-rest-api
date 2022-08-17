const express = require('express')
const { getAll, getById, add, removeById, updateById } = require('../../controllers/contacts');


const router = express.Router()

router.get('/', getAll);

router.get('/:id', getById);

router.post('/', add);

router.delete('/:id', removeById);

router.put('/:id', updateById);

module.exports = router
