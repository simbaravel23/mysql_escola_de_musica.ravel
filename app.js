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
app.get('/instrumentos2', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM instrumentos2')
        res.json(rows)
    } catch (error) {
        console.error('Erro ao buscar os dados, deu nao man, deu um treco aq:', error)
        res.status(500).json({ error: 'Erro interno no servidor, se fisse certo nao teria esse erro ne yago'})
    }
})

app.post('/instrumentos2', async (req, res) => {
    try {
        const {tipo, modelo, marca} = req.body
        const [resultado] =await pool.query('INSERT INTO instrumentos2 (tipo, modelo, marca) values (?, ?, ?)', [tipo, modelo, marca])
        res.status(201).json({ message: 'Instrumento registrado com sucesso anjoo, e nois tmj', id: resultado.insertId})
    } catch  (error) {
        console.error('Erro ao registrar o instrumento anjo, q guerra 🙁', error)
        res.status(500).json({error: 'Erro interno no servidor, se fisse certo nao teria esse erro ne yago'})
    }
})


app.put('/instrumentos2/:id', async (req, res) => {
    try {
        const {tipo, modelo, marca} = req.body
        const [resultado] = await pool.query('UPDATE instrumentos2 SET tipo = ?, modelo = ?, marca = ? WHERE id = ?', [tipo, modelo, marca, req.params.id])
        
        if (resultado.affectedRows === 0 ) {
            return res.status(404).json({ message: 'Instrumento nao encontrado, o encarregado brecou'})
        }
        res.json({ message: 'Instrumento atualizado com sucesso, ta liberado anjooooo'})
    } catch (error) {
        console.error('Erro ao atualizar instruento, que guerra', error)
        res.status(500).json({ error: 'Erro interno no servidor, se fisse certo nao teria esse erro ne yago'})
    }
})


app.delete('/instrumentos2/:id', async (req, res) => {
    try {
        const [resultado] = await pool.query('DELETE FROM instrumentos2 WHERE id = ?', [req.params.id])
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

app.get('/alunos2', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM alunos2')
        res.json(rows)
    } catch (error) {
        console.error('Erro ao buscar o aluno, se ta perdendo a criançada em:', error)
        res.status(500).json({ message: 'Erro interno no servidor, se fisse certo nao teria esse erro ne yago'})
    }
})

app.post('/alunos2', async (req, res) => {
    try {
        const {idade, endereco} = req.body 
        const [resultado] = await pool.query('INSERT INTO alunos2 (idade, endereco) VALUES (?, ?) ', [idade, endereco])
        res.status(201).json({message: 'Aluno registrado, novo aluno familiaaaaa😁😁', id: resultado.insertId})
    } catch (error) {
        console.error('Erro ao registrar o aluno, que guerra em:', error)
        res.status(500).json({ message: 'Erro interno no servidor, se fisse certo nao teria esse erro ne yago'})
    }
})

app.put('/alunos2/:id', async (req, res) => {
    try {
        const {idade, endereco} = req.body
        const [resultado] = await pool.query('UPDATE alunos2 SET idade = ?, endereco = ? WHERE id = ?', [idade, endereco, req.params.id])

        if (resultado.affectedRows === 0) {
           return res.status(404).json({ message: 'Aluno nao encontrado, vai procurar rapaz!!'})
        }
        res.json({message: 'Aluno atualizado com sucesso!, pera atualizado?'})
    }  catch (error) {
        console.error('Erro ao atualizar o aluno, deu ruim:', error)
        res.status(500).json({ message: 'Erro interno no servidor, se fisse certo nao teria esse erro ne yago'})
    }
})

app.delete('/alunos2/:id', async (req, res) => {
    try {
        const [resultado] = await pool.query('DELETE FROM alunos2 WHERE id = ?', [req.params.id])
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

app.get('/frequencia2', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM frequencia2')
        res.json(rows)
    } catch (error) {
        console.error('Erro ao buscar a frequencia, olk ta tao ruim assim🙁:', error)
        res.status(500).json({ message: 'Erro interno no servidor, se fisse certo nao teria esse erro ne yago'})
    }
})

app.post('/frequencia2', async (req, res) => {
    try {
        const {data, instrumentos,alunos, instrutores } = req.body 
        const [resultado] = await pool.query('INSERT INTO frequencia2 (data, instrumentos,alunos, instrutores) VALUES (?, ?, ?, ?) ', [data, instrumentos,alunos, instrutores])
        res.status(201).json({message: 'Frequencia registrada, eai ta bom ou ruim', id: resultado.insertId})
    } catch (error) {
        console.error('Erro ao registrar a frequencia, que guerra em:', error)
        res.status(500).json({ message: 'Erro interno no servidor, se fisse certo nao teria esse erro ne yago'})
    }
})

app.put('/frequencia2/:id', async (req, res) => {
    try {
        const {data, instrumentos,alunos, instrutores} = req.body
        const [resultado] = await pool.query('UPDATE frequencia2 SET data = ?, instrumentos  = ?, alunos = ?, instrutores = ?WHERE id = ?', [data, instrumentos,alunos, instrutores, req.params.id])

        if (resultado.affectedRows === 0) {
           return res.status(404).json({ message: 'Frequencia nao encontrada, ta ruim em fih'})
        }
        res.json({message: 'frequencia atualizada com sucesso!, pra bom ou ruim'})
    }  catch (error) {
        console.error('Erro ao atualizar a frequencia, deu ruim:', error)
        res.status(500).json({ message: 'Erro interno no servidor, se fisse certo nao teria esse erro ne yago'})
    }
})

app.delete('/frequencia2/:id', async (req, res) => {
    try {
        const [resultado] = await pool.query('DELETE FROM frequencia2 WHERE id = ?', [req.params.id])
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

app.get('/Instrutores2', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Instrutores2')
        res.json(rows)
    } catch (error) {
        console.error('Erro ao buscar o instrutor, faltou dnovo, parece o diogo moço')
        res.status(500).json({ message: 'Erro interno no servidor, se fisse certo nao teria esse erro ne yago'})
    }
})

app.post('/Instrutores2', async (req, res) => {
    try {
        const {idade, endereco, especialidade } = req.body 
        const [resultado] = await pool.query('INSERT INTO Instrutores2 (idade, endereco, especialidade) VALUES (?, ?, ?) ', [idade, endereco, especialidade])
        res.status(201).json({message: 'Instrutor registrado com sucesso, mais um homi pra trabaia', id: resultado.insertId})
    } catch (error) {
        console.error('Erro ao registrar o instrutor , que guerra em:', error)
        res.status(500).json({ message: 'Erro interno no servidor, se fisse certo nao teria esse erro ne yago'})
    }
})

app.put('/Instrutores2/:id', async (req, res) => {
    try {
        const {idade, endereco, especialidade} = req.body
        const [resultado] = await pool.query('UPDATE Instrutores2 SET idade = ?, endereco= ?, especialidade = ?, WHERE id = ?', [total_de_alunos_passados, req.params.id])

        if (resultado.affectedRows === 0) {
           return res.status(404).json({ message: 'Instrutor nao encontrado, vai ver deu uma de diogo'})
        }
        res.json({message: 'Instrutor atualizado com sucesso!, boa familia '})
    }  catch (error) {
        console.error('Erro ao atualizar o instrutor, deu ruim:', error)
        res.status(500).json({ message: 'Erro interno no servidor, se fisse certo nao teria esse erro ne yago'})
    }
})

app.delete('/Instrutores2/:id', async (req, res) => {
    try {
        const [resultado] = await pool.query('DELETE FROM Instrutores2 WHERE id = ?', [req.params.id])
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