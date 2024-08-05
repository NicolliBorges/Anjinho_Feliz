const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Configuração do MySQL
const connection = mysql.createConnection({
    host: '35.198.62.43',
    user: 'root',
    password: '1234',
    database: 'escolinha-db'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Middleware para analisar dados do corpo das solicitações
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta 'Public'
app.use(express.static(path.join(__dirname, '../Public')));

// Rota para o formulário de contato
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/contact.html'));
});

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Ou outro serviço de e-mail
    auth: {
        user: 'seu-email@gmail.com',
        pass: 'sua-senha'
    }
});

// Rota para o envio do formulário
app.post('/contact', (req, res) => {
    const { name, email, phone, preferred_contact, message } = req.body;
    const query = 'INSERT INTO contact_messages (name, email, phone, preferred_contact, message) VALUES (?, ?, ?, ?, ?)';

    connection.query(query, [name, email, phone, preferred_contact, message], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error saving message');
        } else {
            const mailOptions = {
                from: 'seu-email@gmail.com',
                to: 'seu-email@gmail.com', // Ou outro endereço de e-mail para onde enviar os dados
                subject: 'Novo Contato Recebido',
                text: `Nome: ${name}\nE-mail: ${email}\nNúmero de Celular: ${phone}\nPreferência de Contato: ${preferred_contact}\nMensagem: ${message}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    res.status(500).send('Error sending email');
                } else {
                    console.log('Email sent: ' + info.response);
                    res.send('Message received successfully');
                }
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
