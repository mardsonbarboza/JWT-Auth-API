const { validationResult } = require('express-validator');
const User = require('../model/User');

class UserController {
    async register(req, res) {
        try {
            // Coletando os erros das validações feitas na rota
            const errors = validationResult(req);

            // 400 - Bad Request: Os dados enviados não atendem às validações esperadas.
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { name, email, password } = req.body;

            // Verifica se o email já está cadastrado
            const emailExists = await User.findByEmail(email);
            // 409 - Conflict: O email informado já está cadastrado no sistema.
            if (emailExists) {
                return res.status(409).json({ msg: 'Email já cadastrado. Tente outro email.' });
            }

            // Cria o usuário no banco de dados
            const user = await User.create(name, email, password);

            // 201 - Created: O recurso foi criado com sucesso.
            if (user) {
                return res.status(201).json({ msg: 'Usuário criado com sucesso.' });
            }

            // 500 - Internal Server Error: Falha ao criar o usuário por um erro inesperado.
            return res.status(500).json({ msg: 'Erro ao criar usuário.' });
        } catch (error) {
            console.error(error);

            // 500 - Internal Server Error: Erro geral no servidor.
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }
}

module.exports = new UserController();
