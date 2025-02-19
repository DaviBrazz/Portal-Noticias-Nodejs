const express = require('express');
const path = require('path');
const database = require('./database');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Rota para criar notícia
app.post('/api/noticia', async (req, res) => {
    const { titulo, conteudo, imagem } = req.body;
    const dataCriacao = new Date().toISOString();

    const result = await database.criarNoticia(titulo, conteudo, imagem, dataCriacao);
    res.json(result);
});


// Rota para listar todas as notícias
app.get('/api/noticias', async (req, res) => {
    const noticias = await database.listarNoticias();
    res.json(noticias);
});

// Rota para servir a página noticias.html no /portal
app.get('/noticias', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/noticias.html'));
});

app.get('/cadastrar', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/cadastrar.html'));
});

// Inicializar servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
