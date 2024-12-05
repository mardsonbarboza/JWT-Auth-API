const knex = require('../database/Connection');

class User {
    async findByEmail(email) {
        const result = await knex.select('*').where({ email }).table('users').first(); 
        return result || null; // Retorna o registro ou null
    }

    async create(name, email, password) {
        await knex.insert({ name, email, password }).table('users');
        return { status: true };
    }
}

module.exports = new User();
