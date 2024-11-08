const e = require('express')
const express = require('express')
const mysql = require('mysql2/promise')

const app = express()
const port = 3000

//aqui e a configuraçao do banco de dados, aqui vc tem que colocar os seus dados
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'aulaMusica'
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
        const {nome, naipe, tom} = req.body
        const [resultado] =await pool.query('INSERT INTO instrumentos (nome, naipe, tom) values (?, ?, ?)', [nome, naipe, tom])
        res.status(201).json({ message: 'Instrumento registrado com sucesso anjoo, e nois tmj', id: resultado.insertId})
    } catch  (error) {
        console.error('Erro ao registrar o instrumento anjo, q guerra 🙁', error)
        res.status(500).json({error: 'Erro interno no servidor, se fisse certo nao teria esse erro ne yago'})
    }
})


app.put('/instrumentos/:id', async (req, res) => {
    try {
        const {nome, naipe, tom} = req.body
        const [resultado] = await pool.query('UPDATE instrumentos SET nome = ?, naipe = ?, tom = ? WHERE id = ?', [nome, naipe, tom, req.params.id])
        
        if (resultado.affectedRows === 0 ) {
            return res.status(404).json({ message: 'Instrumento nao encontrado, o encarregado brecou'})
        }
        res.json({ message: 'Instrumento atualizado com sucesso, ta liberado anjooooo'})
    } catch (error) {
        console.error('Erro ao atualizar instruento, que guerra', error)
        res.status(500).json({ error: 'Erro interno no servidor, se fisse certo nao teria esse erro ne yago'})
    }
})


app.delete('/instrumentos/:id', async (req, res) => {
    try {
        const [resultado] = await pool.query('DELETE FROM instrumentos WHERE id = ?', [req.params.id])
        if ( resultado.affectedRows === 0 ) {
            return res.status(404).json({ message: 'Instrumento nao encontrado, o encarregado brecou'})
        } 
        res.json({ message: 'Instrumento deletado com sucesso, num pode mais nao fih'})
    } catch (error) {
        console.error('Erro ao deletar o instrumento, se tem chances ainda em', error)
        res.status(500).json({ error: 'Erro interno no servidor, se fisse certo nao teria esse erro ne yago'})
    }
})

//ROTAS ALUNOS

app.get('/alunos', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM alunos')
        res.json(rows)
    } catch (error) {
        console.error('Erro ao buscar o aluno, se ta perdendo a criançada em:', error)
        res.status(500).json({ message: 'Erro interno no servidor, se fisse certo nao teria esse erro ne yago'})
    }
})

app.post('/alunos', async (req, res) => {
    try {
        const {nome, instrumento} = req.body 
        const [resultado] = await pool.query('INSERT INTO alunos (nome, instrumento) VALUES (?, ?) ', [nome, instrumento])
        res.status(201).json({message: 'Aluno registrado, novo aluno familiaaaaa😁😁', id: resultado.insertId})
    } catch (error) {
        console.error('Erro ao registrar o aluno, que guerra em:', error)
        res.status(500).json({ message: 'Erro interno no servidor, se fisse certo nao teria esse erro ne yago'})
    }
})

app.put('/alunos/:id', async (req, res) => {
    try {
        const {nome, instrumento} = req.body
        const [resultado] = await pool.query('UPDATE alunos SET nome = ?, instrumento = ? WHERE id = ?', [nome, instrumento, req.params.id])

        if (resultado.affectedRows === 0) {
           return res.status(404).json({ message: 'Aluno nao encontrado, vai procurar rapaz!!'})
        }
        res.json({message: 'Aluno atualizado com sucesso!, pera atualizado?'})
    }  catch (error) {
        console.error('Erro ao atualizar o aluno, deu ruim:', error)
        res.status(500).json({ message: 'Erro interno no servidor, se fisse certo nao teria esse erro ne yago'})
    }
})


//inciar o servidor, acredita que eu esqueci kkkkkkkkkkkkkkkkkk
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})