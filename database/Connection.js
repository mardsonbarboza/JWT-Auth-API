const host = process.env.HOST;
const port = process.env.PORT;
const user = process.env.USER;
const password = process.env.PASSWORD;
const knex = require("knex")({
    client:'mysql2',
    connection:{
        host:host,
        port:port,
        user:user,
        password:password,
        database:'apiusers'
    }
})

module.exports = knex;
