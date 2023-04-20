const jwt = require('jsonwebtoken');
require('dotenv');

async function autentica(user){
    // Avaliar se o usuário e a senha existem no banco de dados
    // Importante! A senha deve ser criptografada antes de gravar no banco de dados
    if(user.name == 'admin' && user.password == 'admin'){
        // Retorno de um identificador do usuário no banco de dados
        id = 123; // Esta linha será substituída posteriormente
        const token = jwt.sign(
                                {id},
                                process.env.SECRET,
                                {expiresIn:300});
        user.id = id;
        user.auth = true;
        user.token = token;
    }
    else{
        user.id = '';
        user.auth = false;
        user.token = '';
    }
    return user;
}

async function verificaToken(req, res, next){
    const token = req.headers['x-access-token']; // Como está no POSTMAN
    if(!token) 
        return res.status(401).json({
            auth:false,
            message:'Token não informado'
        });
        jwt.verify(token,process.env.SECRET,(err)=>{
            if(err){
                return res.status(401).json({
                    auth:false,
                    message: 'A auteticação do token falhou'
                });
            }
            next();
        });
}

module.exports={
    autentica,
    verificaToken
};