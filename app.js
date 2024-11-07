const express = require('express')
const mysql = require('mysql2/promise')

const app = express()
const port = 3000

//aqui e a configuraçao do banco de dados, aqui vc tem que colocar os seus dados
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: ''
})

//middleware para receber os dados em formato json
app.use(express.json())


//rota pra instrumentos
app.get('/instrumentos', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM instrumentos')
        res.json(rows)
    } catch (error) {
        console.error('Erro ao buscar os dados, deu nao man, deu um treco aq:', error)
        res.status(500).json({ error: 'Erro interno no servidor, se fisse certo nao teria esse erro ne yago'})
    }
})

app.post('/instrumentos', async (req, res) => {
    try {
        const [nome, naipe, tom] = req.body
        const [resultado] =await pool.query('INSERT INTO instrumentos (nome, naipe, tom) values (?, ?, ?)', [nome, naipe, tom])
        res.status(201).json({ message: 'Instrumento registrado com sucesso anjoo, e nois tmj', id: resultado.insertId})
    } catch {
        console.error('Erro ao registrar o instrumento anjo, q guerra 🙁')
        res.status(500).json({error: 'Erro interno no servidor, se fisse certo nao teria esse erro ne yago'})
    }
})



