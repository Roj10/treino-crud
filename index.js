const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 5000;

// Configurar o banco de dados
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "APIREST",
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
    return;
  }
  console.log("Conectado ao MySQL!");
});

// Middleware para permitir JSON e CORS
app.use(express.json());
app.use(cors());

// 🔹 Rota para listar todos os usuários
app.get("/usuarios", (req, res) => {
  db.query("SELECT * FROM usuarios", (err, results) => {
    if (err) {
      res.status(500).json({ erro: "Erro ao buscar usuários" });
      return;
    }
    res.json(results);
  });
});

// 🔹 Rota para adicionar um usuário
app.post("/usuarios", (req, res) => {
  const { nome, email } = req.body;
  db.query("INSERT INTO usuarios (nome, email) VALUES (?, ?)", [nome, email], (err, result) => {
    if (err) {
      res.status(500).json({ erro: "Erro ao adicionar usuário" });
      return;
    }
    res.json({ id: result.insertId, nome, email });
  });
});

// 🔹 Rota para atualizar um usuário
app.put("/usuarios/:id", (req, res) => {
  const { nome, email } = req.body;
  const { id } = req.params;
  db.query("UPDATE usuarios SET nome=?, email=? WHERE id=?", [nome, email, id], (err) => {
    if (err) {
      res.status(500).json({ erro: "Erro ao atualizar usuário" });
      return;
    }
    res.json({ id, nome, email });
  });
});

// 🔹 Rota para excluir um usuário
app.delete("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM usuarios WHERE id=?", [id], (err) => {
    if (err) {
      res.status(500).json({ erro: "Erro ao excluir usuário" });
      return;
    }
    res.json({ mensagem: "Usuário excluído com sucesso" });
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
