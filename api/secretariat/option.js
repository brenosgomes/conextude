const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const option = await knex("option").select("*");
        return res.json(option)
    }

    const getById = async (req, res) => {
        try {
            existsOrError(req.params.id, 'option does not exist!')
    
            const getIdOption = await knex('option')
                .where({ option_id: req.params.id }).first()
            existsOrError(getIdOption, 'option not found')

            res.json(getIdOption)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'option does not exist!')

            const rowsDeleted = await app.db('option').del()
                .where({ option_id: req.params.id })
            existsOrError(rowsDeleted, 'option not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const option = req.body;
        try {
            const newOption = await knex("option").insert(option)
            res.json(newOption);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const option = req.body;
        const option_id = req.params.id;
        try{
            existsOrError(option_id, 'option does not exist!')
            
            const attOption = await knex("option")
                .update(option)
                .where({ option_id: option_id })
            existsOrError(attOption, 'option not found')
            
            res.status(200).send();
        } catch(msg) {
            return res.status(400).send(msg);   
        }
    }

    return { get, getById, post, put, remove }
}