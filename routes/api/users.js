const express = require('express');
const { users: ctrl } = require('../../controllers');
const { auth } = require("../../middlewares");

const router = express.Router();

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.post('/logout', auth, ctrl.logout);
router.patch('/', auth, ctrl.updateSubscriptionUser);


module.exports = router;