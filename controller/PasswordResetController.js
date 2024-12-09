const User = require('../model/User');
const moment = require('moment');
const PasswordReset = require('../model/PasswordReset');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class PasswordResetController {
    // Solicitação de redefinição de senha
    async requestPasswordReset(req, res) {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(400).json({ message: 'O campo e-mail é obrigatório.' });
            }

            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            const resetToken = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '1h' });
            const expiresAt = moment().add(1, 'hour').toDate();

            await PasswordReset.createToken(user.id, resetToken, expiresAt);

            const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;
            await PasswordReset.sendResetEmail(email, resetUrl);

            res.status(200).json({ message: 'Instruções de recuperação enviadas por e-mail.' });
        } catch (error) {
            console.error('Erro ao solicitar redefinição de senha:', error);
            res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    }

    // Redefinição de senha
    async resetPassword(req, res) {
        try {
            const { token, newPassword } = req.body;

            if (!token || !newPassword) {
                return res.status(400).json({ message: 'Token e nova senha são obrigatórios.' });
            }

            const decoded = jwt.verify(token, process.env.SECRET);
            const userId = decoded.id;

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const result = await User.updatePassword(userId, hashedPassword);

            if (!result.status) {
                return res.status(400).json({ message: 'Erro ao redefinir senha.' });
            }

            await PasswordReset.deleteToken(token);
            res.status(200).json({ message: 'Senha redefinida com sucesso.' });
        } catch (error) {
            console.error('Erro ao redefinir senha:', error);
            res.status(400).json({ message: 'Token inválido ou expirado.', error });
        }
    }
}

module.exports = new PasswordResetController();
