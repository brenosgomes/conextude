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

    return { get, getById }
}