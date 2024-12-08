const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');
const {check} = require('express-validator')
router.post('/user',[
    check('name', 'O nome é obrigatório').notEmpty().trim().escape(),
    check('email', 'O email é obrigatório e deve ser válido').isEmail().normalizeEmail(),
    check('password', 'A senha deve ter no mínimo 6 caracteres').isLength({ min: 6 })
],UserController.register);
router.get('/confirm/:token', UserController.confirmToken);
router.post('/login',[
    check('email', 'E-mail inválido').optional().isEmail().normalizeEmail(),
    UserController.login])
module.exports = router;