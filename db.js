//Configuraçoes do banco de dados
const Sequelize = require('sequelize');//Carrega a classe do orm
const sequelize = new Sequelize('exemplo', 'root','positivo', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
}); //Constroi o objeto responsável por abstrair o banco de dados

module.exports = sequelize;