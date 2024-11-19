const e = require('express')
const express = require('express')
const mysql = require('mysql2/promise')

const app = express()
const port = 3000

//aqui e a configuraçao do banco de dados, aqui vc tem que colocar os seus dados
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'simba123',
    database: 'minha_escola2'
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
        const {tipo, modelo, marca} = req.body
        const [resultado] =await pool.query('INSERT INTO instrumentos (tipo, modelo, marca) values (?, ?, ?)', [tipo, modelo, marca])
        res.status(201).json({ message: 'Instrumento registrado com sucesso anjoo, e nois tmj', id: resultado.insertId})
    } catch  (error) {
        console.error('Erro ao registrar o instrumento anjo, q guerra 🙁', error)
        res.status(500).json({error: 'Erro interno no servidor, se fisse certo nao teria esse erro ne yago'})
    }
})


app.put('/instrumentos/:id', async (req, res) => {
    try {
        const {tipo, modelo, marca} = req.body
        const [resultado] = await pool.query('UPDATE instrumentos SET tipo = ?, modelo = ?, marca = ? WHERE id = ?', [tipo, modelo, marca, req.params.id])
        
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
        const {idade, endereco} = req.body 
        const [resultado] = await pool.query('INSERT INTO alunos (idade, endereco) VALUES (?, ?) ', [idade, endereco])
        res.status(201).json({message: 'Aluno registrado, novo aluno familiaaaaa😁😁', id: resultado.insertId})
    } catch (error) {
        console.error('Erro ao registrar o aluno, que guerra em:', error)
        res.status(500).json({ message: 'Erro interno no servidor, se fisse certo nao teria esse erro ne yago'})
    }
})

app.put('/alunos/:id', async (req, res) => {
    try {
        const {idade, endereco} = req.body
        const [resultado] = await pool.query('UPDATE alunos SET idade = ?, endereco = ? WHERE id = ?', [nome, instrumento, req.params.id])

        if (resultado.affectedRows === 0) {
           return res.status(404).json({ message: 'Aluno nao encontrado, vai procurar rapaz!!'})
        }
        res.json({message: 'Aluno atualizado com sucesso!, pera atualizado?'})
    }  catch (error) {
        console.error('Erro ao atualizar o aluno, deu ruim:', error)
        res.status(500).json({ message: 'Erro interno no servidor, se fisse certo nao teria esse erro ne yago'})
    }
})

app.delete('/alunos/:id', async (req, res) => {
    try {
        const [resultado] = await pool.query('DELETE FROM alunos WHERE id = ?', [req.params.id])
        if ( resultado.affectedRows === 0 ) {
            return res.status(404).json({ message: 'Aluno nao encontrado, vai ver ja foi pra goma '})
        } 
        res.json({ message: 'Aluno excluido com sucesso, VAI PRA CASA GURIII'})
    } catch (error) {
        console.error('Erro ao deletar o aluno, ta dificil o guri em', error)
        res.status(500).json({ error: 'Erro interno no servidor, se fisse certo nao teria esse erro ne yago'})
    }
})

//ROTA FREQUENCIA

app.get('/frequencia', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM frequencia')
        res.json(rows)
    } catch (error) {
        console.error('Erro ao buscar a frequencia, olk ta tao ruim assim🙁:', error)
        res.status(500).json({ message: 'Erro interno no servidor, se fisse certo nao teria esse erro ne yago'})
    }
})

app.post('/frequencia', async (req, res) => {
    try {
        const {nome, frequencia_em_porcentagem} = req.body 
        const [resultado] = await pool.query('INSERT INTO frequencia (nome, frequencia_em_porcentagem) VALUES (?, ?) ', [nome, frequencia_em_porcentagem])
        res.status(201).json({message: 'Frequencia registrada, eai ta bom ou ruim', id: resultado.insertId})
    } catch (error) {
        console.error('Erro ao registrar a frequencia, que guerra em:', error)
        res.status(500).json({ message: 'Erro interno no servidor, se fisse certo nao teria esse erro ne yago'})
    }
})

app.put('/frequencia/:id', async (req, res) => {
    try {
        const {nome, frequencia_em_porcentagem} = req.body
        const [resultado] = await pool.query('UPDATE frequencia SET nome = ?, frequencia_em_porcentagem = ? WHERE id = ?', [nome, frequencia_em_porcentagem, req.params.id])

        if (resultado.affectedRows === 0) {
           return res.status(404).json({ message: 'Frequencia nao encontrada, ta ruim em fih'})
        }
        res.json({message: 'frequencia atualizada com sucesso!, pra bom ou ruim'})
    }  catch (error) {
        console.error('Erro ao atualizar a frequencia, deu ruim:', error)
        res.status(500).json({ message: 'Erro interno no servidor, se fisse certo nao teria esse erro ne yago'})
    }
})

app.delete('/frequencia/:id', async (req, res) => {
    try {
        const [resultado] = await pool.query('DELETE FROM frequencia WHERE id = ?', [req.params.id])
        if ( resultado.affectedRows === 0 ) {
            return res.status(404).json({ message: 'frequencia nao encontrada, vai ver ja foi de f'})
        } 
        res.json({ message: 'Frequencia excluida com sucesso, TA RUIM VAI PRA CASA'})
    } catch (error) {
        console.error('Erro ao deletar a frequencia, ta dificil em, error')
        res.status(500).json({ error: 'Erro interno no servidor, se fisse certo nao teria esse erro ne yago'})
    }
})

//ROTA DE INSTRUTORES

app.get('/Instrutores', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Instrutores')
        res.json(rows)
    } catch (error) {
        console.error('Erro ao buscar o instrutor, faltou dnovo, parece o diogo moço')
        res.status(500).json({ message: 'Erro interno no servidor, se fisse certo nao teria esse erro ne yago'})
    }
})

app.post('/Instrutores', async (req, res) => {
    try {
        const {nome, codigo, hora_de_entrada, hora_de_saida, total_de_alunos_passados} = req.body 
        const [resultado] = await pool.query('INSERT INTO Instrutores (nome, codigo, hora_de_entrada, hora_de_saida, total_de_alunos_passados) VALUES (?, ?, ?, ?, ?) ', [nome, codigo, hora_de_entrada, hora_de_saida, total_de_alunos_passados])
        res.status(201).json({message: 'Instrutor registrado com sucesso, mais um homi pra trabaia', id: resultado.insertId})
    } catch (error) {
        console.error('Erro ao registrar o instrutor , que guerra em:', error)
        res.status(500).json({ message: 'Erro interno no servidor, se fisse certo nao teria esse erro ne yago'})
    }
})

app.put('/Instrutores/:id', async (req, res) => {
    try {
        const {nome, codigo, hora_de_entrada, hora_de_saida, total_de_alunos_passados} = req.body
        const [resultado] = await pool.query('UPDATE Instrutores SET nome = ?, codigo = ?, hora_de_entrada = ?, hora_de_saida = ?, total_de_alunos_passados = ? WHERE id = ?', [nome, codigo, hora_de_entrada, hora_de_saida, total_de_alunos_passados, req.params.id])

        if (resultado.affectedRows === 0) {
           return res.status(404).json({ message: 'Instrutor nao encontrado, vai ver deu uma de diogo'})
        }
        res.json({message: 'Instrutor atualizado com sucesso!, boa familia '})
    }  catch (error) {
        console.error('Erro ao atualizar o instrutor, deu ruim:', error)
        res.status(500).json({ message: 'Erro interno no servidor, se fisse certo nao teria esse erro ne yago'})
    }
})

app.delete('/Instrutores/:id', async (req, res) => {
    try {
        const [resultado] = await pool.query('DELETE FROM Instrutores WHERE id = ?', [req.params.id])
        if ( resultado.affectedRows === 0 ) {
            return res.status(404).json({ message: 'instrutor nao encontrada, vai ver ja foi de f'})
        } 
        res.json({ message: 'instrutor excluida com sucesso, TA RUIM VAI PRA CASA'})
    } catch (error) {
        console.error('Erro ao deletar a instrutor, ta dificil em', error)
        res.status(500).json({ error: 'Erro interno no servidor, se fisse certo nao teria esse erro ne yago'})
    }
})

//inciar o servidor, acredita que eu esqueci kkkkkkkkkkkkkkkkkk
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})