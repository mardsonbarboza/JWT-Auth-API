const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
require('dotenv').config();

const RoutersUse = require('./routers/UserRouter');
const RoutersPasswordReset = require('./routers/PasswordResetRouter');
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api',RoutersUse);
app.use('/api',RoutersPasswordReset)

app.listen(8080,()=>{
    console.log('Server devidamente ligado');
    
})

