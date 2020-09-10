const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const person = await knex("person").select("*");
        return res.json(person)
    }

    const getById = async (req, res) => {
        try {
            existsOrError(req.params.id, 'person does not exist!')
    
            const getIdPerson = await knex('person')
                .where({ person_id: req.params.id }).first()
            existsOrError(getIdPerson, 'person not found')

            res.json(getIdPerson)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'person does not exist!')

            const rowsDeleted = await app.db('person').del()
                .where({ person_id: req.params.id })
            existsOrError(rowsDeleted, 'person not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const person = req.body;
        try {
            const newPerson = await knex("person").insert(person)
            res.json(newPerson);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const person = req.body;
        const person_id = req.params.id;
        try{
            existsOrError(person_id, 'person does not exist!')
            
            const attPerson = await knex("person")
                .update(person)
                .where({ person_id: person_id })
            existsOrError(attPerson, 'person not found')
            
            res.status(200).send();
        } catch(msg) {
            return res.status(400).send(msg);   
        }
    }

    return { get, getById, post, put, remove }
}