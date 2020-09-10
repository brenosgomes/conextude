const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const office = await knex("office").select("*");
        return res.json(office)
    }

    const getById = async (req, res) => {
        try {
            existsOrError(req.params.id, 'office does not exist!')
    
            const getIdOffice = await knex('office')
                .where({ office_id: req.params.id }).first()
            existsOrError(getIdOffice, 'office not found')

            res.json(getIdOffice)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'office does not exist!')

            const rowsDeleted = await app.db('office').del()
                .where({ office_id: req.params.id })
            existsOrError(rowsDeleted, 'office not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const office = req.body;
        try {
            const newOffice = await knex("office").insert(office)
            res.json(newOffice);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const office = req.body;
        const office_id = req.params.id;
        try{
            existsOrError(office_id, 'office does not exist!')
            
            const attOffice = await knex("office")
                .update(office)
                .where({ office_id: office_id })
            existsOrError(attOffice, 'office not found')
            
            res.status(200).send();
        } catch(msg) {
            return res.status(400).send(msg);   
        }
    }

    return { get, getById, post, put, remove }
}