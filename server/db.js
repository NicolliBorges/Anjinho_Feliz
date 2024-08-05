import express from 'express';
import { createConnection } from 'mysql';
import { json, urlencoded } from 'body-parser';

const app = express();
const port = 3000;

app.use(json());
app.use(urlencoded({ extended: true }));

// Configurar a conexão com o banco de dados
const connection = createConnection({
    host: 'localhost',      // ou o IP do seu servidor MySQL
    user: 'root',           // seu usuário MySQL
    password: '1234',       // sua senha MySQL
    database: 'escolinha-db' // nome do banco de dados
});

// Conectar ao banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Rota para lidar com o formulário de contato
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Inserir dados no banco de dados
    const query = 'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)';
    connection.query(query, [name, email, message], (err, results) => {
        if (err) {
            console.error('Error inserting data into the database:', err);
            res.status(500).send('Error inserting data');
            return;
        }
        res.status(200).send('Message received successfully');
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
