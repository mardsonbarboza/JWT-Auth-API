const express = require('express');
const router = express.Router()
const PasswordResetController = require('../controller/PasswordResetController');

/**
 * @swagger
 * /request:
 *   post:
 *     summary: Solicitar recuperação de senha
 *     tags: [Password Reset]
 *     requestBody:
 *       description: Enviar o e-mail para redefinição
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Sucesso na solicitação de redefinição de senha
 *       400:
 *         description: E-mail inválido ou não encontrado
 */
router.post('/request', PasswordResetController.requestPasswordReset);

/**
 * @swagger
 * /reset:
 *   post:
 *     summary: Redefinir a senha do usuário
 *     tags: [Password Reset]
 *     requestBody:
 *       description: Enviar o token e a nova senha para redefinir
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               newPassword:
 *                 type: string
 *                 example: "novaSenha123"
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 *       400:
 *         description: Token inválido ou expirado, ou erro ao redefinir a senha
 */
router.post('/reset', PasswordResetController.resetPassword);

module.exports = router;