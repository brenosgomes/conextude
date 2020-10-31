const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const list = await knex("list").select("*");
        return res.json(list)
    }

    const getById = async (req, res) => {
        try {
            existsOrError(req.params.id, 'list does not exist!')
    
            const getIdList = await knex('list')
                .where({ list_id: req.params.id }).first()
            existsOrError(getIdList, 'list not found')

            res.json(getIdList)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'list does not exist!')

            const rowsDeleted = await app.db('list').del()
                .where({ list_id: req.params.id })
            existsOrError(rowsDeleted, 'list not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const list = req.body;
        try {
            const newList = await knex("list").insert(list)
            res.json(newList);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const list = req.body;
        const list_id = req.params.id;
        try{
            existsOrError(list_id, 'list does not exist!')
            
            const attList = await knex("list")
                .update(list)
                .where({ list_id: list_id })
            existsOrError(attList, 'list not found')
            
            res.status(200).send();
        } catch(msg) {
            return res.status(400).send(msg);   
        }
    }
    

    return { get, getById, post, put, remove }
}