const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configurar o body-parser para pegar dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Criando a conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Usuário padrão do MySQL no XAMPP
  password: '', // Senha do MySQL (deixe em branco se não tiver senha)
  database: 'cadastro_pessoas'
});

// Conectando ao banco de dados
db.connect((err) => {
  if (err) {
    console.log('Erro de conexão com o banco de dados: ', err);
  } else {
    console.log('Conectado ao banco de dados MySQL!');
  }
});

// Rota para o formulário de cadastro
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Rota para cadastrar a pessoa no banco de dados
app.post('/cadastrar', (req, res) => {
  const { nome, email, telefone } = req.body;
  
  // Validação simples para garantir que os campos não estão vazios
  if (!nome || !email || !telefone) {
    return res.send('Preencha todos os campos');
  }

  // Consulta SQL para inserir os dados na tabela
  const query = 'INSERT INTO pessoas (nome, email, telefone) VALUES (?, ?, ?)';
  db.query(query, [nome, email, telefone], (err, result) => {
    if (err) {
      console.log('Erro ao cadastrar: ', err);
      return res.send('Erro ao cadastrar');
    }
    res.send('Cadastro realizado com sucesso!');
  });
});

// Iniciando o servidor na porta 3000
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
