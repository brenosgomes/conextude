const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const observation = await knex("observation").select("*");
        return res.json(observation)
    }

    const getById = async (req, res) => {
        try {
            existsOrError(req.params.id, 'observation does not exist!')
    
            const getIdObservation = await knex('observation')
                .where({ observation_id: req.params.id }).first()
            existsOrError(getIdObservation, 'observation not found')

            res.json(getIdObservation)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'observation does not exist!')

            const rowsDeleted = await app.db('observation').del()
                .where({ observation_id: req.params.id })
            existsOrError(rowsDeleted, 'observation not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const observation = req.body;
        try {
            const newObservation = await knex("observation").insert(observation)
            res.json(newObservation);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const observation = req.body;
        const observation_id = req.params.id;
        try{
            existsOrError(observation_id, 'observation does not exist!')
            
            const attObservation = await knex("observation")
                .update(observation)
                .where({ observation_id: observation_id })
            existsOrError(attObservation, 'observation not found')
            
            res.status(200).send();
        } catch(msg) {
            return res.status(400).send(msg);   
        }
    }
    

    return { get, getById, post, put, remove }
}