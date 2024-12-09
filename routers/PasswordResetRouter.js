const express = require('express');
const router = express.Router()
const PasswordResetController = require('../controller/PasswordResetController');

// Endpoint para solicitar recuperação de senha
router.post('/request', PasswordResetController.requestPasswordReset);

// Endpoint para redefinir a senha
router.post('/reset', PasswordResetController.resetPassword);
module.exports = router;