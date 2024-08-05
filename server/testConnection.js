const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '35.198.62.43',       // IP público da sua instância
    user: 'admin-user',         // Usuário do banco de dados
    password: '1234', // Senha do banco de dados
    database: 'escolinha-db',   // Nome do banco de dados
    connectTimeout: 10000       // 10 segundos de timeout
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});
