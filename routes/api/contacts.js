const express = require('express')
const { contacts: ctrl } = require('../../controllers');

const router = express.Router()

router.get('/', ctrl.getAllContacts);

router.get('/:id', ctrl.getContactById);

router.post('/', ctrl.addContact);

router.delete('/:id', ctrl.removeContactById);

router.put('/:id', ctrl.updateContactById);

router.patch('/:id/favorite', ctrl.updateStatusContact);

module.exports = router
