const knex = require('../database/Connection');

class User {
    async findByEmail(email) {
        const result = await knex.select('*').where({ email }).table('users').first(); 
        return result || null; // Retorna o primeiro resultado ou null se não existir
    }
    

    async create(name, email, password) {
        await knex.insert({ name, email, password }).table('users');
        return {result: await this.findByEmail(email), status : true};
        
    }
    async findById(id) {
        console.log("ID recebido no findById:", id); // Log para depuração
        return await knex.select('*').where({ id }).table('users').first();
    }
    
    async updateIsVerifield(id){
        return await knex.update({isVeryfield:1}).where({id}).table('users') 
    }
    async updatePassword(userId, newPassword){
       
            await knex('users').where({id:userId}).update({password:newPassword});
            return { status: true, message: 'Senha atualizada com sucesso' }; 
    }
}

module.exports = new User();
