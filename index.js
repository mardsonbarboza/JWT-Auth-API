const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config();


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.listen(8080,()=>{
    console.log('Server devidamente ligado');
    
})

