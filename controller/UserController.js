const { validationResult } = require('express-validator');
const User = require('../model/User');
const SECRET = process.env.SECRET;
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer')
const transporter = nodeMailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 587,
    secure: false, // use false para STARTTLS; true para SSL na porta 465
    auth: {
        user: '11d0a14be06170',
        pass: 'f9e0fceef5bef3'
    }
});
class UserController {
    async register(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log("Validações falharam:", errors.array());
                return res.status(400).json({ errors: errors.array() });
            }
    
            const { name, email, password } = req.body;
    
            const emailExists = await User.findByEmail(email);
            console.log("Resultado do findByEmail:", emailExists);
    
            if (emailExists) {
                return res.status(409).json({ msg: 'Email já cadastrado. Tente outro email.' });
            }
                
                var user = await User.create(name, email, password);
                console.log("Usuário criado:", user.result);
                
                if (user.status) {

                    console.log('teste:',user.result);
                    
                    var token = jwt.sign({ userId:user.result.id }, SECRET, { expiresIn: '1h' });
                    var confirmationLink = `http://localhost:8080/api/confirm/${token}`;
    
                    var mailOptions = {
                    from: '"GetProgram Team" <getprogram@gmail.com>',
                    to: email,
                    subject: 'Confirmação de E-mail - GetProgram',
                    html: `<div>Olá ${name}, clique no link para confirmar: <a href="${confirmationLink}">Confirmar E-mail</a></div>`
                };
                
                await transporter.sendMail(mailOptions);
                console.log("Email enviado para:", email);
                
                return res.status(201).json({ msg: 'Cadastrado com sucesso, verifique o e-mail para confirmação' });
            }
            
            return res.status(500).json({ msg: 'Erro ao criar usuário.' });
        
        } catch (error) {
            console.error("Erro interno no register:", error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }
    async confirmToken(req, res) {
        const { token } = req.params;
    
        try {
            console.log("Token recebido:", token); // Log do token recebido
            const decoded = jwt.verify(token, SECRET);
            console.log("Decoded JWT:", decoded); // Log do token decodificado
    
            const userId = decoded.userId;
            console.log("ID decodificado do token:", userId); // Log do userId extraído
    
            if (!userId) {
                return res.status(400).json({ msg: 'Token inválido: ID não encontrado.' });
            }
    
            const user = await User.findById(userId);
            console.log("Usuário encontrado no banco de dados:", user); // Log do usuário encontrado
    
            if (!user) {
                return res.status(400).json({ msg: 'Usuário não encontrado' });
            }
    
            // Atualizar o status de verificação
            const result = await User.updateIsVerifield(user.id);
            console.log("Resultado da atualização:", result); // Log do resultado da atualização
    
            if (result > 0) {
                return res.status(200).json({ msg: 'E-mail confirmado com sucesso!' });
            } else {
                return res.status(500).json({ msg: 'Erro ao atualizar status de verificação.' });
            }
        } catch (error) {
            console.error("Erro interno no confirmToken:", error); // Log detalhado
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }
    
    
}

module.exports = new UserController();
