const express = require('express')
const { contacts: ctrl } = require('../../controllers');
const { auth } = require("../../middlewares");

const router = express.Router()

router.get('/', auth, ctrl.getAllContacts);

router.get('/:id', ctrl.getContactById);

router.post('/', auth, ctrl.addContact);

router.delete('/:id', ctrl.removeContactById);

router.put('/:id', ctrl.updateContactById);

router.patch('/:id/favorite', ctrl.updateStatusContact);

module.exports = router
