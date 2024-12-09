const knex = require('../database/Connection');
const nodemailer = require('nodemailer');

class PasswordReset {
    async createToken(userId, token, expiresAt) {
        return await knex('password_reset_tokens').insert({
            user_id: userId,
            token,
            expires_at: expiresAt,
        });
    }

    async verifyToken(token) {
        return await knex('password_reset_tokens')
            .where({ token })
            .andWhere('expires_at', '>', new Date())
            .first();
    }

    async deleteToken(token) {
        await knex('password_reset_tokens').where({ token }).del();
        return { status: true, message: 'Token removido' };
    }

    async sendResetEmail(email, resetUrl) {
        try {
            const transporter = nodemailer.createTransport({
                host: 'sandbox.smtp.mailtrap.io',
                port: 587,
                secure: false, // STARTTLS
                auth: {
                    user: process.env.MAIL_USER, // Variáveis de ambiente
                    pass: process.env.MAIL_PASS,
                },
            });

            const mailOptions = {
                from: '"MangaApp Support" <support@mangaapp.com>',
                to: email,
                subject: 'Recuperação de Senha - MangaApp',
                html: `
                    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
                      <h2 style="background-color: #4CAF50; color: white; text-align: center; padding: 10px 0;">Redefinição de Senha - MangaApp</h2>
                      <p>Olá,</p>
                      <p>Recebemos uma solicitação para redefinir sua senha. Clique no link abaixo para continuar:</p>
                      <div style="text-align: center; margin: 20px 0;">
                        <a href="${resetUrl}" style="background-color: #FF4500; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Redefinir Senha</a>
                      </div>
                      <p>Este link é válido por apenas 1 hora.</p>
                      <p>Se você não solicitou a redefinição, ignore este e-mail.</p>
                      <p>MangaApp © ${new Date().getFullYear()} - Todos os direitos reservados.</p>
                    </div>
                `,
            };

            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Erro ao enviar e-mail:', error);
            throw new Error('Erro ao enviar e-mail.');
        }
    }
}

module.exports = new PasswordReset();
