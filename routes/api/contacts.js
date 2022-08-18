const express = require('express')
const { getAll, getById, add, removeById, updateById, updateStatusContact } = require('../../controllers/contacts');


const router = express.Router()

router.get('/', getAll);

router.get('/:id', getById);

router.post('/', add);

router.delete('/:id', removeById);

router.put('/:id', updateById);

router.patch('/:id/favorite', updateStatusContact);

module.exports = router
