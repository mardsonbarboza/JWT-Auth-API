const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
require('dotenv').config();

const RoutersUse = require('./routers/UserRouter');
const RoutersPasswordReset = require('./routers/PasswordResetRouter');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerConfig'); // Importar o arquivo de configuração
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api',RoutersUse);
app.use('/api',RoutersPasswordReset)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(8080,()=>{
    console.log('Server devidamente ligado');
    console.log('Acesse a documentação em http://localhost:8080/api-docs');
})

