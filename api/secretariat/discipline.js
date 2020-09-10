const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const discipline = await knex("discipline").select("*");
        return res.json(discipline)
    }

    const getById = async (req, res) => {
        try {
            existsOrError(req.params.id, 'discipline does not exist!')
    
            const getIdDiscipline = await knex('discipline')
                .where({ discipline_id: req.params.id }).first()
            existsOrError(getIdDiscipline, 'discipline not found')

            res.json(getIdDiscipline)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'discipline does not exist!')

            const rowsDeleted = await app.db('discipline').del()
                .where({ discipline_id: req.params.id })
            existsOrError(rowsDeleted, 'discipline not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const discipline = req.body;
        try {
            const newDiscipline = await knex("discipline").insert(discipline)
            res.json(newDiscipline);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const discipline = req.body;
        const discipline_id = req.params.id;
        try{
            existsOrError(discipline_id, 'discipline does not exist!')
            
            const attDiscipline = await knex("discipline")
                .update(discipline)
                .where({ discipline_id: discipline_id })
            existsOrError(attDiscipline, 'discipline not found')
            
            res.status(200).send();
        } catch(msg) {
            return res.status(400).send(msg);   
        }
    }

    return { get, getById, post, put, remove }
}