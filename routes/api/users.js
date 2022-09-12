const express = require('express');
const { users: ctrl } = require('../../controllers');
const { auth, upload } = require("../../middlewares");

const router = express.Router();

router.post('/register', ctrl.register);

router.post('/login', ctrl.login);

router.post('/logout', auth, ctrl.logout);

router.patch('/avatars', auth, upload.single('avatar'), ctrl.updateAvatar);

router.post('/verify', ctrl.resendVerifyEmail);

router.get("/verify/:verificationToken", ctrl.verifyEmail);


module.exports = router; 