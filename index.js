    //Instanciar o express
    const express = require('express') ; // Habilita/carrega o Express na minha aplicação
    const app = express();// Construindo o objeto da aplicação
    const port = 3000; // Determina a porta http do servidor
    const auth = require('./auth');
    require('dotenv').config(); // Instanciando .env

    //Criar umaIIf (immediately invoked Function) Para ativar e Sincronizar o sequelize e o banco de dados
    (async ()=>{
        const database = require('./db.js');
        const Cliente = require('./Model/Cliente.js');
        await database.sync({alter:true});


        //await Cliente.create(
         //   {
        //        id:1,
         //       cpf:'888',
          //      nome:'Pedro de Lara',
           //     email:'plara@gmail.com'
          //  }
      // );

      // console.log(clientes);

      // const clientes = await Cliente.findAll({
       // where: {
           // email: 'araci@gmail.com'
       //}
       //});

       //console.log(clientes);

       const clientex = await Cliente.findByPk(1);
        if(clientex){
            clientex.email = 'alterado@gmail.com';
            clientex.save();
            console.log(clientex)
        }
       })();


    



 
    app.use(express.json())  // Não esquecer de habilitar o JSON do Express



    // Implementar as rotas
    app.get('/', (req, res) => {
        res.send('Aplicativo Online')
    }
    );

    // Recebe um payload(carga)
    app.post('/login', (req, res) => {
        const user = req.body;  // Captura o objeto JSON enviado pelo cliente
        auth.autentica(user);
        res.send(user);
    });

    // Rota Autenticada
    app.post('/user/save', auth.verificaToken,(req,res)=>{
        console.log('Autenticou')
        res.send('OK')
    });

    
    


    // Iniciar servidor
    app.listen(port, () => {
        console.log(`Aplicação rodando na porta ${port}`);   // Ficar ligado nas aspas para ele realizar a concatenação
    });

    
