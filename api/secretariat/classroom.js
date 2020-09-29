const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const classroom = await knex("classroom").select("*");
        return res.json(classroom)
    }

    const getById = async (req, res) => {
        try {
            existsOrError(req.params.id, 'classroom does not exist!')
    
            const getIdClassroom = await knex('classroom')
                .where({ classroom_id: req.params.id }).first()
            existsOrError(getIdClassroom, 'classroom not found')

            res.json(getIdClassroom)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'classroom does not exist!')

            const rowsDeleted = await app.db('classroom').del()
                .where({ classroom_id: req.params.id })
            existsOrError(rowsDeleted, 'classroom not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const classroom = req.body;
        try {
            const newClassroom = await knex("classroom").insert(classroom)
            res.json(newClassroom);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const classroom = req.body;
        const classroom_id = req.params.id;
        try{
            existsOrError(classroom_id, 'classroom does not exist!')
            
            const attClassroom = await knex("classroom")
                .update(classroom)
                .where({ classroom_id: classroom_id })
            existsOrError(attClassroom, 'classroom not found')
            
            res.status(200).send();
        } catch(msg) {
            return res.status(400).send(msg);   
        }
    }

    return { get, getById, post, put, remove }
}