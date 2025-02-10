const connection = require('./database');

// Exemplo: Selecionar todos os usuários
connection.query('SELECT * FROM usuarios', (err, results) => {
  if (err) {
    console.error('Erro na consulta:', err);
    return;
  }
  console.log('Usuários:', results);
});

const usuarios = [
    ["Anaaaaa", "anaaaa@email.com"],
    ["Brunoooo", "brunoooo@email.com"]
  ];
  
  connection.query('INSERT INTO usuarios (nome, email) VALUES ?', [usuarios], (err, results) => {
    if (err) {
      console.error('Erro ao inserir usuários:', err);
      return;
    }
    console.log('Usuários inseridos com sucesso! Linhas afetadas:', results.affectedRows);
  });

  connection.end();