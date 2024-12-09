const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');
const { check } = require('express-validator');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Operações relacionadas ao usuário.
 */

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do usuário
 *               email:
 *                 type: string
 *                 description: E-mail do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Erro de validação
 */

/**
 * @swagger
 * /confirm/{token}:
 *   get:
 *     summary: Confirmação de e-mail do usuário
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: Token de confirmação do e-mail
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: E-mail confirmado com sucesso
 *       400:
 *         description: Token inválido
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login do usuário
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: E-mail do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: E-mail ou senha inválidos
 */

router.post('/user', [
    check('name', 'O nome é obrigatório').notEmpty().trim().escape(),
    check('email', 'O email é obrigatório e deve ser válido').isEmail().normalizeEmail(),
    check('password', 'A senha deve ter no mínimo 6 caracteres').isLength({ min: 6 })
], UserController.register);

router.get('/confirm/:token', UserController.confirmToken);

router.post('/login', [
    check('email', 'E-mail inválido').optional().isEmail().normalizeEmail(),
    UserController.login
]);

module.exports = router;
