const mysql = require('mysql2');

// Configuração da conexão
const connection = mysql.createConnection({
  host: 'localhost',    // Servidor do banco de dados
  user: 'root',         // Usuário do MySQL
  password: 'admin', // Senha do MySQL
  database: 'APIREST' // Nome do banco de dados
});

// Conectar ao banco
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL!');
});

module.exports = connection;