const knex = require('../config/db')
const bcrypt = require('bcryptjs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validator

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const get = async (req, res) => {
        const administrator = await knex('administrator').select('*');
        return res.json(administrator)
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'administrator não existe!')
    
            const rowsDeleted = await knex('administrator').del()
                .where({ administrator_id: req.params.id })
            existsOrError(rowsDeleted, 'administrator não encontrado')
    
            res.status(204).send()
        } catch (msg) {
            return res.status(400).send(msg)
        }
      }
    
    const getById = async (req, res) => {
        try {
            existsOrError(req.params.id, 'administrator não existe!')
    
            const getIdAdministrator = await knex('administrator')
                .where({ administrator_id: req.params.id }).first()
            existsOrError(getIdAdministrator, 'administrator não encontrado')

            res.json(getIdAdministrator)
        } catch (msg) {
            return res.status(400).send(msg)
        }
      }

    const post = async (req, res) => {
        let { administrator_login, administrator_password, administrator_confirm_password } = req.body;
        try {
            existsOrError(administrator_login, 'Login não informado')
            existsOrError(administrator_password, 'Senha não informada')
            existsOrError(administrator_confirm_password, 'Confirmação de senha invalida')
            equalsOrError(administrator_password, administrator_confirm_password, 'Senhas não conferem')

            const administratorFromDB = await knex('administrator')
                .where({ administrator_login: administrator_login }).first()
            if (!administrator_login){
                notExistsOrError(administratorFromDB, 'administrator já cadastrado')
                res.status(400)
            }
            res.json(administratorFromDB);
        } catch (msg) {
            console.log(msg)
            return res.status(400).send(msg)
        }

        administrator_password = encryptPassword(administrator_password)
        delete administrator_confirm_administrator_password

        await knex('administrator').insert({
            administrator_login,
            administrator_password
        })
    }

    const put = async (req, res) => {
        const administrator = req.body;
        const administrator_id = req.params.id;
        try{
            existsOrError(administrator_id, 'administrator does not exist!')
            
            const attAdministrator = await knex("administrator")
                .update(administrator)
                .where({ administrator_id: administrator_id })
            existsOrError(attAdministrator, 'administrator not found')
            
            res.status(200).send();
        } catch(msg) {
            return res.status(400).send(msg);   
        }
    }

    return { get, getById, post, put, remove }
}